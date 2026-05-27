import React from 'react';

const DebugCenter = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-background">
      {/*  Breadcrumbs & Actions  */}
      <div className="px-6 py-4 flex justify-between items-center border-b border-surface-container-high shrink-0">
        <div className="flex items-center gap-2 font-mono-label text-mono-label text-on-surface-variant">
          <span>PROJECT ALPHA</span>
          <span>/</span>
          <span className="text-primary">DEBUG CENTER</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-3 py-1.5 rounded border border-outline-variant text-on-surface text-button-text font-button-text hover:bg-surface-container transition-colors">
            Clear Logs
          </button>
          <button className="px-3 py-1.5 rounded bg-primary-container text-on-primary-container text-button-text font-button-text flex items-center gap-2 hover:bg-primary-container/90 transition-colors border-t border-white/10 shadow-[0_1px_0_rgba(255,255,255,0.1)_inset]">
            <span className="material-symbols-outlined text-[16px]">play_arrow</span>
            Analyze Stack
          </button>
        </div>
      </div>
      {/*  Two Pane Layout  */}
      <div className="flex-1 flex overflow-hidden">
        {/*  Left Pane: Error Input  */}
        <div className="w-1/2 flex flex-col border-r border-surface-container-high bg-surface-container-lowest">
          <div className="px-4 py-3 border-b border-surface-container-high flex justify-between items-center bg-surface-container-low shrink-0">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-outline text-[18px]">terminal</span>
              <h3 className="font-heading-md text-body-sm font-semibold text-on-surface">Error Input</h3>
            </div>
            <select className="bg-surface-container border border-outline-variant rounded text-body-sm text-on-surface py-1 px-2 pr-8 focus:ring-primary-container/20">
              <option>Auto-detect</option>
              <option>Python Log</option>
              <option>Node.js Error</option>
              <option>Go Panic</option>
            </select>
          </div>
          <div className="flex-1 p-4 relative group">
            <textarea className="w-full h-full bg-surface border border-outline-variant rounded p-4 text-mono-label font-mono-label text-on-surface-variant focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container resize-none custom-scrollbar" placeholder="Paste error logs, stack traces, or broken code here..." spellCheck="false"></textarea>
            <button className="absolute bottom-6 right-6 p-2 rounded bg-surface-container border border-outline-variant text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors opacity-0 group-hover:opacity-100">
              <span className="material-symbols-outlined text-[18px]">content_paste</span>
            </button>
          </div>
        </div>
        {/*  Right Pane: AI Fixes  */}
        <div className="w-1/2 flex flex-col bg-surface-container-low relative">
          <div className="px-4 py-3 border-b border-surface-container-high flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">auto_awesome</span>
              <h3 className="font-heading-md text-body-sm font-semibold text-on-surface">AI Fix Analysis</h3>
            </div>
            <div className="flex items-center gap-1.5 text-mono-label font-mono-label text-outline">
              <span className="w-1.5 h-1.5 rounded-full bg-outline animate-pulse"></span>
              Waiting for input...
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
            {/*  Empty State (Simulated)  */}
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <div className="w-16 h-16 rounded-full border border-outline-variant flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[32px] text-outline">code_blocks</span>
              </div>
              <h4 className="font-heading-md text-heading-md text-on-surface mb-2">Ready to Analyze</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
                Paste your stack trace or broken code on the left. The Agent will identify the root cause and provide a syntax-highlighted fix.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugCenter;
