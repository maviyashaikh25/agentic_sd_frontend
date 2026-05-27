import { Link } from 'react-router-dom';
import NavbarLogo from '../components/NavbarLogo';

const LandingPage = () => {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-base overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
      
{/*  TopNavBar  */}
<nav className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-6 h-14 bg-[#0B0E14]/90 backdrop-blur-xl border-b border-white/10">
<div className="flex items-center gap-8">
<div className="text-xl font-black tracking-tighter text-slate-100 flex items-center gap-2"><div className="flex items-center gap-2"><NavbarLogo className="w-6 h-6" gradientId="landing-logo-gradient" /><span className="text-white">AgentDev</span><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">AI</span></div></div>
{/*  Navigation Links  */}
<div className="hidden md:flex items-center gap-6">
<a className="text-slate-400 font-medium font-['Inter'] text-sm tracking-wide hover:text-blue-300 transition-colors duration-200" href="#">Mainframe</a>
<a className="text-slate-400 font-medium font-['Inter'] text-sm tracking-wide hover:text-blue-300 transition-colors duration-200" href="#">Repository</a>
<a className="text-slate-400 font-medium font-['Inter'] text-sm tracking-wide hover:text-blue-300 transition-colors duration-200" href="#">Logs</a>
</div>
</div>
<div className="flex items-center gap-4">
{/*  Trailing Icons  */}
<div className="flex items-center gap-3">
<button className="text-slate-400 hover:text-blue-300 transition-colors duration-200">
<span className="material-symbols-outlined">notifications</span>
</button>
<button className="text-slate-400 hover:text-blue-300 transition-colors duration-200">
<span className="material-symbols-outlined">settings_suggest</span>
</button>
</div>
<div className="w-8 h-8 rounded-full overflow-hidden border border-white/10">
<img alt="Lead Developer Avatar" className="w-full h-full object-cover" data-alt="professional portrait of a software developer with subtle studio lighting and dark background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAX2bL6eRhoomi8o78rq2gZfP6Aoh_KbmntJtJfpem6C-cQCUDSkAmJHX4KuZ2PpwJHjJ8H1GpN1LKb_w_bN5R8lg8NeXHfVY6FgrHE0gfBPDaIMbH4enMIVNlEbEHyCADgWlYopzfQ2nFYvLTM7GmbaQMw08piO6LMsfk1aNONmJmvfWYYhCH1ntbv4ZiXyM-bdqsyp4n66KAv0fKF4ZaFpI08PNYaeppjoamMcepcRaWffwCKvoBR02m7B6RAgPHQULn5g3Hj4v0X"/>
</div>
</div>
</nav>
<main className="flex-grow pt-24 pb-20 px-6 sm:px-12 md:px-24 max-w-container-max mx-auto w-full relative z-10">
{/*  Hero Section  */}
<section className="flex flex-col items-center justify-center text-center py-20 relative">
{/*  Decorative Glow Background  */}
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-secondary-container/10 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
<div className="mb-8 flex justify-center">
<div className="flex flex-col items-center gap-4"><div className="relative w-32 h-32 flex items-center justify-center"><div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-2xl opacity-20"></div><svg className="w-32 h-32 relative z-10" fill="none" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient gradientUnits="userSpaceOnUse" id="hexagon-grad" x1="20" x2="100" y1="20" x2="100" y1="20" y2="100"><stop stopColor="#60A5FA"></stop><stop offset="1" stopColor="#A855F7"></stop></linearGradient></defs>{/*  Hexagon Shell  */}<path d="M60 15L98.9711 37.5V82.5L60 105L21.0289 82.5V37.5L60 15Z" fill="rgba(96, 165, 250, 0.05)" stroke="url(#hexagon-grad)" strokeWidth="2"></path>{/*  Neural Network Nodes  */}<circle cx="60" cy="35" fill="#60A5FA" r="3"></circle><circle cx="40" cy="50" fill="#60A5FA" r="3"></circle><circle cx="80" cy="50" fill="#A855F7" r="3"></circle><circle cx="40" cy="70" fill="#60A5FA" r="3"></circle><circle cx="80" cy="70" fill="#A855F7" r="3"></circle><circle cx="60" cy="85" fill="#A855F7" r="3"></circle>{/*  Connections  */}<line stroke="#60A5FA" strokeOpacity="0.4" strokeWidth="1" x1="60" x2="40" y1="35" y2="50"></line><line stroke="#A855F7" strokeOpacity="0.4" strokeWidth="1" x1="60" x2="80" y1="35" y2="50"></line><line stroke="white" strokeOpacity="0.2" strokeWidth="1" x1="40" x2="80" y1="50" y2="50"></line><line stroke="#60A5FA" strokeOpacity="0.4" strokeWidth="1" x1="40" x2="40" y1="50" y2="70"></line><line stroke="#A855F7" strokeOpacity="0.4" strokeWidth="1" x1="80" x2="80" y1="50" y2="70"></line><line stroke="#60A5FA" strokeOpacity="0.4" strokeWidth="1" x1="40" x2="60" y1="70" y2="85"></line><line stroke="#A855F7" strokeOpacity="0.4" strokeWidth="1" x1="80" x2="60" y1="70" y2="85"></line><line stroke="white" strokeOpacity="0.2" strokeWidth="1" x1="40" x2="80" y1="70" y2="70"></line>{/*  Center Core  */}<circle className="animate-pulse" cx="60" cy="60" fill="url(#hexagon-grad)" r="8"></circle></svg></div></div>
</div>
<h1 className="font-display-lg text-display-lg text-on-background mb-6 max-w-4xl tracking-tight">Multi-Agent Software <br className="hidden sm:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Engineering Assistant</span></h1>
<p className="font-body-base text-body-base text-on-surface-variant max-w-2xl mb-10 text-lg">
                Deploy autonomous developer agents to build, refactor, and debug your entire stack. From architecture design to final deployment, orchestrate complex workflows with precision.
            </p>
<div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
<Link to="/chat" className="bg-primary-container text-on-primary-container font-button-text text-button-text px-6 py-3 rounded-DEFAULT hover:opacity-90 transition-opacity flex items-center gap-2 glow-effect">
<span className="material-symbols-outlined text-[18px]">terminal</span>
                    Start New Session
                </Link>
<Link to="/dashboard" className="bg-surface-container border border-outline-variant text-on-background font-button-text text-button-text px-6 py-3 rounded-DEFAULT hover:bg-surface-variant transition-colors flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]">dashboard</span>
                    Open Dashboard
                </Link>
</div>
</section>
{/*  Bento Grid Features  */}
<section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
{/*  Feature 1: Build Projects  */}
<div className="bg-surface-container p-6 rounded-xl card-border relative overflow-hidden group hover:border-primary/30 transition-colors">
<div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 pointer-events-none group-hover:bg-primary/10 transition-colors"></div>
<div className="w-12 h-12 rounded-lg bg-surface-variant border border-outline-variant flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-primary">construction</span>
</div>
<h3 className="font-heading-md text-heading-md text-on-background mb-3">Build Projects</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
                    Action Mode allows agents to generate complete project scaffolds, write implementation code, and configure CI/CD pipelines autonomously based on high-level specs.
                </p>
<div className="bg-[#0b0e15] border border-outline-variant/50 rounded-lg p-4 font-mono text-[11px] text-on-surface-variant/80">
<div className="flex items-center gap-2 mb-2 pb-2 border-b border-outline-variant/50">
<span className="w-2 h-2 rounded-full bg-error"></span>
<span className="w-2 h-2 rounded-full bg-tertiary"></span>
<span className="w-2 h-2 rounded-full bg-primary/50"></span>
<span className="ml-2 text-on-surface-variant/50">agent_build.log</span>
</div>
<code>&gt; Initiating Next.js scaffold...</code><br/>
<code>&gt; Generating API routes...</code><br/>
<code className="text-primary">&gt; Build successful. Time: 4.2s</code>
</div>
</div>
{/*  Feature 2: Ask Questions  */}
<div className="bg-surface-container p-6 rounded-xl card-border relative overflow-hidden group hover:border-secondary/30 transition-colors">
<div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-full -mr-8 -mt-8 pointer-events-none group-hover:bg-secondary/10 transition-colors"></div>
<div className="w-12 h-12 rounded-lg bg-surface-variant border border-outline-variant flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-secondary">forum</span>
</div>
<h3 className="font-heading-md text-heading-md text-on-background mb-3">Ask Questions</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
                    RAG Mode connects to your entire codebase, internal wikis, and remote repositories. Ask complex architectural questions and get context-aware, precise answers instantly.
                </p>
<div className="flex flex-col gap-2">
<div className="bg-[#0b0e15] border border-outline-variant/50 rounded-lg p-3 inline-flex items-start gap-3 w-[90%]">
<div className="w-6 h-6 rounded bg-surface-variant flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[14px]">person</span>
</div>
<p className="font-body-sm text-[12px] text-on-surface-variant leading-tight">How is auth handled in the v2 API?</p>
</div>
<div className="bg-primary/5 border border-primary/20 rounded-lg p-3 inline-flex items-start gap-3 w-[95%] self-end">
<div className="w-6 h-6 rounded bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[14px]">smart_toy</span>
</div>
<p className="font-body-sm text-[12px] text-on-surface leading-tight">The v2 API utilizes stateless JWTs validated via the Edge middleware...</p>
</div>
</div>
</div>
{/*  Feature 3: Debug Code  */}
<div className="bg-surface-container p-6 rounded-xl card-border relative overflow-hidden group hover:border-error/30 transition-colors">
<div className="absolute top-0 right-0 w-32 h-32 bg-error/5 rounded-bl-full -mr-8 -mt-8 pointer-events-none group-hover:bg-error/10 transition-colors"></div>
<div className="w-12 h-12 rounded-lg bg-surface-variant border border-outline-variant flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-error">bug_report</span>
</div>
<h3 className="font-heading-md text-heading-md text-on-background mb-3">Debug Code</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
                    Debug Mode actively monitors logs, analyzes stack traces, and proposes intelligent patches. It simulates execution to verify fixes before suggesting a PR.
                </p>
<div className="bg-[#0b0e15] border border-outline-variant/50 rounded-lg p-4 font-mono text-[11px] text-on-surface-variant/80">
<div className="flex items-center justify-between mb-2 pb-2 border-b border-outline-variant/50">
<span className="text-error font-medium">Exception Detected</span>
<span className="text-on-surface-variant/50">auth_service.ts:142</span>
</div>
<code className="text-error/80 line-through">const user = await db.query(id);</code><br/>
<code className="text-primary border-l-2 border-primary pl-2 ml-[-2px] mt-1 block bg-primary/5">{"const user = await db.query({ where: { id }});"}</code>
</div>
</div>
</section>
</main>

    </div>
  );
};

export default LandingPage;
