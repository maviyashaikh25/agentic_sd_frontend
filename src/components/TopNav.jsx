import React, { useState, useRef, useEffect } from 'react';
import NavbarLogo from './NavbarLogo';
import { useActivity } from '../context/ActivityContext';
import { useAuth } from '../context/AuthContext';

const TopNav = () => {
  const { connectionLabel } = useActivity() || { connectionLabel: 'idle' };
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const statusConfig = {
    idle: {
      label: 'Idle',
      dotClass: 'border border-slate-500 bg-transparent h-1.5 w-1.5 rounded-full',
      pillClass: 'border border-white/10 bg-white/5 text-slate-400'
    },
    running: {
      label: 'Running',
      dotClass: 'bg-blue-400 animate-pulse h-1.5 w-1.5 rounded-full',
      pillClass: 'border border-blue-500/25 bg-blue-500/10 text-blue-300'
    },
    live: {
      label: 'Running',
      dotClass: 'bg-blue-400 animate-pulse h-1.5 w-1.5 rounded-full',
      pillClass: 'border border-blue-500/25 bg-blue-500/10 text-blue-300'
    },
    complete: {
      label: 'Complete',
      dotClass: 'bg-emerald-400 h-1.5 w-1.5 rounded-full',
      pillClass: 'border border-emerald-500/25 bg-emerald-500/10 text-emerald-300'
    },
    reconnecting: {
      label: 'Reconnecting',
      dotClass: 'bg-amber-400 animate-pulse h-1.5 w-1.5 rounded-full',
      pillClass: 'border border-amber-500/25 bg-amber-500/10 text-amber-300'
    },
    offline: {
      label: 'Offline',
      dotClass: 'bg-red-400 h-1.5 w-1.5 rounded-full',
      pillClass: 'border border-red-500/25 bg-red-500/10 text-red-300'
    }
  };

  const status = statusConfig[connectionLabel] || statusConfig.idle;

  return (
    <nav className="bg-[#0B0E14] border-b border-white/5 w-full z-40 flex justify-between items-center px-6 h-14 shrink-0">
      <div className="flex items-center gap-3">
        <div className="text-xl font-black tracking-tighter text-slate-100 flex items-center gap-sm">
          <NavbarLogo className="h-8 w-8 shrink-0" gradientId="topnav-logo-gradient" />
          <span className="ml-2 mr-3">
            <span className="text-white font-bold">AgentDev</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 font-bold">AI</span>
          </span>
        </div>
        <div className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium transition-all duration-300 ${status.pillClass}`}>
          <span className={status.dotClass} />
          <span>{status.label}</span>
        </div>
      </div>
      
      <div className="flex items-center relative" ref={dropdownRef}>
        <button 
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full border border-white/10 text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-all focus:outline-none"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-[10px] font-bold font-mono">
            {user?.username?.slice(0, 2).toUpperCase() || 'US'}
          </div>
          <span className="text-xs font-medium max-w-[80px] truncate">{user?.username || 'User'}</span>
          <span className="material-symbols-outlined text-[14px]">expand_more</span>
        </button>
        
        {showDropdown && (
          <div className="absolute right-0 top-10 w-48 bg-[#161b22] border border-white/10 rounded-lg shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
            <div className="px-4 py-2 border-b border-white/5">
              <p className="text-[10px] text-slate-400 font-mono">Logged in as</p>
              <p className="text-sm font-semibold text-slate-100 truncate">{user?.username}</p>
            </div>
            <button
              onClick={() => {
                setShowDropdown(false);
                logout();
              }}
              className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2 font-medium"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopNav;

