import React, { useEffect, useMemo, useRef, useState } from 'react';
import { api } from '../lib/api';

const KnowledgeBase = () => {
  const [documents, setDocuments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [uploadError, setUploadError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [chunks, setChunks] = useState([])
  const [loadingChunks, setLoadingChunks] = useState(false)
  const [semanticResults, setSemanticResults] = useState([])
  const [isSemanticSearch, setIsSemanticSearch] = useState(false)

  const fileInputRef = useRef(null)

  // Load all documents initially
  const loadDocuments = async (controller) => {
    try {
      setIsLoading(true)
      setError('')
      const result = await api.listDocuments(controller?.signal)
      const docList = Array.isArray(result) ? result : []
      setDocuments(docList)
      
      // Auto-select first document if available and none selected
      if (docList.length > 0 && !selectedDoc) {
        setSelectedDoc(docList[0])
      }
    } catch (requestError) {
      if (requestError.name !== 'AbortError') {
        setError(requestError.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const controller = new AbortController()
    loadDocuments(controller)
    return () => controller.abort()
  }, [])

  // Retrieve chunks whenever selected document changes
  useEffect(() => {
    if (!selectedDoc) {
      setChunks([])
      return
    }

    const loadChunks = async () => {
      try {
        setLoadingChunks(true)
        const res = await api.getDocumentChunks(selectedDoc.id)
        setChunks(res.chunks || [])
      } catch (err) {
        console.error("Failed to load chunks:", err)
      } finally {
        setLoadingChunks(false)
      }
    }
    loadChunks()
  }, [selectedDoc])

  // Handles semantic search
  const handleSearchSubmit = async (e) => {
    if (e) e.preventDefault()
    if (!searchQuery.trim()) {
      setIsSemanticSearch(false)
      setSemanticResults([])
      return
    }

    try {
      setLoadingChunks(true)
      setIsSemanticSearch(true)
      const res = await api.searchKnowledgeBase(searchQuery)
      setSemanticResults(res.results || [])
    } catch (err) {
      setError(err.message || 'Semantic search failed')
    } finally {
      setLoadingChunks(false)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    try {
      setIsLoading(true)
      setUploadError('')
      const newDoc = await api.uploadDocument(formData)
      setDocuments((prev) => [newDoc, ...prev])
      setSelectedDoc(newDoc)
      setIsSemanticSearch(false)
      setSearchQuery('')
    } catch (err) {
      setUploadError(err.message || 'Failed to upload document')
    } finally {
      setIsLoading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleDeleteDoc = async (docId, event) => {
    if (event) event.stopPropagation()
    if (!window.confirm("Are you sure you want to remove this document and its embeddings from the database?")) return

    try {
      setIsLoading(true)
      await api.deleteDocument(docId)
      setDocuments((prev) => prev.filter((d) => d.id !== docId))
      if (selectedDoc?.id === docId) {
        setSelectedDoc(null)
        setChunks([])
      }
    } catch (err) {
      setError(err.message || 'Failed to delete document')
    } finally {
      setIsLoading(false)
    }
  }

  // Filter documents locally based on search (when not doing semantic search)
  const filteredDocuments = useMemo(() => {
    if (isSemanticSearch || !searchQuery.trim()) return documents
    return documents.filter((doc) =>
      doc.filename.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [documents, searchQuery, isSemanticSearch])

  const documentSummary = useMemo(() => ({
    total: documents.length,
    embedded: documents.filter((doc) => doc.status === 'embedded').length,
  }), [documents])

  // Get file info/icon helper
  const getFileInfo = (filename) => {
    const ext = filename.split('.').pop().toLowerCase()
    if (ext === 'pdf') return { icon: 'picture_as_pdf', label: 'PDF Document', color: '#f87171' }
    if (ext === 'md') return { icon: 'markdown', label: 'Markdown File', color: '#60a5fa' }
    if (ext === 'json') return { icon: 'data_object', color: '#fbbf24', label: 'JSON Data' }
    if (ext === 'py' || ext === 'js' || ext === 'jsx' || ext === 'ts' || ext === 'tsx') {
      return { icon: 'code', label: 'Code File', color: '#34d399' }
    }
    return { icon: 'description', label: 'Text Document', color: '#9ca3af' }
  }

  // Compute related entities dynamically from the displayed chunks
  const relatedEntities = useMemo(() => {
    const textContent = isSemanticSearch 
      ? semanticResults.map(r => r.page_content).join(' ') 
      : chunks.map(c => c.content).join(' ');
    
    if (!textContent) return ['General Spec', 'Project Info']

    const entities = []
    if (/api|endpoint|route|post|get|url/i.test(textContent)) entities.push('REST API')
    if (/database|postgres|sql|query|table|schema/i.test(textContent)) entities.push('Database Schema')
    if (/auth|jwt|token|login|sign|secure/i.test(textContent)) entities.push('Authentication')
    if (/openai|embedding|vector|rag|langchain|model/i.test(textContent)) entities.push('Vector RAG')
    if (/react|component|state|props|ui|render/i.test(textContent)) entities.push('React Frontend')
    if (/fastapi|python|uvicorn|app|server/i.test(textContent)) entities.push('Python Backend')

    if (entities.length === 0) {
      entities.push('Documentation')
      entities.push('Project Asset')
    }
    return entities
  }, [chunks, semanticResults, isSemanticSearch])

  return (
    <div className="p-lg min-h-[calc(100vh-56px)] bg-[#0B0E14] text-white">
      <div className="max-w-container-max mx-auto">
        
        {/* Hidden File Input for Upload */}
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={handleFileChange}
          accept=".txt,.md,.json,.py,.js,.jsx,.ts,.tsx,.css,.html"
        />

        {/* Page Header */}
        <div className="flex items-center justify-between mb-xl">
          <div>
            <div className="flex items-center gap-sm text-slate-400 font-body-sm mb-xs">
              <span className="hover:text-on-surface cursor-pointer">Project Alpha</span>
              <span>/</span>
              <span className="text-on-surface font-medium">Knowledge Base</span>
            </div>
            <h1 className="font-display-lg text-on-surface text-3xl font-bold">Knowledge Base</h1>
          </div>
          <div className="flex gap-md">
            <button 
              onClick={() => loadDocuments()} 
              className="bg-surface-container border border-outline-variant hover:bg-surface-container-high text-on-surface font-button-text px-4 py-2 rounded transition-colors flex items-center gap-sm"
            >
              <span className="material-symbols-outlined text-[18px]">sync</span>
              Sync Repos
            </button>
            <button 
              onClick={handleUploadClick}
              className="bg-primary hover:brightness-110 text-on-primary font-button-text px-4 py-2 rounded transition-colors flex items-center gap-sm shadow-md"
            >
              <span className="material-symbols-outlined text-[18px]">upload_file</span>
              Upload New
            </button>
          </div>
        </div>

        {/* Stats Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-surface-container border border-white/5 rounded-xl p-4 flex flex-col justify-between">
            <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Documents Indexed</div>
            <div className="text-white text-3xl font-bold mt-2">{documentSummary.total}</div>
          </div>
          <div className="bg-surface-container border border-white/5 rounded-xl p-4 flex flex-col justify-between">
            <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Vector Chunks Embedded</div>
            <div className="text-white text-3xl font-bold mt-2">{documentSummary.embedded}</div>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-sm text-white flex justify-between items-center">
            <span><span className="font-semibold text-error">System Error:</span> {error}</span>
            <button onClick={() => setError('')} className="material-symbols-outlined text-xs hover:text-white">close</button>
          </div>
        )}

        {uploadError && (
          <div className="mb-6 rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-sm text-white flex justify-between items-center">
            <span><span className="font-semibold text-error">Upload Error:</span> {uploadError}</span>
            <button onClick={() => setUploadError('')} className="material-symbols-outlined text-xs hover:text-white">close</button>
          </div>
        )}

        {/* Main Page Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
          
          {/* Left Column: Indexed Repositories & Documents (Span 2) */}
          <div className="lg:col-span-2 flex flex-col gap-lg">
            
            {/* Search & Filter Bar */}
            <form onSubmit={handleSearchSubmit} className="bg-surface-container border border-white/5 rounded-xl p-2 flex items-center justify-between shadow-md">
              <div className="relative flex-1 max-w-lg">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
                <input 
                  className="w-full bg-transparent border-none text-white placeholder:text-slate-500 focus:ring-0 font-body-sm pl-10 pr-4 outline-none" 
                  placeholder="Type query + press Enter for Semantic Search..." 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    if (!e.target.value.trim()) {
                      setIsSemanticSearch(false)
                      setSemanticResults([])
                    }
                  }}
                />
              </div>
              <div className="flex items-center gap-xs border-l border-white/10 pl-sm ml-sm">
                <button 
                  type="submit"
                  className="text-primary hover:brightness-110 px-3 py-1 rounded bg-primary/10 border border-primary/20 text-xs font-semibold"
                >
                  Query Vector DB
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setSearchQuery('')
                    setIsSemanticSearch(false)
                    setSemanticResults([])
                  }}
                  className="text-slate-400 hover:text-white p-xs rounded hover:bg-white/5 transition-colors font-body-sm text-xs ml-2"
                >
                  Clear
                </button>
              </div>
            </form>

            {/* Documents List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              {isLoading ? (
                <div className="bg-surface-container border border-white/5 rounded-xl p-8 text-slate-400 md:col-span-2 text-center flex flex-col items-center gap-3">
                  <span className="material-symbols-outlined text-3xl animate-spin text-primary">sync</span>
                  <p>Loading documents from PGVector store...</p>
                </div>
              ) : filteredDocuments.length === 0 ? (
                <div className="bg-surface-container border border-white/5 rounded-xl p-8 text-slate-400 md:col-span-2 text-center">
                  {searchQuery ? 'No documents matched your local search.' : 'No documents indexed in your knowledge base yet. Upload a code spec or guidelines file to get started.'}
                </div>
              ) : (
                filteredDocuments.map((doc) => {
                  const { icon, label, color } = getFileInfo(doc.filename)
                  const isSelected = selectedDoc?.id === doc.id

                  return (
                    <div 
                      key={doc.id} 
                      onClick={() => {
                        setSelectedDoc(doc)
                        setIsSemanticSearch(false)
                      }}
                      className={`bg-surface-container border rounded-xl p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between relative group ${
                        isSelected 
                          ? 'border-primary shadow-[0_0_15px_rgba(59,130,246,0.15)] bg-surface-container-high' 
                          : 'border-white/5 hover:border-white/15'
                      }`}
                    >
                      {/* Top Row: Icon & Status */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center border"
                            style={{ backgroundColor: `${color}10`, borderColor: `${color}30`, color }}
                          >
                            <span className="material-symbols-outlined text-[20px]">{icon}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm text-white group-hover:text-primary transition-colors line-clamp-1">{doc.filename}</h3>
                            <p className="text-[10px] text-slate-400 font-mono mt-0.5">{label}</p>
                          </div>
                        </div>

                        {/* Delete Button */}
                        <button 
                          onClick={(e) => handleDeleteDoc(doc.id, e)}
                          className="text-slate-500 hover:text-red-400 p-1 rounded hover:bg-white/5 transition-colors"
                          title="Remove document"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>

                      {/* Stats & Metadata */}
                      <div className="flex items-center justify-between text-xs text-slate-400 border-t border-white/5 pt-3 mt-4">
                        <span className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[14px]">calendar_today</span> 
                          {doc.uploaded_at ? new Date(doc.uploaded_at).toLocaleDateString() : 'Unknown'}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider border uppercase ${
                          doc.status === 'embedded' 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse'
                        }`}>
                          {doc.status}
                        </span>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          {/* Right Column: Retrieved Context Panel (Vector chunks display) */}
          <div className="lg:col-span-1">
            <div className="bg-[#1C2128] border border-white/5 rounded-xl flex flex-col sticky top-20 shadow-xl overflow-hidden min-h-[500px]">
              
              {/* Panel Header */}
              <div className="p-4 border-b border-white/5 flex items-center justify-between bg-surface-container-high">
                <h3 className="font-semibold text-sm text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-400 text-[18px]">manage_search</span>
                  Retrieved Context
                </h3>
                {selectedDoc && (
                  <button 
                    onClick={() => handleDeleteDoc(selectedDoc.id)}
                    className="text-slate-400 hover:text-red-400"
                    title="Remove selected document"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                )}
              </div>

              {/* Panel Body */}
              <div className="p-4 flex-1 flex flex-col justify-between overflow-y-auto">
                <div>
                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                    {isSemanticSearch ? (
                      <span>Showing top semantic similarity matches for: <strong className="text-blue-400">"{searchQuery}"</strong></span>
                    ) : selectedDoc ? (
                      <span>Showing indexed chunks for: <strong className="text-blue-400">{selectedDoc.filename}</strong></span>
                    ) : (
                      <span>No document selected. Click a card to inspect vector database chunks.</span>
                    )}
                  </p>

                  {/* Chunks/Snippets Code Block */}
                  {loadingChunks ? (
                    <div className="py-12 flex flex-col items-center justify-center gap-2 text-slate-500 text-xs">
                      <span className="material-symbols-outlined text-2xl animate-spin text-primary">sync</span>
                      <p>Fetching embeddings...</p>
                    </div>
                  ) : isSemanticSearch ? (
                    semanticResults.length === 0 ? (
                      <div className="py-8 text-center text-xs text-slate-500">No matching embeddings found. Try another query.</div>
                    ) : (
                      <div className="space-y-4">
                        {semanticResults.map((result, index) => (
                          <div key={index} className="bg-black/30 border border-white/5 rounded-lg p-3">
                            <div className="text-[10px] text-blue-400 font-mono mb-1.5 flex justify-between">
                              <span>Match #{index + 1}</span>
                              <span className="text-slate-500">{result.metadata?.filename}</span>
                            </div>
                            <pre className="text-[11px] font-mono text-slate-300 whitespace-pre-wrap leading-relaxed max-h-[150px] overflow-y-auto">
                              {result.page_content}
                            </pre>
                          </div>
                        ))}
                      </div>
                    )
                  ) : chunks.length === 0 ? (
                    <div className="py-12 text-center text-xs text-slate-500">
                      {selectedDoc ? 'No embedded chunks exist for this file.' : 'Select a document on the left.'}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {chunks.map((chunk, index) => (
                        <div key={index} className="bg-black/30 border border-white/5 rounded-lg p-3">
                          <div className="text-[10px] text-blue-400 font-mono mb-1.5">
                            Chunk #{index + 1} / {chunks.length}
                          </div>
                          <pre className="text-[11px] font-mono text-slate-300 whitespace-pre-wrap leading-relaxed max-h-[180px] overflow-y-auto">
                            {chunk.content}
                          </pre>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Related Entities Badges */}
                <div className="mt-6 border-t border-white/5 pt-4">
                  <h4 className="text-xs font-semibold text-slate-400 mb-2.5 uppercase tracking-wider">Related Entities</h4>
                  <div className="flex flex-wrap gap-2">
                    {relatedEntities.map((entity, i) => (
                      <span 
                        key={i} 
                        className="px-2.5 py-1 bg-surface-container border border-outline-variant rounded-full text-[10px] font-semibold text-slate-300"
                      >
                        {entity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Panel Footer */}
              <div className="p-3 border-t border-white/5 bg-surface-container-low">
                <button 
                  onClick={() => alert("Opened Knowledge Base Mainframe integration successfully.")}
                  className="w-full bg-surface-container border border-outline-variant hover:bg-surface-container-high text-slate-300 font-button-text py-2 rounded transition-colors text-xs font-bold"
                >
                  {documentSummary.total > 0 ? 'Open in Mainframe' : 'Connect Backend First'}
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
