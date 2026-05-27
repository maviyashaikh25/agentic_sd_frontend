import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api';

const DashboardOverview = () => {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadProjects() {
      try {
        setIsLoading(true)
        setError('')
        const result = await api.listProjects(controller.signal)
        setProjects(Array.isArray(result) ? result : [])
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message)
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadProjects()

    return () => controller.abort()
  }, [])

  const projectSummary = useMemo(() => {
    const activeCount = projects.filter((project) => project.status !== 'archived').length
    return {
      total: projects.length,
      active: activeCount,
      latest: projects[0],
    }
  }, [projects])

  return (
    <div className="p-lg">
      <div className="max-w-container-max mx-auto">
        {/*  Header & Breadcrumbs  */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-on-surface-variant font-mono-label text-mono-label mb-2">
              <span>Mainframe</span>
              <span className="text-outline">/</span>
              <span>Project Alpha</span>
              <span className="text-outline">/</span>
              <span className="text-primary">Dashboard</span>
            </div>
            <h1 className="text-on-surface font-display-lg text-display-lg">System Overview</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-layer-1 px-4 py-2 rounded flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-on-surface font-body-sm text-body-sm">{isLoading ? 'Syncing projects' : 'Manager Agent Active'}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-layer-1 rounded-lg border border-white/5 p-4">
            <div className="text-on-surface-variant font-mono-label text-mono-label mb-1">Total Projects</div>
            <div className="text-on-surface text-2xl font-semibold">{projectSummary.total}</div>
          </div>
          <div className="bg-layer-1 rounded-lg border border-white/5 p-4">
            <div className="text-on-surface-variant font-mono-label text-mono-label mb-1">Active Projects</div>
            <div className="text-on-surface text-2xl font-semibold">{projectSummary.active}</div>
          </div>
          <div className="bg-layer-1 rounded-lg border border-white/5 p-4">
            <div className="text-on-surface-variant font-mono-label text-mono-label mb-1">Latest Project</div>
            <div className="text-on-surface text-lg font-semibold truncate">{projectSummary.latest?.name || 'None yet'}</div>
          </div>
        </div>
        {error ? (
          <div className="mb-6 rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-sm text-on-surface">
            <span className="font-semibold text-error">Backend unavailable:</span> {error}
          </div>
        ) : null}
        {/*  Bento Grid Layout  */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/*  Agent Status Card (Spans 8)  */}
          <div className="md:col-span-8 bg-layer-1 rounded-lg p-6 flex flex-col relative overflow-hidden group">
            {/*  Decorative background  */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-700"></div>
            <div className="flex justify-between items-start mb-6 z-10">
              <div>
                <h3 className="text-on-surface font-heading-md text-heading-md mb-1 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">smart_toy</span>
                  Active Agents
                </h3>
                <p className="text-on-surface-variant font-body-sm text-body-sm">Current autonomous tasks in progress</p>
              </div>
              <button className="text-primary hover:text-primary-container p-1 rounded hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined">more_horiz</span>
              </button>
            </div>
            <div className="flex-1 flex flex-col gap-3 z-10">
              {isLoading ? (
                <div className="bg-surface-container rounded p-4 border border-white/5 text-on-surface-variant">Loading live project data from the backend...</div>
              ) : projects.length === 0 ? (
                <div className="bg-surface-container rounded p-4 border border-white/5 text-on-surface-variant">No projects have been created yet. Use the backend API to initialize one.</div>
              ) : (
                projects.slice(0, 4).map((project, index) => (
                  <div key={project.id} className={`bg-surface-container rounded p-3 flex items-center justify-between border hover:border-primary/30 transition-colors ${index === 0 ? 'border-primary/20' : 'border-white/5'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded flex items-center justify-center ${index === 0 ? 'bg-primary/10 text-primary glow-pulse' : 'bg-secondary/10 text-secondary'}`}>
                        <span className="material-symbols-outlined text-[16px]">folder</span>
                      </div>
                      <div>
                        <div className="font-button-text text-button-text text-on-surface">{project.name}</div>
                        <div className="font-mono-label text-mono-label text-on-surface-variant mt-1">{project.description || 'No description provided'}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono-label text-mono-label text-on-surface-variant">Status</div>
                      <div className="font-body-sm text-body-sm text-on-surface mt-0.5">{project.status}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          {/*  Quick Links / Actions (Spans 4)  */}
          <div className="md:col-span-4 bg-layer-1 rounded-lg p-6 flex flex-col">
            <h3 className="text-on-surface font-heading-md text-heading-md mb-4">Quick Access</h3>
            <div className="grid grid-cols-2 gap-3 flex-1">
              <a className="bg-surface-container rounded border border-white/5 p-4 flex flex-col items-center justify-center gap-3 hover:bg-surface-container-high hover:border-white/10 transition-all text-center" href="#">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined">dashboard</span>
                </div>
                <span className="font-button-text text-button-text text-on-surface">Project Board</span>
              </a>
              <a className="bg-surface-container rounded border border-white/5 p-4 flex flex-col items-center justify-center gap-3 hover:bg-surface-container-high hover:border-white/10 transition-all text-center" href="#">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined">bug_report</span>
                </div>
                <span className="font-button-text text-button-text text-on-surface">Issue Tracker</span>
              </a>
              <a className="bg-surface-container rounded border border-white/5 p-4 flex flex-col items-center justify-center gap-3 hover:bg-surface-container-high hover:border-white/10 transition-all text-center" href="#">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined">terminal</span>
                </div>
                <span className="font-button-text text-button-text text-on-surface">CLI Access</span>
              </a>
              <a className="bg-surface-container rounded border border-white/5 p-4 flex flex-col items-center justify-center gap-3 hover:bg-surface-container-high hover:border-white/10 transition-all text-center" href="#">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined">library_books</span>
                </div>
                <span className="font-button-text text-button-text text-on-surface">Docs</span>
              </a>
            </div>
          </div>
          {/*  Recent Activity (Spans 12)  */}
          <div className="md:col-span-12 bg-layer-1 rounded-lg p-0 overflow-hidden">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-on-surface font-heading-md text-heading-md">System Log</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded bg-surface-container border border-white/5 font-mono-label text-mono-label text-on-surface hover:bg-white/5">All Events</button>
                <button className="px-3 py-1.5 rounded border border-transparent font-mono-label text-mono-label text-on-surface-variant hover:text-on-surface">Errors Only</button>
              </div>
            </div>
            <div className="divide-y divide-white/5">
              {/*  Log Item 1  */}
              <div className="p-4 px-6 flex items-start gap-4 hover:bg-white/[0.02] transition-colors">
                <div className="mt-1">
                  <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-button-text text-button-text text-on-surface">Projects API Connected</span>
                    <span className="font-mono-label text-mono-label text-on-surface-variant">backend</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Live project data is now rendered from the FastAPI backend.</p>
                </div>
                <div className="font-mono-label text-mono-label text-on-surface-variant">2m ago</div>
              </div>
              {/*  Log Item 2  */}
              <div className="p-4 px-6 flex items-start gap-4 hover:bg-white/[0.02] transition-colors bg-error/5">
                <div className="mt-1">
                  <span className="material-symbols-outlined text-error text-[18px]">error</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-button-text text-button-text text-error">Chat Endpoint Ready</span>
                    <span className="font-mono-label text-mono-label text-on-surface-variant">/api/chat</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Send a message from the chat workspace to reach the backend orchestration graph.</p>
                </div>
                <div className="font-mono-label text-mono-label text-on-surface-variant">15m ago</div>
              </div>
              {/*  Log Item 3  */}
              <div className="p-4 px-6 flex items-start gap-4 hover:bg-white/[0.02] transition-colors">
                <div className="mt-1">
                  <span className="material-symbols-outlined text-secondary text-[18px]">update</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-button-text text-button-text text-on-surface">Documents API Ready</span>
                    <span className="font-mono-label text-mono-label text-on-surface-variant">/api/memory/documents</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">The knowledge base screen now reflects uploaded backend documents.</p>
                </div>
                <div className="font-mono-label text-mono-label text-on-surface-variant">1h ago</div>
              </div>
            </div>
            <div className="p-4 border-t border-white/5 text-center">
              <button className="font-button-text text-button-text text-primary hover:text-primary-container transition-colors">View All Logs</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
