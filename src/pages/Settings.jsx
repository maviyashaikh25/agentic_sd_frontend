import React from 'react';

const Settings = () => {
  return (
    <div className="bg-background text-on-surface h-full overflow-y-auto font-body-base antialiased selection:bg-primary/20 selection:text-primary p-lg lg:p-xl">
      <div className="max-w-[1024px] mx-auto">
        {/*  Header section  */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-on-surface-variant font-mono-label text-mono-label mb-2">
            <span>Mainframe</span>
            <span className="text-outline">/</span>
            <span className="text-primary">Settings</span>
          </div>
          <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight">Configuration</h1>
          <p className="font-body-base text-body-base text-on-surface-variant mt-2 max-w-2xl">Manage system parameters, model orchestration, and operational thresholds for your active deployments.</p>
        </div>
        {/*  Bento Grid Layout for Settings  */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-md lg:gap-lg">
          {/*  LLM Provider Section (Spans 2 columns)  */}
          <div className="lg:col-span-2 bg-surface-container-low border border-outline-variant/30 rounded-xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center border border-outline-variant/50">
                <span className="material-symbols-outlined text-primary">psychology</span>
              </div>
              <div>
                <h2 className="font-heading-md text-heading-md text-on-surface">Language Model Engine</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Select the primary inference engine and tune generation parameters.</p>
              </div>
            </div>
            <div className="space-y-6">
              {/*  Dropdown  */}
              <div>
                <label className="block font-mono-label text-mono-label text-on-surface-variant mb-2">PROVIDER</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-surface border border-outline-variant rounded-lg px-4 py-3 font-body-base text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all cursor-pointer">
                    <option value="gpt-4o">OpenAI GPT-4o</option>
                    <option value="claude-3-5">Anthropic Claude 3.5 Sonnet</option>
                    <option value="gemini-1-5">Google Gemini 1.5 Pro</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px]">expand_more</span>
                  </div>
                </div>
              </div>
              {/*  Slider  */}
              <div className="pt-2">
                <div className="flex justify-between items-center mb-2">
                  <label className="font-mono-label text-mono-label text-on-surface-variant">TEMPERATURE</label>
                  <span className="font-mono-label text-mono-label text-primary bg-primary/10 px-2 py-0.5 rounded">0.7</span>
                </div>
                <input className="w-full appearance-none bg-transparent" max="2" min="0" step="0.1" type="range" defaultValue="0.7" />
                <div className="flex justify-between text-[11px] text-outline mt-2 font-mono">
                  <span>Precise</span>
                  <span>Balanced</span>
                  <span>Creative</span>
                </div>
              </div>
            </div>
          </div>
          {/*  Appearance Section (Spans 1 column)  */}
          <div className="bg-surface-container-low border border-outline-variant/30 rounded-xl p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center border border-outline-variant/50">
                <span className="material-symbols-outlined text-tertiary">palette</span>
              </div>
              <div>
                <h2 className="font-heading-md text-heading-md text-on-surface">Interface</h2>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center space-y-4">
              <label className="block font-mono-label text-mono-label text-on-surface-variant">THEME PREFERENCE</label>
              {/*  Custom Radio Toggle  */}
              <div className="flex p-1 bg-surface-container border border-outline-variant/30 rounded-lg">
                <label className="flex-1 text-center cursor-pointer relative">
                  <input className="peer sr-only" name="theme" type="radio" value="light" />
                  <div className="py-2 text-[13px] font-medium text-on-surface-variant peer-checked:text-on-primary peer-checked:bg-primary/20 rounded-md transition-all flex justify-center items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">light_mode</span>
                    Light
                  </div>
                </label>
                <label className="flex-1 text-center cursor-pointer relative">
                  <input defaultChecked className="peer sr-only" name="theme" type="radio" value="dark" />
                  <div className="py-2 text-[13px] font-medium text-on-surface-variant peer-checked:text-primary peer-checked:bg-primary/10 peer-checked:shadow-[0_0_8px_rgba(173,198,255,0.1)] rounded-md transition-all flex justify-center items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">dark_mode</span>
                    Dark
                  </div>
                </label>
              </div>
              <p className="text-[12px] text-on-surface-variant/70 leading-relaxed mt-2">Dark mode is enforced as the default operational environment for optimal contrast during extended sessions.</p>
            </div>
          </div>
          {/*  Capabilities Section (Spans full width below)  */}
          <div className="lg:col-span-3 bg-surface-container-low border border-outline-variant/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6 border-b border-outline-variant/20 pb-4">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center border border-outline-variant/50">
                <span className="material-symbols-outlined text-secondary">cable</span>
              </div>
              <div>
                <h2 className="font-heading-md text-heading-md text-on-surface">System Architecture</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Manage auxiliary services and live data pipelines.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/*  RAG Toggle  */}
              <div className="flex items-start justify-between p-4 rounded-lg bg-surface border border-outline-variant/20 hover:border-outline-variant/50 transition-colors">
                <div className="pr-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant">database</span>
                    <h3 className="font-body-base font-semibold text-on-surface">Retrieval-Augmented Generation (RAG)</h3>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant/80">Embed external knowledge bases into the context window for ground-truth verified responses.</p>
                </div>
                {/*  Switch  */}
                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 mt-1">
                  <input defaultChecked className="sr-only peer" type="checkbox" />
                  <div className="w-11 h-6 bg-surface-variant rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-[0_0_8px_rgba(173,198,255,0.1)]"></div>
                </label>
              </div>
              {/*  WebSocket Toggle  */}
              <div className="flex items-start justify-between p-4 rounded-lg bg-surface border border-outline-variant/20 hover:border-outline-variant/50 transition-colors">
                <div className="pr-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant">sync_alt</span>
                    <h3 className="font-body-base font-semibold text-on-surface">WebSocket Live Updates</h3>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant/80">Maintain a persistent duplex connection for real-time log streaming and agent state synchronization.</p>
                </div>
                {/*  Switch  */}
                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 mt-1">
                  <input defaultChecked className="sr-only peer" type="checkbox" />
                  <div className="w-11 h-6 bg-surface-variant rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-[0_0_8px_rgba(173,198,255,0.1)]"></div>
                </label>
              </div>
            </div>
          </div>
          {/*  Action Footer  */}
          <div className="lg:col-span-3 flex justify-end gap-3 mt-4">
            <button className="px-5 py-2.5 rounded-lg border border-outline-variant/50 text-on-surface font-button-text text-button-text hover:bg-surface-variant transition-colors">Discard Changes</button>
            <button className="px-5 py-2.5 rounded-lg bg-primary text-on-primary font-button-text text-button-text hover:bg-primary/90 shadow-[0_0_12px_rgba(173,198,255,0.2)] transition-all">Save Configuration</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
