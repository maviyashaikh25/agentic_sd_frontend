import React from 'react';
import NavbarLogo from '../components/NavbarLogo';

const ProjectBoard = () => {
  return (
    <div className="bg-background text-on-surface font-body-base text-body-base h-screen overflow-hidden flex flex-col antialiased selection:bg-primary-container selection:text-on-primary-container">

      <nav className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-6 h-14 bg-[#0B0E14]/90 backdrop-blur-xl border-b border-white/10 font-['Inter'] text-sm tracking-wide text-blue-500 dark:text-blue-400 hidden md:flex">
        <div className="flex items-center gap-8">
          <div className="text-xl font-black tracking-tighter text-slate-100 flex items-center gap-2">
            <NavbarLogo className="h-8 w-8 shrink-0" gradientId="board-logo-gradient" />
          </div>
          <div className="flex items-center gap-6">
            <a className="text-blue-400 font-semibold border-b-2 border-blue-500 pb-1 opacity-80 scale-95 transition-all" href="#">Mainframe</a>
            <a className="text-slate-400 font-medium hover:text-blue-300 transition-colors duration-200" href="#">Repository</a>
            <a className="text-slate-400 font-medium hover:text-blue-300 transition-colors duration-200" href="#">Logs</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-slate-400 hover:text-blue-300 transition-colors duration-200"><span className="material-symbols-outlined">notifications</span></button>
          <button className="text-slate-400 hover:text-blue-300 transition-colors duration-200"><span className="material-symbols-outlined">account_tree</span></button>
          <button className="text-slate-400 hover:text-blue-300 transition-colors duration-200"><span className="material-symbols-outlined">settings_suggest</span></button>
          <img alt="Lead Developer Avatar" className="w-8 h-8 rounded border border-outline-variant object-cover" data-alt="professional portrait of a young woman with dark hair against a neutral gray background with studio lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0U4u51HJXFgeEsDQDocHIHZU9P4-6KfGTE-U4Mqai3r99Dqi4UzvwF-nnqTSM5fjFKcLEe8Koxx1QkO9Bbvn20t5vGdTqFwPLqs1x75H-ymojPBBFTpVXwn8bSlLMt0HDvy3Q6FP5wCWf25sK7ar_aGfmRmnitClvB9Bsn-5GFN4lwxoN8M_dN-11VXObx7eP-a1TLzxIK2NtCMtAHc-MoNKT5y5qmO5Myh0lvaKaLHSNLMw6pQ7F9ZphzxtkpX52Wh8Mfm8j5Lo7" />
        </div>
      </nav>
      <div className="flex h-full w-full pt-14">
        <main className="flex-1 flex flex-col h-full bg-surface-container-lowest overflow-hidden">
          <header className="px-lg py-md border-b border-surface-variant flex items-center justify-between shrink-0 bg-surface-container-low/50">
            <div className="flex items-center gap-sm">
              <span className="text-on-surface-variant font-mono-label text-mono-label">Mainframe</span>
              <span className="text-outline-variant">/</span>
              <h1 className="font-heading-md text-heading-md text-on-surface">Active Sprint Board</h1>
            </div>
            <div className="flex items-center gap-md">
              <div className="relative flex items-center border border-outline-variant rounded bg-surface-container-low px-sm py-unit">
                <span className="material-symbols-outlined text-outline text-[18px] mr-sm">search</span>
                <input className="bg-transparent border-none text-body-sm font-body-sm text-on-surface focus:outline-none focus:ring-0 p-0 w-48 placeholder-outline" placeholder="Search tasks..." type="text" />
              </div>
              <button className="bg-primary text-on-primary font-button-text text-button-text px-md py-sm rounded border border-primary-container/50 hover:bg-primary-container transition-colors shadow-[0_1px_0_rgba(255,255,255,0.2)_inset]">
                New Issue
              </button>
            </div>
          </header>
          <div className="flex-1 overflow-auto p-lg bg-background">
            <div className="max-w-[1440px] mx-auto grid grid-cols-[160px_1fr_1fr_1fr] gap-md h-full min-w-[1000px]">
              <div className="col-start-2 text-on-surface-variant font-mono-label text-mono-label tracking-widest uppercase flex items-center gap-unit pb-sm border-b border-surface-variant">
                <span className="w-2 h-2 rounded-full bg-surface-variant"></span> Todo
              </div>
              <div className="col-start-3 text-on-surface-variant font-mono-label text-mono-label tracking-widest uppercase flex items-center gap-unit pb-sm border-b border-surface-variant">
                <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(173,198,255,0.5)]"></span> In Progress
              </div>
              <div className="col-start-4 text-on-surface-variant font-mono-label text-mono-label tracking-widest uppercase flex items-center gap-unit pb-sm border-b border-surface-variant">
                <span className="w-2 h-2 rounded-full bg-secondary"></span> Done
              </div>
              <div className="border-t border-surface-variant pt-lg flex flex-col gap-unit">
                <h2 className="font-heading-md text-heading-md text-on-surface flex items-center gap-sm">
                  <span className="material-symbols-outlined text-primary text-[20px]">web</span>
                  Frontend Tasks
                </h2>
                <span className="font-body-sm text-body-sm text-outline">UI &amp; Component Dev</span>
              </div>
              <div className="border-t border-surface-variant pt-lg flex flex-col gap-sm">
                <div className="bg-surface-container border border-outline-variant rounded p-md flex flex-col gap-md hover:border-outline transition-colors group">
                  <div className="flex justify-between items-start">
                    <span className="font-mono-label text-mono-label text-primary bg-primary/10 px-unit py-[2px] rounded">FE-142</span>
                    <span className="material-symbols-outlined text-outline text-[16px] group-hover:text-on-surface transition-colors">more_horiz</span>
                  </div>
                  <h3 className="font-body-sm text-body-sm text-on-surface leading-snug">Implement responsive container queries for agent widget</h3>
                  <div className="flex items-center justify-between mt-auto pt-sm">
                    <div className="flex items-center gap-unit text-outline text-mono-label font-mono-label">
                      <span className="material-symbols-outlined text-[14px]">calendar_today</span> Oct 12
                    </div>
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded bg-surface-variant border border-outline-variant flex items-center justify-center relative group/agent" title="Assigned to UI-Agent-1">
                        <span className="material-symbols-outlined text-[14px] text-primary">smart_toy</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t border-surface-variant pt-lg flex flex-col gap-sm">
                <div className="bg-surface-container border border-primary/30 rounded p-md flex flex-col gap-md shadow-[0_0_15px_rgba(77,142,255,0.05)]">
                  <div className="flex justify-between items-start">
                    <span className="font-mono-label text-mono-label text-primary bg-primary/10 px-unit py-[2px] rounded">FE-138</span>
                    <div className="flex items-center gap-unit">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(173,198,255,0.8)]"></span>
                    </div>
                  </div>
                  <h3 className="font-body-sm text-body-sm text-on-surface leading-snug">Integrate WebSocket feed into top navigation bar</h3>
                  <div className="flex items-center justify-between mt-auto pt-sm">
                    <div className="flex items-center gap-unit text-primary text-mono-label font-mono-label">
                      <span className="material-symbols-outlined text-[14px]">motion_photos_on</span> Active
                    </div>
                    <div className="w-6 h-6 rounded bg-surface-variant border border-primary/50 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[14px] text-primary">smart_toy</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t border-surface-variant pt-lg flex flex-col gap-sm opacity-60 hover:opacity-100 transition-opacity">
                <div className="bg-surface-container-low border border-surface-variant rounded p-md flex flex-col gap-md">
                  <div className="flex justify-between items-start">
                    <span className="font-mono-label text-mono-label text-outline line-through">FE-120</span>
                    <span className="material-symbols-outlined text-secondary text-[16px]">check_circle</span>
                  </div>
                  <h3 className="font-body-sm text-body-sm text-outline line-through leading-snug">Refactor shared components JSON parsing logic</h3>
                </div>
              </div>
              <div className="border-t border-surface-variant pt-lg mt-md flex flex-col gap-unit">
                <h2 className="font-heading-md text-heading-md text-on-surface flex items-center gap-sm">
                  <span className="material-symbols-outlined text-secondary text-[20px]">database</span>
                  Backend Tasks
                </h2>
                <span className="font-body-sm text-body-sm text-outline">API &amp; Data Layer</span>
              </div>
              <div className="border-t border-surface-variant pt-lg mt-md flex flex-col gap-sm">
                <div className="bg-surface-container border border-outline-variant rounded p-md flex flex-col gap-md hover:border-outline transition-colors">
                  <div className="flex justify-between items-start">
                    <span className="font-mono-label text-mono-label text-secondary bg-secondary/10 px-unit py-[2px] rounded">BE-092</span>
                  </div>
                  <h3 className="font-body-sm text-body-sm text-on-surface leading-snug">Optimize Redis cache invalidation for agent states</h3>
                  <div className="flex items-center justify-between mt-auto pt-sm">
                    <span className="text-[10px] uppercase font-mono-label tracking-widest text-tertiary border border-tertiary/30 px-unit rounded">High Priority</span>
                    <div className="w-6 h-6 rounded bg-surface-variant border border-outline-variant flex items-center justify-center">
                      <span className="material-symbols-outlined text-[14px] text-secondary">smart_toy</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t border-surface-variant pt-lg mt-md flex flex-col gap-sm">
                <div className="bg-surface-container-lowest border border-dashed border-outline-variant rounded p-md flex flex-col items-center justify-center gap-unit text-outline hover:text-on-surface hover:border-outline transition-colors cursor-pointer h-full min-h-[120px]">
                  <span className="material-symbols-outlined">add</span>
                  <span className="font-mono-label text-mono-label">Drop Task Here</span>
                </div>
              </div>
              <div className="border-t border-surface-variant pt-lg mt-md flex flex-col gap-sm opacity-60">
                <div className="bg-surface-container-low border border-surface-variant rounded p-md flex flex-col gap-md">
                  <div className="flex justify-between items-start">
                    <span className="font-mono-label text-mono-label text-outline line-through">BE-085</span>
                    <span className="material-symbols-outlined text-secondary text-[16px]">check_circle</span>
                  </div>
                  <h3 className="font-body-sm text-body-sm text-outline line-through leading-snug">Setup PostgreSQL read replicas for logging service</h3>
                </div>
              </div>
              <div className="border-t border-surface-variant pt-lg mt-md flex flex-col gap-unit">
                <h2 className="font-heading-md text-heading-md text-on-surface flex items-center gap-sm">
                  <span className="material-symbols-outlined text-error text-[20px]">bug_report</span>
                  QA Tasks
                </h2>
                <span className="font-body-sm text-body-sm text-outline">Testing &amp; Validation</span>
              </div>
              <div className="col-span-3 border-t border-surface-variant pt-lg mt-md flex items-center justify-center">
                <div className="text-center p-xl border border-dashed border-surface-variant rounded w-full flex flex-col items-center gap-md">
                  <span className="material-symbols-outlined text-[32px] text-surface-bright">task_alt</span>
                  <div className="font-heading-md text-heading-md text-outline">No Active QA Tasks</div>
                  <span className="font-body-sm text-body-sm text-outline-variant">All tests are currently passing or queued.</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

    </div>
  );
};

export default ProjectBoard;
