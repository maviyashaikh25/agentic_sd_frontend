<div align="center">

<br />

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

<br /><br />

# 🤖 AgentDevAI — Frontend

### *Multi-Agent Software Engineering Assistant*

> Deploy autonomous developer agents to build, refactor, and debug your entire stack.  
> From architecture design to final deployment — orchestrate complex workflows with precision.

<br />

[**Report a Bug**](https://github.com/maviyashaikh25/agentic_sd_frontend/issues) · [**Request a Feature**](https://github.com/maviyashaikh25/agentic_sd_frontend/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
  - [Production Build](#production-build)
- [Application Pages](#-application-pages)
- [Component Reference](#-component-reference)
- [Context & State Management](#-context--state-management)
- [API Integration](#-api-integration)
- [Routing & Auth Guards](#-routing--auth-guards)
- [Design System](#-design-system)
- [Configuration](#-configuration)
- [Scripts Reference](#-scripts-reference)
- [Environment Variables Reference](#-environment-variables-reference)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**AgentDevAI** is the frontend application for an agentic software development platform. It provides a rich, IDE-like interface that allows users to:

- Spin up **autonomous AI agents** that plan, write, and debug code
- Monitor **live agent activity** via real-time WebSocket streams
- Manage **multi-session AI chat workspaces** with persistent conversation history
- Browse and inspect **AI-generated repositories** with syntax-highlighted file viewers
- Maintain a **vector-backed knowledge base** of documents for context-aware agent reasoning
- Manage projects through an intuitive **Kanban-style project board**

The UI is built with a dark, terminal-inspired design language — think VS Code meets mission-control dashboard.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🧠 **AI Chat Workspace** | Multi-session chat with streaming responses, file tree explorer, and inline code viewer |
| 📊 **Dashboard Overview** | At-a-glance metrics: active agents, projects, memory usage, and recent activity |
| 🗂️ **Project Board** | Kanban-style board to track project status (active, paused, completed) |
| 👁️ **Agent Activity Monitor** | Live feed of agent thoughts, tool calls, file writes, and terminal output via WebSocket |
| 📚 **Knowledge Base** | Upload, search, and manage documents that inform agent context (RAG-powered) |
| 🗄️ **Repository Viewer** | VS Code-style file tree with syntax-highlighted code preview for any generated project |
| 🐛 **Debug Center** | Inspect agent logs, error traces, and tool execution history |
| ⚙️ **Settings** | API configuration, user profile, and appearance preferences |
| 🔐 **Authentication** | JWT-based login/register with protected route guards |
| 🔌 **WebSocket Integration** | Real-time agent activity streaming over `/api/ws/activity` |
| 📱 **Responsive Design** | Fully responsive layout from mobile to ultrawide displays |

---

## 🛠 Tech Stack

### Core

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev/) | `^19.2.5` | UI framework |
| [Vite](https://vitejs.dev/) | `^8.0.10` | Build tool & dev server |
| [React Router DOM](https://reactrouter.com/) | `^7.14.2` | Client-side routing |
| [Tailwind CSS](https://tailwindcss.com/) | `^3.4.19` | Utility-first styling |
| [PostCSS](https://postcss.org/) | `^8.5.13` | CSS processing |
| [Autoprefixer](https://github.com/postcss/autoprefixer) | `^10.5.0` | CSS vendor prefixes |

### Dev Tooling

| Tool | Purpose |
|---|---|
| [ESLint](https://eslint.org/) | Code linting & quality enforcement |
| `eslint-plugin-react-hooks` | React Hooks rules |
| `eslint-plugin-react-refresh` | HMR-safe refresh rules |
| `@vitejs/plugin-react` | React fast refresh + JSX transform |

---

## 🏗 Project Architecture

```
frontend1/
├── public/                     # Static assets served at root
├── src/
│   ├── assets/                 # Images, SVGs, fonts
│   ├── components/             # Reusable layout components
│   │   ├── MainLayout.jsx      # Authenticated shell (sidebar + outlet)
│   │   ├── NavbarLogo.jsx      # Animated SVG brand logo
│   │   ├── Sidebar.jsx         # Navigation sidebar with active indicators
│   │   └── TopNav.jsx          # Top navigation bar with user controls
│   ├── context/                # React Context providers (global state)
│   │   ├── ActivityContext.jsx # WebSocket agent activity stream state
│   │   ├── AuthContext.jsx     # JWT auth state (user, login, logout)
│   │   └── ChatContext.jsx     # Chat sessions, messages, streaming state
│   ├── lib/
│   │   └── api.js              # Centralized API client (fetch wrapper + WS URL)
│   ├── pages/                  # Route-level page components
│   │   ├── LandingPage.jsx     # Public marketing/hero page
│   │   ├── Login.jsx           # Login & registration forms
│   │   ├── DashboardOverview.jsx # Main dashboard with metrics
│   │   ├── ChatWorkspace.jsx   # AI chat with file explorer (largest page)
│   │   ├── ProjectBoard.jsx    # Kanban project management
│   │   ├── AgentActivity.jsx   # Live agent activity monitor
│   │   ├── KnowledgeBase.jsx   # Document upload, search, chunk viewer
│   │   ├── RepositoryView.jsx  # File tree + syntax-highlighted code viewer
│   │   ├── DebugCenter.jsx     # Agent logs & debugging tools
│   │   └── Settings.jsx        # User and system settings
│   ├── App.jsx                 # Root component: router, providers, guards
│   ├── App.css                 # Global component overrides
│   ├── index.css               # Tailwind directives & CSS custom properties
│   └── main.jsx                # React DOM entry point
├── .env                        # Local environment variables (git-ignored)
├── .env.example                # Template for required env vars
├── .gitignore                  # Git ignore rules
├── eslint.config.js            # ESLint flat config
├── index.html                  # HTML entry point (Vite)
├── package.json                # NPM manifest
├── postcss.config.js           # PostCSS config (Tailwind + Autoprefixer)
├── tailwind.config.js          # Tailwind theme & design tokens
└── vite.config.js              # Vite config (dev proxy, plugins)
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** `>= 18.x` ([Download](https://nodejs.org/))
- **npm** `>= 9.x` (bundled with Node.js)
- The **AgentDevAI backend** running at `http://localhost:8000`

> **Note:** The frontend is a pure SPA. It requires the backend to be live for all API features to work. Without it, only the Landing Page will render.

---

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/maviyashaikh25/agentic_sd_frontend.git

# 2. Navigate into the project folder
cd agentic_sd_frontend

# 3. Install dependencies
npm install
```

---

### Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

Open `.env` and configure:

```env
VITE_API_BASE_URL=http://localhost:8000
```

> All Vite environment variables must be prefixed with `VITE_` to be exposed to the browser bundle.  
> See [Vite Env Docs](https://vite.dev/guide/env-and-mode.html).

---

### Running Locally

```bash
npm run dev
```

The development server starts at **http://localhost:5173** with Hot Module Replacement (HMR) enabled.

The Vite dev server proxies the following paths to `http://localhost:8000`:

| Path | Target |
|---|---|
| `/api/*` | Backend REST API (with WebSocket upgrade support) |
| `/health` | Backend health check endpoint |

---

### Production Build

```bash
# Build optimized production bundle
npm run build

# Preview the production build locally
npm run preview
```

The build output is written to the `dist/` directory and is ready to be deployed to any static hosting provider (Vercel, Netlify, AWS S3, Nginx, etc.).

---

## 📄 Application Pages

### Public Routes

| Path | Component | Description |
|---|---|---|
| `/` | `LandingPage` | Marketing hero page with feature highlights and CTA buttons |
| `/login` | `Login` | Combined login + registration form with JWT auth |

### Protected Routes

All protected routes are wrapped in a `MainLayout` that renders the persistent `Sidebar` and `TopNav`. Unauthenticated access redirects to `/login`.

| Path | Component | Description |
|---|---|---|
| `/dashboard` | `DashboardOverview` | Metrics cards, recent projects, activity summary |
| `/chat` | `ChatWorkspace` | AI chat sessions with streaming, file tree, and code viewer |
| `/board` | `ProjectBoard` | Kanban board: Active / Paused / Completed project columns |
| `/activity` | `AgentActivity` | Live real-time agent event feed (WebSocket) |
| `/knowledge` | `KnowledgeBase` | RAG document manager: upload, search, view chunks |
| `/repository` | `RepositoryView` | File tree explorer + syntax-highlighted code viewer |
| `/debug` | `DebugCenter` | Agent log inspector and error trace viewer |
| `/settings` | `Settings` | API URL config, user profile, and app preferences |

---

## 🧩 Component Reference

### `MainLayout.jsx`
The authenticated application shell. Uses React Router's `<Outlet />` to render the active page content alongside the persistent `Sidebar`.

### `Sidebar.jsx`
Left-hand navigation panel with icon+label links for all protected routes. Highlights the active route using `useLocation()`. Collapsible on mobile.

### `TopNav.jsx`
Top navigation bar displayed inside the authenticated layout. Contains user avatar, notification controls, and quick-action buttons.

### `NavbarLogo.jsx`
Animated SVG logo component for the `AgentDevAI` brand. Accepts a `gradientId` prop to support multiple instances on the same page without SVG `id` collisions.

---

## 🌐 Context & State Management

The app uses **React Context** (no external state library) for three domains of global state:

### `AuthContext` — `src/context/AuthContext.jsx`

Manages JWT authentication lifecycle.

| Export | Type | Description |
|---|---|---|
| `useAuth()` | Hook | Access auth state and actions |
| `AuthProvider` | Component | Wrap your component tree |
| `user` | `object \| null` | Authenticated user profile |
| `isAuthenticated` | `boolean` | Derived auth flag |
| `loading` | `boolean` | Token verification in progress |
| `login(username, password)` | `async fn` | POST `/api/auth/login`, stores JWT |
| `register(username, password)` | `async fn` | POST `/api/auth/register`, stores JWT |
| `logout()` | `fn` | Clears token, resets state |
| `authError` | `string` | Last auth error message |

**Token storage:** `localStorage` key `auth_token`

---

### `ChatContext` — `src/context/ChatContext.jsx`

Manages multi-session AI chat state.

| Export | Description |
|---|---|
| `useChatContext()` | Hook to access chat state |
| `ChatProvider` | Context provider component |
| Sessions list | Persisted chat sessions from `/api/chat/sessions` |
| Active session | Currently selected session with its messages |
| Streaming state | Real-time token streaming management |

---

### `ActivityContext` — `src/context/ActivityContext.jsx`

Manages the real-time WebSocket connection to the agent activity stream.

| Export | Description |
|---|---|
| `useActivity()` | Hook to access live agent events |
| `ActivityProvider` | Context provider — opens WebSocket on mount |
| Events feed | Array of structured agent events (tool calls, writes, thoughts, etc.) |

The WebSocket URL is computed by `getActivityWebSocketUrl()` in `src/lib/api.js`:

```
ws://localhost:8000/api/ws/activity
```

---

## 🔌 API Integration

All HTTP requests go through the centralized client in `src/lib/api.js`.

### Authentication

```js
api.login(username, password)    // POST /api/auth/login
api.register(username, password) // POST /api/auth/register
api.getMe()                      // GET  /api/auth/me
```

### Projects

```js
api.listProjects(signal)         // GET    /api/projects
api.createProject(project)       // POST   /api/projects
api.deleteProject(projectId)     // DELETE /api/projects/:id
```

### Chat & Sessions

```js
api.listSessions(signal)                 // GET    /api/chat/sessions
api.createSession()                      // POST   /api/chat/sessions
api.deleteSession(sessionId)             // DELETE /api/chat/sessions/:id
api.getSessionMessages(id, signal)       // GET    /api/chat/sessions/:id/messages
api.sendChatMessage(message, sessionId)  // POST   /api/chat
api.getFileContent(filePath)             // GET    /api/chat/file-content?path=...
api.submitFeedback(runId, score, comment)// POST   /api/chat/feedback
```

### Knowledge Base

```js
api.listDocuments(signal)          // GET    /api/memory/documents
api.uploadDocument(formData)       // POST   /api/memory/upload (multipart)
api.deleteDocument(docId)          // DELETE /api/memory/documents/:id
api.getDocumentChunks(docId)       // GET    /api/memory/documents/:id/chunks
api.searchKnowledgeBase(query)     // GET    /api/memory/search?query=...
```

### WebSocket

```js
import { getActivityWebSocketUrl } from './lib/api'
const url = getActivityWebSocketUrl()
// Returns: ws://localhost:8000/api/ws/activity
```

---

## 🔐 Routing & Auth Guards

The `ProtectedRoute` component in `App.jsx` intercepts all protected routes:

```jsx
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingScreen />;
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};
```

**Redirect behavior:** After successful login, users are redirected back to the page they originally tried to access via React Router's `location.state.from`.

**Route nesting:**
```
/ (BrowserRouter)
├── /              → LandingPage         (public)
├── /login         → Login               (public)
└── (ProtectedRoute → MainLayout)
    ├── /dashboard → DashboardOverview
    ├── /chat      → ChatWorkspace
    ├── /board     → ProjectBoard
    ├── /activity  → AgentActivity
    ├── /knowledge → KnowledgeBase
    ├── /repository→ RepositoryView
    ├── /debug     → DebugCenter
    └── /settings  → Settings
```

---

## 🎨 Design System

The app uses a **custom Material Design 3-inspired dark theme** defined as Tailwind CSS design tokens in `tailwind.config.js`.

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `background` | `#10131a` | Page background |
| `surface` | `#10131a` | Card / panel surface |
| `surface-container` | `#1d2027` | Elevated containers |
| `surface-container-high` | `#272a31` | Modals, popovers |
| `primary` | `#adc6ff` | Primary interactive elements |
| `primary-container` | `#4d8eff` | Buttons, highlights |
| `secondary` | `#ddb7ff` | Secondary accents |
| `secondary-container` | `#6f00be` | Secondary button backgrounds |
| `on-background` | `#e1e2ec` | Primary text |
| `on-surface-variant` | `#c2c6d6` | Secondary / muted text |
| `outline-variant` | `#424754` | Borders, dividers |
| `tertiary` | `#ffb786` | Warnings, amber accents |
| `error` | `#ffb4ab` | Error states |

### Typography

All text uses **Inter** (body/headings) and **Space Grotesk** (monospace labels), loaded via Google Fonts.

| Token | Size | Weight | Usage |
|---|---|---|---|
| `display-lg` | `48px` | `700` | Hero headlines |
| `heading-md` | `18px` | `500` | Section headings |
| `body-base` | `14px` | `400` | Default body text |
| `body-sm` | `13px` | `400` | Captions, helper text |
| `button-text` | `14px` | `500` | Buttons |
| `mono-label` | `12px` | `500` | Code labels, metadata |

### Spacing Scale

| Token | Value |
|---|---|
| `xs` | `4px` |
| `sm` | `8px` |
| `md` | `16px` |
| `lg` | `24px` |
| `xl` | `48px` |
| `container-max` | `1440px` |
| `gutter` | `20px` |

---

## ⚙️ Configuration

### `vite.config.js`

```js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        ws: true,          // ← WebSocket proxy support
      },
      '/health': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
```

> The `ws: true` flag is critical — it enables the Vite dev server to proxy WebSocket upgrade requests for `/api/ws/activity`.

### `tailwind.config.js`

- `darkMode: "class"` — dark mode toggled by a CSS class on the root element
- `content` glob scans `./src/**/*.{js,ts,jsx,tsx}` and `index.html`
- Full custom design token set under `theme.extend`

### `postcss.config.js`

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

## 📜 Scripts Reference

| Script | Command | Description |
|---|---|---|
| `dev` | `vite` | Start Vite dev server with HMR at port 5173 |
| `build` | `vite build` | Build optimized production bundle to `dist/` |
| `preview` | `vite preview` | Serve the production build locally |
| `lint` | `eslint .` | Run ESLint across all source files |

---

## 🔧 Environment Variables Reference

| Variable | Required | Default | Description |
|---|---|---|---|
| `VITE_API_BASE_URL` | No | `window.location.origin` | Base URL of the AgentDevAI backend API |

> If `VITE_API_BASE_URL` is not set, the app falls back to `window.location.origin` — useful for production deployments where the frontend and backend share the same domain.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit your changes** using [Conventional Commits](https://www.conventionalcommits.org/) format:
   ```
   feat(chat): add message retry button
   fix(auth): handle expired token gracefully
   docs(readme): update API reference
   ```
4. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request** against `main`

### Code Style Guidelines

- ESLint is configured with `@eslint/js` recommended rules + React-specific plugins
- Run `npm run lint` before submitting a PR
- Follow existing component structure and naming conventions
- Keep components focused — prefer smaller, composable components
- All new pages must be registered in `App.jsx` and added to the Sidebar

### Reporting Issues

Please use the [GitHub Issues](https://github.com/maviyashaikh25/agentic_sd_frontend/issues) tracker. Include:
- A clear, descriptive title
- Steps to reproduce
- Expected vs. actual behaviour
- Browser + OS + Node.js version

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

Built with ❤️ by [maviyashaikh25](https://github.com/maviyashaikh25)

<br />

⭐ Star this repo · 🐛 [Report Bug](https://github.com/maviyashaikh25/agentic_sd_frontend/issues) · 💡 [Request Feature](https://github.com/maviyashaikh25/agentic_sd_frontend/issues)

</div>
