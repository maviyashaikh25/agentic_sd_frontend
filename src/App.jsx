import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import DashboardOverview from './pages/DashboardOverview';
import ChatWorkspace from './pages/ChatWorkspace';
import ProjectBoard from './pages/ProjectBoard';
import AgentActivity from './pages/AgentActivity';
import KnowledgeBase from './pages/KnowledgeBase';
import DebugCenter from './pages/DebugCenter';
import Settings from './pages/Settings';
import Login from './pages/Login';
import MainLayout from './components/MainLayout';
import { ActivityProvider } from './context/ActivityContext';
import { ChatProvider } from './context/ChatContext';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0E14] text-slate-100 flex flex-col justify-center items-center font-mono">
        <span className="material-symbols-outlined text-3xl animate-spin text-blue-500 mb-2">sync</span>
        <p className="text-[11px] text-slate-400 tracking-wider uppercase">Loading security protocol...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ActivityProvider>
          <ChatProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />

              {/* Protected/Internal Layout with Sidebar */}
              <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                <Route path="/dashboard" element={<DashboardOverview />} />
                <Route path="/chat" element={<ChatWorkspace />} />
                <Route path="/board" element={<ProjectBoard />} />
                <Route path="/activity" element={<AgentActivity />} />
                <Route path="/knowledge" element={<KnowledgeBase />} />
                <Route path="/debug" element={<DebugCenter />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Routes>
          </ChatProvider>
        </ActivityProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

