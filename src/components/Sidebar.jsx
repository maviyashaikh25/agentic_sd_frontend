import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navItems = [
    { icon: 'forum', label: 'Chat', path: '/chat' },
    { icon: 'dashboard_customize', label: 'Board', path: '/board' },
    { icon: 'analytics', label: 'Activity', path: '/activity' },
    { icon: 'library_books', label: 'Knowledge Base', path: '/knowledge' },
    { icon: 'bug_report', label: 'Debug', path: '/debug' },
    { icon: 'settings', label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="bg-[#161B22] w-64 border-r border-white/5 flex flex-col pt-sm z-30 shrink-0">
      <div className="px-6 py-4 border-b border-white/5 mb-sm">
        <div className="flex items-center gap-md">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg shadow-blue-500/20 relative group">
            <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
              <path d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2z" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"></path>
              <circle cx="12" cy="12" fill="currentColor" r="1.5"></circle>
              <circle cx="8" cy="9" fill="currentColor" r="1"></circle>
              <circle cx="16" cy="9" fill="currentColor" r="1"></circle>
              <circle cx="8" cy="15" fill="currentColor" r="1"></circle>
              <circle cx="16" cy="15" fill="currentColor" r="1"></circle>
              <line stroke="currentColor" strokeWidth="0.5" x1="12" x2="8" y1="12" y2="9"></line>
              <line stroke="currentColor" strokeWidth="0.5" x1="12" x2="16" y1="12" y2="9"></line>
              <line stroke="currentColor" strokeWidth="0.5" x1="12" x2="8" y1="12" y2="15"></line>
              <line stroke="currentColor" strokeWidth="0.5" x1="12" x2="16" y1="12" y2="15"></line>
            </svg>
          </div>
          <div>
            <h2 className="font-heading-md text-on-surface font-semibold text-[15px]">Project Alpha</h2>
            <p className="font-mono-label text-slate-400 mt-xs text-[10px]">v2.4.0-stable</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto font-['Inter'] text-[13px] font-medium py-sm">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-md px-6 py-3 transition-all duration-200 active:translate-x-1 scale-[0.98] ${
                isActive
                  ? 'bg-blue-500/10 text-blue-400 border-l-[3px] border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.1)]'
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
              }`
            }
          >
            <span className={`material-symbols-outlined text-[18px] ${item.label === 'Knowledge Base' ? 'icon-fill' : ''}`}>
              {item.icon}
            </span>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-6 border-t border-white/5">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-button-text py-2 rounded transition-colors flex items-center justify-center gap-sm">
          <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
          Deploy Stack
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

