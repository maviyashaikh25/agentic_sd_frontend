import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { api } from '../lib/api'
import { useAuth } from './AuthContext'

const ChatContext = createContext(null)

export function useChatContext() {
  return useContext(ChatContext)
}

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'assistant',
  author: 'Manager Agent',
  content:
    'Connected to the backend. Send a prompt and I will return an action summary, status, and repository files.',
  meta: 'Ready',
  status: 'connected',
  filesWritten: [],
  qaFeedback: '',
}

export const ChatProvider = ({ children }) => {
  const { isAuthenticated } = useAuth()

  const [sessions, setSessions] = useState([])
  const [activeSessionId, setActiveSessionId] = useState(null)
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  
  const [isSending, setIsSending] = useState(false)
  const [backendError, setBackendError] = useState('')
  const [loadingHistory, setLoadingHistory] = useState(false)

  // Fetch all sessions when user is authenticated
  const loadSessions = useCallback(async (selectDefault = true) => {
    if (!isAuthenticated) return
    try {
      const data = await api.listSessions()
      setSessions(data)
      
      if (selectDefault) {
        // Automatically select the first/most recent session if none selected
        if (data.length > 0) {
          setActiveSessionId(data[0].id)
        } else {
          // Create an initial session if none exist
          const newSession = await api.createSession()
          setSessions([newSession])
          setActiveSessionId(newSession.id)
        }
      }
    } catch (err) {
      console.error('Failed to load chat sessions:', err)
      setBackendError(err.message)
    }
  }, [isAuthenticated])

  // Reload sessions on auth change
  useEffect(() => {
    if (isAuthenticated) {
      loadSessions(true)
    } else {
      // Reset state on logout
      setSessions([])
      setActiveSessionId(null)
      setMessages([WELCOME_MESSAGE])
      setIsSending(false)
      setBackendError('')
    }
  }, [isAuthenticated, loadSessions])

  // Fetch messages when active session changes
  useEffect(() => {
    let active = true
    const fetchMessages = async () => {
      if (!activeSessionId || !isAuthenticated) return
      try {
        setLoadingHistory(true)
        const data = await api.getSessionMessages(activeSessionId)
        if (active) {
          if (data.length > 0) {
            const mapped = data.map(msg => ({
              id: msg.id,
              role: msg.role,
              author: msg.author,
              content: msg.content,
              meta: msg.meta || '',
              status: msg.status || '',
              filesWritten: msg.files_written || [],
              qaFeedback: msg.qa_feedback || '',
              frontendDesc: msg.frontend_desc || '',
              backendDesc: msg.backend_desc || '',
            }))
            setMessages(mapped)
          } else {
            setMessages([WELCOME_MESSAGE])
          }
        }
      } catch (err) {
        console.error('Failed to load messages:', err)
        if (active) {
          setMessages([WELCOME_MESSAGE])
        }
      } finally {
        if (active) {
          setLoadingHistory(false)
        }
      }
    }

    fetchMessages()
    return () => {
      active = false
    }
  }, [activeSessionId, isAuthenticated])

  const createSession = useCallback(async () => {
    if (!isAuthenticated) return
    try {
      const newSession = await api.createSession()
      setSessions(prev => [newSession, ...prev])
      setActiveSessionId(newSession.id)
      setMessages([WELCOME_MESSAGE])
      return newSession
    } catch (err) {
      setBackendError(err.message)
      throw err
    }
  }, [isAuthenticated])

  const deleteSession = useCallback(async (sessionId) => {
    if (!isAuthenticated) return
    try {
      await api.deleteSession(sessionId)
      
      setSessions(prev => {
        const filtered = prev.filter(s => s.id !== sessionId)
        // If the deleted session was active, switch to the next available one
        if (activeSessionId === sessionId) {
          if (filtered.length > 0) {
            setActiveSessionId(filtered[0].id)
          } else {
            // Create a new session asynchronously
            api.createSession().then(newSession => {
              setSessions([newSession])
              setActiveSessionId(newSession.id)
            })
          }
        }
        return filtered
      })
    } catch (err) {
      setBackendError(err.message)
    }
  }, [isAuthenticated, activeSessionId])

  const sendMessage = useCallback(async (trimmedMessage) => {
    if (!trimmedMessage || isSending) return

    let sessionId = activeSessionId
    if (!sessionId) {
      try {
        const newSession = await createSession()
        sessionId = newSession.id
      } catch (err) {
        return
      }
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      author: 'You',
      content: trimmedMessage,
      meta: 'Sent to /api/chat',
      status: 'sent',
      filesWritten: [],
      qaFeedback: '',
    }

    setMessages((prev) => [...prev, userMessage])
    setIsSending(true)
    setBackendError('')

    try {
      const response = await api.sendChatMessage(trimmedMessage, sessionId)

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          author: 'Manager Agent',
          content:
            response.action_result ||
            response.reply ||
            'The backend returned an empty response.',
          meta: response.intent_detected
            ? `Intent: ${response.intent_detected}`
            : 'Intent unavailable',
          status: response.status || 'unknown',
          filesWritten: response.files_written || [],
          qaFeedback: response.qa_feedback || '',
          frontendDesc: response.frontend_desc || '',
          backendDesc: response.backend_desc || '',
        },
      ])

      // Refresh sessions (pulls title update)
      await loadSessions(false)
    } catch (error) {
      setBackendError(error.message)
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: 'assistant',
          author: 'Backend Error',
          content: error.message,
          meta: 'Request failed',
          status: 'error',
          filesWritten: [],
          qaFeedback: '',
        },
      ])
    } finally {
      setIsSending(false)
    }
  }, [isSending, activeSessionId, createSession, loadSessions])

  return (
    <ChatContext.Provider
      value={{
        messages,
        sessions,
        activeSessionId,
        isSending,
        backendError,
        loadingHistory,
        sendMessage,
        createSession,
        deleteSession,
        setActiveSessionId,
        loadSessions,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

