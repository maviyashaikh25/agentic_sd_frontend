const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')

function getBaseLocation() {
  if (API_BASE_URL) {
    return API_BASE_URL
  }

  if (typeof window !== 'undefined') {
    return window.location.origin
  }

  return 'http://localhost:8000'
}

function toWebSocketBaseUrl(url) {
  return url.replace(/^http/i, 'ws')
}

async function request(path, options = {}) {
  const token = localStorage.getItem('auth_token')
  const authHeaders = token ? { 'Authorization': `Bearer ${token}` } : {}

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
      ...(options.headers || {}),
    },
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    signal: options.signal,
  })

  const contentType = response.headers.get('content-type') || ''
  const payload = contentType.includes('application/json')
    ? await response.json()
    : await response.text()

  if (!response.ok) {
    const detail = typeof payload === 'string' ? payload : payload?.detail
    throw new Error(detail || `Request failed with status ${response.status}`)
  }

  return payload
}

export const api = {
  health: () => request('/health'),
  
  // Auth API
  register: (username, password) => request('/api/auth/register', { method: 'POST', body: { username, password } }),
  login: (username, password) => request('/api/auth/login', { method: 'POST', body: { username, password } }),
  getMe: () => request('/api/auth/me'),

  // Project API
  listProjects: (signal) => request('/api/projects', { signal }),
  createProject: (project) => request('/api/projects', { method: 'POST', body: project }),
  
  // Document/Knowledge API
  listDocuments: (signal) => request('/api/memory/documents', { signal }),
  uploadDocument: (formData) => fetch(`${API_BASE_URL || ''}/api/memory/upload`, {
    method: 'POST',
    headers: (() => {
      const token = localStorage.getItem('auth_token');
      return token ? { 'Authorization': `Bearer ${token}` } : {};
    })(),
    body: formData,
  }).then(async (response) => {
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.detail || 'Upload failed');
    return payload;
  }),
  deleteDocument: (docId) => request(`/api/memory/documents/${docId}`, { method: 'DELETE' }),
  getDocumentChunks: (docId) => request(`/api/memory/documents/${docId}/chunks`),
  searchKnowledgeBase: (query) => request(`/api/memory/search?query=${encodeURIComponent(query)}`),

  // Chat API & Sessions
  listSessions: (signal) => request('/api/chat/sessions', { signal }),
  createSession: () => request('/api/chat/sessions', { method: 'POST' }),
  deleteSession: (sessionId) => request(`/api/chat/sessions/${sessionId}`, { method: 'DELETE' }),
  getSessionMessages: (sessionId, signal) => request(`/api/chat/sessions/${sessionId}/messages`, { signal }),
  sendChatMessage: (message, sessionId) => request('/api/chat', { method: 'POST', body: { message, session_id: sessionId } }),
  getFileContent: (filePath) => request(`/api/chat/file-content?path=${encodeURIComponent(filePath)}`),
}

export function getActivityWebSocketUrl() {
  const baseUrl = toWebSocketBaseUrl(getBaseLocation())
  return `${baseUrl}/api/ws/activity`
}

export { API_BASE_URL }