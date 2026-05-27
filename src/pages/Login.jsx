import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import NavbarLogo from '../components/NavbarLogo'

const Login = () => {
  const { login, register, isAuthenticated, authError, setAuthError } = useAuth()
  const [isRegistering, setIsRegistering] = useState(false)
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const [loading, setLoading] = useState(false)
  const [validationError, setValidationError] = useState('')
  
  const navigate = useNavigate()
  const location = useLocation()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/dashboard'
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, location])

  // Clear errors when switching tabs
  useEffect(() => {
    setAuthError('')
    setValidationError('')
  }, [isRegistering, setAuthError])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setValidationError('')
    setAuthError('')

    const trimmedUsername = username.trim()
    if (!trimmedUsername || trimmedUsername.length < 3) {
      setValidationError('Username must be at least 3 characters long')
      return
    }

    if (!password || password.length < 5) {
      setValidationError('Password must be at least 5 characters long')
      return
    }

    if (isRegistering && password !== confirmPassword) {
      setValidationError('Passwords do not match')
      return
    }

    try {
      setLoading(true)
      if (isRegistering) {
        await register(trimmedUsername, password)
      } else {
        await login(trimmedUsername, password)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-100 flex flex-col justify-center items-center relative overflow-hidden font-['Inter'] px-4 selection:bg-blue-500/35 selection:text-white">
      {/* Background Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-md z-10 transition-all duration-300">
        
        {/* Logo and Brand Header */}
        <div className="flex flex-col items-center mb-8 text-center animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center gap-3 mb-2">
            <NavbarLogo className="h-10 w-10 shrink-0" gradientId="login-logo-gradient" />
            <span className="text-2xl font-black tracking-tight text-white">
              AgentDev<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">AI</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono tracking-wider uppercase">
            Autonomous Multi-Agent Workspace
          </p>
        </div>

        {/* glassmorphic auth card */}
        <div className="bg-[#161B22]/70 border border-white/10 shadow-2xl backdrop-blur-md rounded-2xl overflow-hidden p-8 animate-in fade-in zoom-in-95 duration-300">
          
          {/* Card Tabs */}
          <div className="flex border-b border-white/5 mb-6">
            <button
              onClick={() => setIsRegistering(false)}
              className={`flex-1 pb-3 text-sm font-semibold transition-all duration-200 ${
                !isRegistering
                  ? 'text-blue-400 border-b-2 border-blue-500'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsRegistering(true)}
              className={`flex-1 pb-3 text-sm font-semibold transition-all duration-200 ${
                isRegistering
                  ? 'text-blue-400 border-b-2 border-blue-500'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Errors Panel */}
            {(validationError || authError) && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-300 rounded-lg text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
                <span className="material-symbols-outlined text-[16px] mt-0.5 select-none">error</span>
                <span>{validationError || authError}</span>
              </div>
            )}

            {/* Username Field */}
            <div>
              <label className="block text-[11px] font-mono font-semibold tracking-wider text-slate-400 uppercase mb-1.5">
                Username
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-slate-500 select-none">
                  person
                </span>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#0D1117] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-sans"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[11px] font-mono font-semibold tracking-wider text-slate-400 uppercase mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-slate-500 select-none">
                  lock
                </span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0D1117] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-sans"
                  required
                />
              </div>
            </div>

            {/* Confirm Password Field (Only when registering) */}
            {isRegistering && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                <label className="block text-[11px] font-mono font-semibold tracking-wider text-slate-400 uppercase mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-slate-500 select-none">
                    lock_reset
                  </span>
                  <input
                    type="password"
                    placeholder="Verify your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-[#0D1117] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-sans"
                    required={isRegistering}
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 mt-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-blue-500/50 disabled:to-indigo-600/50 text-white text-sm font-semibold rounded-lg shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
                  <span>Please wait...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">
                    {isRegistering ? 'person_add' : 'login'}
                  </span>
                  <span>{isRegistering ? 'Create Account' : 'Sign In'}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-slate-500 font-mono mt-6">
          Authorized personnel only. Logs are active.
        </p>

      </div>
    </div>
  )
}

export default Login
