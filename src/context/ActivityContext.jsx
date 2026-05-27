import React, { createContext, useContext, useState, useEffect } from 'react'
import { getActivityWebSocketUrl } from '../lib/api'

const ActivityContext = createContext(null)

export function useActivity() {
  return useContext(ActivityContext)
}

// Default agent roster shown immediately — status is updated via WebSocket
const DEFAULT_AGENTS = [
  { name: 'Intent Classifier', description: 'Analyzes user intent and routes to appropriate mode', status: 'idle', progress: 0 },
  { name: 'Manager Agent', description: 'Coordinates tasks between specialized agents', status: 'idle', progress: 0 },
  { name: 'Frontend Agent', description: 'Handles UI/UX implementation tasks', status: 'idle', progress: 0 },
  { name: 'Backend Agent', description: 'Manages server side logic and APIs', status: 'idle', progress: 0 },
  { name: 'QA Agent', description: 'Performs testing and quality assurance', status: 'idle', progress: 0 },
  { name: 'RAG Agent', description: 'Retrieves contextual knowledge from database', status: 'idle', progress: 0 },
  { name: 'Refiner Agent', description: 'Refines and compiles the final optimized code', status: 'idle', progress: 0 },
]

function mergeAgents(defaults, liveAgents) {
  if (!liveAgents || liveAgents.length === 0) return defaults
  // Merge live data over defaults by name
  return defaults.map((def) => {
    const live = liveAgents.find((a) => a.name === def.name)
    return live ? { ...def, ...live } : def
  })
}

function createTimelineEntry(payload) {
  return {
    id: `${payload.phase || 'event'}-${payload.timestamp || Date.now()}`,
    agent: payload.title || payload.activeAgent || 'System',
    title: payload.title || 'Activity update',
    description: payload.description || '',
    label: payload.timelineEntry?.label || 'just now',
    status: payload.activeStatus || 'idle',
    timestamp: payload.timestamp,
  }
}

export const ActivityProvider = ({ children }) => {
  const [connected, setConnected] = useState(false)
  const [connectionLabel, setConnectionLabel] = useState('idle')
  const [agents, setAgents] = useState(DEFAULT_AGENTS)
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    const socketUrl = getActivityWebSocketUrl()
    let socket
    let reconnectTimer
    let disposed = false

    const connect = () => {
      socket = new WebSocket(socketUrl)

      socket.onopen = () => {
        if (disposed) return
        setConnected(true)
        setConnectionLabel('live')
      }

      socket.onmessage = (event) => {
        if (disposed) return

        try {
          const payload = JSON.parse(event.data)
          if (payload.connectionState === 'idle') {
            setAgents((prev) => mergeAgents(prev, payload.activeAgents))
            setConnected(true)
            setConnectionLabel('idle')
            return
          }

          if (Array.isArray(payload.activeAgents)) {
            setAgents((prev) => mergeAgents(prev, payload.activeAgents))
          }

          if (payload.type === 'activity' && payload.timelineEntry) {
            setTimeline((currentTimeline) => {
              const entry = createTimelineEntry(payload)
              return [entry, ...currentTimeline].slice(0, 20)
            })
          }

          setConnected(true)
          setConnectionLabel(payload.phase === 'complete' ? 'complete' : 'live')
        } catch (error) {
          setTimeline((currentTimeline) => [
            {
              id: `raw-${Date.now()}`,
              agent: 'System',
              title: 'WebSocket Event',
              description: event.data,
              label: 'just now',
              status: 'active',
              timestamp: new Date().toISOString(),
            },
            ...currentTimeline,
          ].slice(0, 20))
        }
      }

      socket.onclose = () => {
        if (disposed) return
        setConnected(false)
        setConnectionLabel('reconnecting')
        reconnectTimer = window.setTimeout(connect, 2500)
      }

      socket.onerror = () => {
        setConnected(false)
        setConnectionLabel('offline')
      }
    }

    connect()

    return () => {
      disposed = true
      window.clearTimeout(reconnectTimer)
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close()
      }
    }
  }, [])

  return (
    <ActivityContext.Provider value={{ connected, connectionLabel, agents, timeline }}>
      {children}
    </ActivityContext.Provider>
  )
}

