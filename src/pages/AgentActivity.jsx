import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useActivity } from '../context/ActivityContext'

function formatRelativeTime(timestamp, clock) {
  if (!timestamp) {
    return 'just now'
  }

  const diffSeconds = Math.max(0, Math.floor((clock - new Date(timestamp).getTime()) / 1000))
  if (diffSeconds < 10) {
    return 'just now'
  }

  if (diffSeconds < 60) {
    return `${diffSeconds}s ago`
  }

  const minutes = Math.floor(diffSeconds / 60)
  return `${minutes} min ago`
}

const AgentActivity = () => {
  const { connected, connectionLabel, agents, timeline } = useActivity() || {
    connected: false,
    connectionLabel: 'idle',
    agents: [],
    timeline: []
  }

  const [clock, setClock] = useState(Date.now())
  const scrollRef = useRef(null)

  useEffect(() => {
    setClock(Date.now())
    const clockTimer = window.setInterval(() => setClock(Date.now()), 30000)
    return () => window.clearInterval(clockTimer)
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [timeline])

  // Helper to dynamically adjust timeline entry status
  const getTimelineEntryStatus = (entry, index) => {
    if (entry.status === 'complete') return 'complete'
    if (entry.status === 'active' && index > 0) {
      return 'complete'
    }
    return entry.status
  }

  return (
    <div className="relative min-h-[calc(100vh-56px)] bg-[#0B0E14] text-white p-6 sm:p-8 overflow-y-auto">
      {/* Top Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Agent Activity</h1>
        <p className="mt-2 text-sm text-slate-400 sm:text-base">
          Monitor agent workflow and task execution
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_420px]">
        {/* Active Agents Grid */}
        <section className="flex flex-col">
          <h2 className="text-xl font-bold text-white mb-6">Active Agents</h2>
          
          {agents.length === 0 ? (
            <div className="flex-1 min-h-[300px] flex items-center justify-center rounded-2xl border border-dashed border-white/5 bg-[#111215] text-slate-400">
              <div className="text-center">
                <span className="material-symbols-outlined text-4xl animate-pulse text-blue-500 mb-2">sync</span>
                <p className="text-sm">Connecting to WebSocket feed...</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {agents.map((agent) => {
                const isActive = agent.status === 'active'
                const isComplete = agent.status === 'complete'
                
                return (
                  <article
                    key={agent.name}
                    className={`min-h-[220px] rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 ${
                      isActive 
                        ? 'border-blue-500 bg-[#111215] shadow-[0_0_20px_rgba(59,130,246,0.12)]' 
                        : isComplete 
                          ? 'border-emerald-500/20 bg-[#111215]' 
                          : 'border-white/5 bg-[#111215]'
                    }`}
                  >
                    <div>
                      {/* Top Bar inside Card */}
                      <div className="flex items-start justify-between">
                        <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-indigo-950/40 border border-indigo-500/10 text-blue-400">
                          <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                        </div>
                        
                        <span className={`px-2.5 py-0.5 rounded-md text-xs font-semibold tracking-wide border capitalize ${
                          isComplete 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                            : isActive 
                              ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                              : 'bg-zinc-800/40 text-zinc-400 border-zinc-700/30'
                        }`}>
                          {agent.status}
                        </span>
                      </div>

                      {/* Card Content */}
                      <h3 className="text-lg font-bold text-white mt-4">{agent.name}</h3>
                      <p className="mt-2 text-sm text-slate-400 leading-relaxed">{agent.description}</p>
                    </div>

                    {/* Progress indicator for active agent */}
                    {isActive && (
                      <div className="mt-6 flex items-center gap-3">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500"
                            style={{ width: `${agent.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-slate-400 shrink-0">Processing</span>
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          )}
        </section>

        {/* Activity Timeline */}
        <section className="flex flex-col">
          <h2 className="text-xl font-bold text-white mb-6">Activity Timeline</h2>

          {timeline.length === 0 ? (
            <div className="min-h-[300px] flex items-center justify-center rounded-2xl border border-dashed border-white/5 bg-[#111215] text-slate-500 text-sm py-10">
              <div className="text-center">
                <span className="material-symbols-outlined text-3xl mb-2 text-slate-600">hourglass_empty</span>
                <p>No activity streamed yet</p>
              </div>
            </div>
          ) : (
            <div className="relative pl-1">
              {/* Vertical connecting line */}
              <div className="absolute left-[13px] top-3 bottom-3 w-px bg-white/5" />
              
              <div className="space-y-6">
                {timeline.map((entry, index) => {
                  const displayStatus = getTimelineEntryStatus(entry, index)
                  const isComplete = displayStatus === 'complete'
                  const isActive = displayStatus === 'active'

                  return (
                    <div key={entry.id} className="relative pl-8">
                      {/* Status node circle */}
                      <div className={`absolute left-0 top-1.5 flex h-7 w-7 items-center justify-center rounded-full border bg-[#0B0E14] transition-all duration-300 ${
                        isComplete 
                          ? 'border-emerald-500/30 text-emerald-400' 
                          : isActive 
                            ? 'border-blue-500/30 text-blue-400' 
                            : 'border-white/5 text-slate-500'
                      }`}>
                        <span className="material-symbols-outlined text-[15px]">
                          {isComplete ? 'check' : isActive ? 'schedule' : 'radio_button_unchecked'}
                        </span>
                      </div>

                      {/* Card box */}
                      <div className="w-full rounded-xl border border-white/5 bg-[#111215] p-4 transition-colors hover:border-white/10">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2">
                            {/* Git Branch Icon SVG */}
                            <svg className="w-3.5 h-3.5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="6" y1="3" x2="6" y2="15"></line>
                              <circle cx="18" cy="6" r="3"></circle>
                              <circle cx="6" cy="18" r="3"></circle>
                              <path d="M18 9a9 9 0 0 1-9 9"></path>
                            </svg>
                            
                            <span className="text-sm font-semibold text-white">{entry.agent}</span>
                          </div>
                          
                          <span className="text-xs text-slate-500 shrink-0">
                            {formatRelativeTime(entry.timestamp, clock)}
                          </span>
                        </div>
                        
                        <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                          {entry.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div ref={scrollRef} />
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default AgentActivity