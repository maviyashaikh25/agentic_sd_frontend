import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useChatContext } from '../context/ChatContext'
import { useActivity } from '../context/ActivityContext'
import { api } from '../lib/api'

// ─── VS Code-style Repository File Tree ──────────────────────────────────────

function buildTree(paths) {
  const root = {}
  for (const filePath of paths) {
    const normalized = filePath.replace(/\\/g, '/')
    const parts = normalized.split('/')
    let node = root
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      if (i === parts.length - 1) {
        node[part] = { __is_file: true, filePath }
      } else {
        if (!node[part]) {
          node[part] = {}
        }
        node = node[part]
      }
    }
  }
  return root
}

const FILE_ICONS = {
  py:   { icon: 'code', color: '#3b8cf8' },
  js:   { icon: 'javascript', color: '#f7df1e' },
  jsx:  { icon: 'code', color: '#61dafb' },
  ts:   { icon: 'code', color: '#007acc' },
  tsx:  { icon: 'code', color: '#007acc' },
  json: { icon: 'data_object', color: '#ffb547' },
  md:   { icon: 'description', color: '#aaa' },
  css:  { icon: 'palette', color: '#e879f9' },
  html: { icon: 'html', color: '#e34c26' },
  txt:  { icon: 'article', color: '#aaa' },
  yml:  { icon: 'settings', color: '#e97925' },
  yaml: { icon: 'settings', color: '#e97925' },
  env:  { icon: 'lock', color: '#8bc34a' },
}

function FileIcon({ name }) {
  const ext = name.split('.').pop().toLowerCase()
  const cfg = FILE_ICONS[ext] || { icon: 'insert_drive_file', color: '#9ca3af' }
  return (
    <span
      className="material-symbols-outlined"
      style={{ fontSize: 14, color: cfg.color, flexShrink: 0 }}
    >
      {cfg.icon}
    </span>
  )
}

function TreeNode({ name, node, depth = 0, onFileClick }) {
  const isFolder = node === null || typeof node !== 'object' || !node.__is_file
  const [open, setOpen] = useState(true)

  const indent = depth * 14

  if (!isFolder) {
    return (
      <div
        className="flex items-center gap-1.5 py-[3.5px] px-2 rounded hover:bg-white/10 cursor-pointer transition-colors"
        style={{ paddingLeft: indent + 4 }}
        onClick={() => onFileClick && onFileClick(node.filePath)}
      >
        <FileIcon name={name} />
        <span style={{ fontSize: 12, color: '#cdd3de', fontFamily: 'monospace' }}>{name}</span>
      </div>
    )
  }

  return (
    <div>
      <div
        className="flex items-center gap-1 py-[3.5px] px-2 rounded hover:bg-white/5 cursor-pointer select-none transition-colors"
        style={{ paddingLeft: indent + 2 }}
        onClick={() => setOpen((o) => !o)}
      >
        <span
          className="material-symbols-outlined"
          style={{ fontSize: 13, color: '#6b7280', transform: open ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }}
        >
          chevron_right
        </span>
        <span
          className="material-symbols-outlined"
          style={{ fontSize: 14, color: open ? '#e2b340' : '#9ca3af', flexShrink: 0 }}
        >
          {open ? 'folder_open' : 'folder'}
        </span>
        <span style={{ fontSize: 12, color: '#cdd3de', fontFamily: 'monospace' }}>{name}</span>
      </div>
      {open && (
        <div>
          {Object.entries(node).map(([childName, childNode]) => (
            <TreeNode key={childName} name={childName} node={childNode} depth={depth + 1} onFileClick={onFileClick} />
          ))}
        </div>
      )}
    </div>
  )
}

function RepoFileTree({ files, onFileClick }) {
  const tree = useMemo(() => buildTree(files), [files])

  return (
    <div
      style={{
        marginTop: 12,
        borderRadius: 8,
        border: '1px solid rgba(255,255,255,0.08)',
        background: '#0d1117',
        padding: '8px 4px',
        minWidth: 0,
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          paddingLeft: 8,
          paddingBottom: 6,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          marginBottom: 4,
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#4b9ef5' }}>
          account_tree
        </span>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#8892b0', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'monospace' }}>
          Repository Files
        </span>
        <span
          style={{
            marginLeft: 'auto',
            marginRight: 8,
            fontSize: 10,
            color: '#8892b0',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 4,
            padding: '1px 6px',
            fontFamily: 'monospace',
          }}
        >
          {files.length} file{files.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Tree */}
      <div style={{ paddingTop: 2 }}>
        {Object.entries(tree).map(([name, node]) => (
          <TreeNode key={name} name={name} node={node} depth={0} onFileClick={onFileClick} />
        ))}
      </div>
    </div>
  )
}

// ─── Orchestration Steps Component ──────────────────────────────────────────

function OrchestrationCard({ activeAgents = [], id = "AUTH-FLOW-992", isActive = false }) {
  const getAgentData = (name, defaultDesc, icon, colorClass) => {
    const live = activeAgents.find(a => a.name.toLowerCase().includes(name.toLowerCase()))
    
    let status = "PENDING DEPENDENCY"
    let statusColor = "bg-zinc-800/40 text-zinc-400 border-zinc-700/30"
    
    if (live) {
      if (live.status === "active") {
        status = "IN PROGRESS"
        statusColor = "bg-blue-500/10 text-blue-400 border-blue-500/20 animate-pulse"
      } else if (live.status === "complete") {
        status = "COMPLETED"
        statusColor = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      } else if (live.status === "error") {
        status = "FAILED"
        statusColor = "bg-red-500/10 text-red-400 border-red-500/20"
      }
    } else if (!isActive) {
      status = "COMPLETED"
      statusColor = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    }

    return {
      name: name + " Agent",
      desc: live?.description || defaultDesc,
      status,
      statusColor,
      icon,
      colorClass
    }
  }

  const steps = [
    getAgentData(
      "Frontend",
      "Building React components, state management, and error handling views.",
      "code",
      "text-blue-400"
    ),
    getAgentData(
      "Backend",
      "Configuring backend routes, JWT validation, and database schema updates.",
      "database",
      "text-orange-400"
    ),
    getAgentData(
      "QA",
      "Running quality checks, validating code correctness, and code formatting checks.",
      "check_circle",
      "text-emerald-400"
    ),
    getAgentData(
      "Refiner",
      "Refining and optimizing into a single, efficient final code.",
      "auto_awesome",
      "text-purple-400"
    )
  ]

  return (
    <div className="w-full mt-4 rounded-xl border border-outline-variant bg-[#111215]/80 overflow-hidden backdrop-blur-md">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-surface-container/50 border-b border-[#2e3440]/50">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-blue-400">hub</span>
          <span className="text-xs font-semibold text-white tracking-wider uppercase">Delegation Active</span>
        </div>
        <span className="text-[10px] font-mono text-on-surface-variant bg-surface-container px-2 py-0.5 rounded border border-outline-variant">
          ID: {id}
        </span>
      </div>
      
      {/* Rows */}
      <div className="p-3 divide-y divide-outline-variant/30 space-y-3">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-start justify-between gap-4 pt-3 first:pt-0">
            <div className="flex gap-3">
              <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-surface-container border border-outline-variant/50 flex-shrink-0">
                <span className={`material-symbols-outlined text-[18px] ${step.colorClass}`}>
                  {step.icon === "database" ? "database" : step.icon === "code" ? "terminal" : step.icon === "auto_awesome" ? "auto_awesome" : "fact_check"}
                </span>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{step.name}</div>
                <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">{step.desc}</div>
              </div>
            </div>
            <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider border shrink-0 ${step.statusColor}`}>
              {step.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Code Viewer Modal ────────────────────────────────────────────────────────

function CodeViewerModal({ filePath, onClose }) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let active = true
    const fetchContent = async () => {
      try {
        setLoading(true)
        setError('')
        const res = await api.getFileContent(filePath)
        if (active) {
          setContent(res.content || '')
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Failed to read file content')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }
    fetchContent()
    return () => {
      active = false
    }
  }, [filePath])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const fileName = filePath.split(/[/\\]/).pop()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 sm:p-6">
      <div className="w-full max-w-5xl h-[80vh] bg-[#0d1117] border border-outline-variant rounded-xl flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-surface-container/50 border-b border-outline-variant">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-[18px] text-primary">description</span>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-white truncate">{fileName}</span>
              <span className="text-[10px] text-slate-400 truncate font-mono">{filePath}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!loading && !error && (
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-on-surface-variant hover:text-white hover:bg-surface-variant rounded transition-colors"
              >
                <span className="material-symbols-outlined style={{ fontSize: 16 }}">{copied ? 'check' : 'content_copy'}</span>
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 text-on-surface-variant hover:text-white hover:bg-surface-variant rounded transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-auto p-4 font-mono text-xs">
          {loading ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-slate-400">
              <span className="material-symbols-outlined text-3xl animate-spin text-primary">sync</span>
              <p>Loading file content...</p>
            </div>
          ) : error ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-error">
              <span className="material-symbols-outlined text-3xl">error</span>
              <p>{error}</p>
            </div>
          ) : (
            <pre className="text-left whitespace-pre overflow-x-auto text-[#c9d1d9] bg-black/30 p-4 rounded-lg border border-outline-variant/30 leading-5">
              {content.split('\n').map((line, idx) => (
                <div key={idx} className="flex hover:bg-white/5 px-2 py-0.5 rounded">
                  <span className="w-10 text-right select-none text-slate-500 pr-4">{idx + 1}</span>
                  <span className="flex-1 text-[#e6edf3]">{line || ' '}</span>
                </div>
              ))}
            </pre>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Main Chat Component ──────────────────────────────────────────────────────

const ChatWorkspace = () => {
  const { 
    messages, 
    sessions, 
    activeSessionId, 
    isSending, 
    backendError, 
    loadingHistory,
    sendMessage, 
    createSession, 
    deleteSession, 
    setActiveSessionId 
  } = useChatContext()
  
  const { agents } = useActivity() || { agents: [] }
  
  const [messageText, setMessageText] = useState('')
  const [selectedFilePath, setSelectedFilePath] = useState(null)
  const endOfMessagesRef = useRef(null)

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const statusLabel = useMemo(() => {
    if (isSending) return 'Sending to backend'
    if (backendError) return 'Backend error'
    return 'Backend connected'
  }, [backendError, isSending])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const trimmed = messageText.trim()
    if (!trimmed || isSending) return
    setMessageText('')
    await sendMessage(trimmed)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit(event)
    }
  }

  return (
    <div className="h-full flex relative bg-background overflow-hidden font-['Inter']">
      
      {/* ─── Sessions Sub-Sidebar (Left Pane) ─── */}
      <div className="w-64 bg-[#111215] border-r border-white/5 flex flex-col shrink-0">
        
        {/* New Chat Button */}
        <div className="p-3 border-b border-white/5">
          <button 
            onClick={createSession}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 hover:scale-[1.01] active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            New Session
          </button>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 hide-scrollbar">
          <div className="px-3 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
            Chat History
          </div>
          {sessions.length === 0 ? (
            <div className="p-3 text-center text-xs text-slate-500 font-mono">
              No sessions active
            </div>
          ) : (
            sessions.map((session) => (
              <div 
                key={session.id}
                onClick={() => setActiveSessionId(session.id)}
                className={`group flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all border ${
                  activeSessionId === session.id 
                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/25 shadow-[0_0_12px_rgba(59,130,246,0.05)]' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 border-transparent'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="material-symbols-outlined text-[16px] text-slate-500 group-hover:text-slate-300 shrink-0">
                    forum
                  </span>
                  <span className="truncate text-xs font-medium">{session.title}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteSession(session.id)
                  }}
                  className="opacity-0 group-hover:opacity-100 p-0.5 rounded text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0"
                  title="Delete Session"
                >
                  <span className="material-symbols-outlined text-[14px]">delete</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ─── Active Chat Thread Area (Right Pane) ─── */}
      <div className="flex-1 flex flex-col relative min-w-0 h-full bg-[#0B0E14]">
        
        {/* Loading History Indicator Overlay */}
        {loadingHistory && (
          <div className="absolute inset-0 bg-[#0B0E14]/80 backdrop-blur-sm z-30 flex flex-col justify-center items-center gap-3">
            <span className="material-symbols-outlined text-3xl animate-spin text-blue-500">sync</span>
            <p className="text-xs text-slate-400 font-mono">Syncing chat log history...</p>
          </div>
        )}

        {/* Scrollable Messages Area */}
        <div className="flex-grow overflow-y-auto p-lg flex flex-col gap-xl pb-24 hide-scrollbar">
          {messages.map((message) => {
            const isActionMode = message.role === 'assistant' && message.id !== 'welcome' && message.status !== 'error';

            return (
              <div
                key={message.id}
                className={`flex flex-col w-full max-w-4xl mx-auto gap-sm ${message.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-md mb-xs">
                  <div className={`w-8 h-8 rounded border flex items-center justify-center relative shadow-[0_0_10px_rgba(77,142,255,0.1)] ${message.role === 'user' ? 'border-outline-variant bg-surface-container' : 'border-primary/30 bg-surface-container'}`}>
                    <span className={`material-symbols-outlined text-[18px] ${message.role === 'user' ? 'text-on-surface-variant' : 'text-primary'}`}>
                      {message.role === 'user' ? 'person' : 'robot_2'}
                    </span>
                  </div>
                  <span className="font-heading-md text-heading-md text-on-surface">{message.author}</span>
                  {message.role === 'assistant' && message.id !== 'welcome' ? (
                    <div className="ml-2 flex items-center gap-2 px-2.5 py-1 rounded-full bg-secondary-container/10 border border-secondary-container/30 text-on-secondary-container">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse" />
                      <span className="font-mono-label text-[11px] tracking-wider uppercase font-semibold">Action Mode</span>
                    </div>
                  ) : null}
                  {message.status ? (
                    <span className={`ml-2 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${
                      message.status === 'approved' || message.status === 'connected'
                        ? 'border-primary/30 bg-primary/10 text-primary'
                        : message.status === 'needs_review'
                        ? 'border-amber-400/30 bg-amber-400/10 text-amber-300'
                        : message.status === 'error'
                        ? 'border-error/30 bg-error/10 text-error'
                        : 'border-outline-variant bg-surface-container text-on-surface-variant'
                    }`}>
                      {message.status}
                    </span>
                  ) : null}
                </div>
                <div className={`p-md rounded-xl max-w-[85%] shadow-sm border ${message.role === 'user' ? 'bg-surface-variant border-outline-variant rounded-tr-sm' : 'bg-surface-container border-outline-variant rounded-tl-sm'}`}>
                  <p className="font-body-base text-body-base text-on-surface leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  
                  {/* Orchestration card for historical assistant messages */}
                  {isActionMode && (
                    <OrchestrationCard 
                      activeAgents={[
                        { name: 'Frontend Agent', description: message.frontendDesc || 'Building React components, state management, and error handling views.', status: 'complete' },
                        { name: 'Backend Agent', description: message.backendDesc || 'Configuring backend routes, JWT validation, and database schema updates.', status: 'complete' },
                        { name: 'QA Agent', description: 'Running quality checks, validating code correctness, and code formatting checks.', status: 'complete' },
                        { name: 'Refiner Agent', description: 'Refining and optimizing into a single, efficient final code.', status: 'complete' }
                      ]} 
                      isActive={false} 
                      id={`DELEGATION-${String(message.id).slice(-6)}`} 
                    />
                  )}

                  <div className="mt-2 text-[10px] uppercase tracking-wider text-on-surface-variant font-mono-label">{message.meta}</div>

                  {/* VS Code-style repository file tree */}
                  {message.filesWritten?.length ? (
                    <RepoFileTree files={message.filesWritten} onFileClick={(path) => setSelectedFilePath(path)} />
                  ) : null}

                  {message.qaFeedback ? (
                    <div className="mt-3 rounded-lg border border-outline-variant bg-background/40 p-3 text-xs text-on-surface-variant whitespace-pre-wrap font-mono">
                      <div className="font-semibold text-on-surface mb-2">QA Feedback details</div>
                      {message.qaFeedback}
                    </div>
                  ) : null}
                </div>
              </div>
            )
          })}

          {isSending ? (
            <div className="flex flex-col items-start gap-sm w-full max-w-4xl mx-auto">
              <div className="flex items-center gap-md mb-xs">
                <div className="w-8 h-8 rounded border border-primary/30 bg-surface-container flex items-center justify-center relative shadow-[0_0_10px_rgba(77,142,255,0.1)]">
                  <span className="material-symbols-outlined text-primary text-[18px] animate-pulse">sync</span>
                </div>
                <span className="font-heading-md text-heading-md text-on-surface">Manager Agent</span>
                <div className="ml-2 flex items-center gap-2 px-2.5 py-1 rounded-full bg-secondary-container/10 border border-secondary-container/30 text-on-secondary-container">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse" />
                  <span className="font-mono-label text-[11px] tracking-wider uppercase font-semibold">Delegating Tasks</span>
                </div>
              </div>
              <div className="w-full max-w-[85%] text-on-surface-variant font-body-base text-body-base leading-relaxed">
                <div>Waiting for backend reply and running agent execution graph...</div>
                
                {/* Dynamic live orchestration card during sending */}
                <OrchestrationCard activeAgents={agents} isActive={true} id="DELEGATION-ACTIVE" />
              </div>
            </div>
          ) : null}
          <div ref={endOfMessagesRef} />
        </div>

        {/* Input Area (Fixed Bottom of Chat Pane) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/90 to-transparent flex justify-center z-20">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-4xl bg-[#161B22]/95 border border-white/10 rounded-xl flex items-center p-2 focus-within:ring-2 focus-within:ring-blue-500/25 focus-within:border-blue-500 transition-all shadow-xl"
          >
            <button className="p-2 text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-lg transition-colors flex-shrink-0" type="button">
              <span className="material-symbols-outlined text-[20px]">attach_file</span>
            </button>
            <textarea
              className="flex-1 bg-transparent border-none outline-none resize-none min-h-[32px] max-h-[160px] text-white font-sans text-sm placeholder-slate-500 py-2 px-3 hide-scrollbar focus:ring-0"
              placeholder="Message AgentDev AI or type '/' for commands..."
              rows="1"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isSending}
            />
            <button
              className="p-2 ml-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg hover:brightness-110 active:scale-95 transition-all flex-shrink-0 flex items-center justify-center shadow-lg disabled:opacity-60"
              type="submit"
              disabled={isSending || !messageText.trim()}
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>

      </div>

      {/* Floating Status indicator */}
      <div className="fixed top-16 right-4 z-40 max-w-sm rounded-lg border border-white/5 bg-[#161b22]/90 px-4 py-3 text-xs text-slate-200 shadow-lg backdrop-blur">
        <div className="font-semibold text-slate-100 mb-1">{statusLabel}</div>
        <div className="text-slate-400">POST /api/chat via the FastAPI backend</div>
      </div>

      {backendError ? (
        <div className="fixed top-32 right-4 z-40 max-w-sm rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300 shadow-lg backdrop-blur">
          <div className="font-semibold text-red-400 mb-1">Backend connection error</div>
          <div className="text-slate-400">{backendError}</div>
        </div>
      ) : null}

      {/* Code Viewer Modal */}
      {selectedFilePath && (
        <CodeViewerModal filePath={selectedFilePath} onClose={() => setSelectedFilePath(null)} />
      )}
    </div>
  )
}

export default ChatWorkspace

