import React, { useState } from 'react'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  ExternalLink,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Info,
  Check,
} from 'lucide-react'

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Validation & status states
  const [touchedEmail, setTouchedEmail] = useState(false)
  const [touchedPassword, setTouchedPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [infoModal, setInfoModal] = useState<string | null>(null)

  // Real-time email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const isEmailValid = emailRegex.test(email.trim())
  const emailError =
    touchedEmail && !email.trim()
      ? 'O e-mail institucional é obrigatório.'
      : touchedEmail && !isEmailValid
        ? 'Insira um e-mail válido (ex: seu.email@instituicao.org.br).'
        : null

  // Real-time password validation
  const isPasswordValid = password.length >= 6
  const passwordError =
    touchedPassword && !password
      ? 'A senha é obrigatória.'
      : touchedPassword && !isPasswordValid
        ? 'A senha deve ter no mínimo 6 caracteres.'
        : null

  const isFormValid = isEmailValid && isPasswordValid

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouchedEmail(true)
    setTouchedPassword(true)
    setSubmitError(null)
    setSubmitSuccess(null)

    if (!isEmailValid || !isPasswordValid) {
      setSubmitError('Por favor, corrija os campos destacados antes de prosseguir.')
      return
    }

    setIsSubmitting(true)

    // Simulate login attempt then inform user about agent access integration
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(
        `Credenciais validadas com sucesso para ${email.trim()}. O módulo de inteligência e agente de análise HLA está em fase de conexão institucional.`,
      )
    }, 1200)
  }

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault()
    setInfoModal(
      'Para redefinição de acesso ao sistema do Laboratório de HLA, entre em contato com o suporte de TI do CEPH/RECE pelo e-mail administracao@cpdhrce.com ou ramal (85) 2010-0028.',
    )
  }

  return (
    <div className="w-full max-w-[420px] mx-auto flex flex-col justify-between h-full py-4 sm:py-6">
      {/* Top spacing */}
      <div />

      {/* Main Card/Container */}
      <div className="flex flex-col">
        {/* Form Header */}
        <header className="mb-8 animate-ceph-in" style={{ animationDelay: '100ms' }}>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#1BA6A6]/10 text-[#158383] text-xs font-semibold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-[#1BA6A6]" />
            Ambiente Seguro
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B263B] tracking-tight">
            Acessar Sistema
          </h2>
          <p className="mt-2 text-sm text-[#4A5568] leading-relaxed">
            Sistema de Análise de Exames Laboratoriais —{' '}
            <span className="font-semibold text-[#158383]">Laboratório de HLA</span>
          </p>
        </header>

        {/* Global Error Banner */}
        {submitError && (
          <div
            role="alert"
            className="mb-6 p-4 rounded-xl bg-[#FFF5F5] border border-red-200 text-red-700 text-sm flex items-start gap-3 animate-fade-in"
          >
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">Atenção ao preencher</p>
              <p className="text-xs text-red-600 mt-0.5">{submitError}</p>
            </div>
          </div>
        )}

        {/* Global Success Simulation Banner */}
        {submitSuccess && (
          <div
            role="status"
            className="mb-6 p-4 rounded-xl bg-teal-50 border border-[#1BA6A6]/30 text-teal-900 text-sm flex items-start gap-3 animate-fade-in"
          >
            <CheckCircle2 className="w-5 h-5 text-[#1BA6A6] shrink-0 mt-0.5" />
            <div className="flex-1 text-xs sm:text-sm">
              <p className="font-bold text-[#0E7A7A]">Acesso validado</p>
              <p className="text-slate-700 mt-1 leading-relaxed">{submitSuccess}</p>
            </div>
          </div>
        )}

        {/* Modal/Info for forgot password */}
        {infoModal && (
          <div
            role="dialog"
            aria-modal="true"
            className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm flex items-start gap-3 animate-fade-in"
          >
            <Info className="w-5 h-5 text-[#1BA6A6] shrink-0 mt-0.5" />
            <div className="flex-1 text-xs sm:text-sm">
              <p className="font-bold text-[#1B263B]">Recuperação de Senha</p>
              <p className="text-slate-600 mt-1 leading-relaxed">{infoModal}</p>
              <button
                type="button"
                onClick={() => setInfoModal(null)}
                className="mt-2 text-xs font-semibold text-[#158383] hover:underline"
              >
                Fechar aviso
              </button>
            </div>
          </div>
        )}

        {/* Authentication Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Email Field */}
          <div className="animate-ceph-in" style={{ animationDelay: '200ms' }}>
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase tracking-wider text-[#1B263B] mb-2"
            >
              E-mail
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4 transition-colors group-focus-within:text-[#1BA6A6]" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="seu.email@instituicao.org.br"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (!touchedEmail) setTouchedEmail(true)
                }}
                onBlur={() => setTouchedEmail(true)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-white text-[#1B263B] placeholder-slate-400 border transition-all duration-200 focus:outline-none ${
                  emailError
                    ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50/20'
                    : 'border-[#E2E8F0] hover:border-slate-300 focus:border-[#1BA6A6] focus:ring-4 focus:ring-[#1BA6A6]/15'
                }`}
              />
            </div>
            {emailError && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5 animate-fade-in">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{emailError}</span>
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="animate-ceph-in" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-[#1B263B]"
              >
                Senha
              </label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (!touchedPassword) setTouchedPassword(true)
                }}
                onBlur={() => setTouchedPassword(true)}
                className={`w-full pl-10 pr-11 py-3 rounded-xl text-sm bg-white text-[#1B263B] placeholder-slate-400 border transition-all duration-200 focus:outline-none ${
                  passwordError
                    ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50/20'
                    : 'border-[#E2E8F0] hover:border-slate-300 focus:border-[#1BA6A6] focus:ring-4 focus:ring-[#1BA6A6]/15'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-[#1BA6A6] transition-colors focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 transition-transform active:scale-90" />
                ) : (
                  <Eye className="w-4 h-4 transition-transform active:scale-90" />
                )}
              </button>
            </div>
            {passwordError && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5 animate-fade-in">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{passwordError}</span>
              </p>
            )}
          </div>

          {/* Options: Remember me & Forgot password */}
          <div
            className="flex items-center justify-between text-xs pt-1 animate-ceph-in"
            style={{ animationDelay: '400ms' }}
          >
            <label className="flex items-center gap-2 cursor-pointer select-none text-[#4A5568] hover:text-[#1B263B] transition-colors">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="peer sr-only"
                />
                <div className="w-4 h-4 rounded border border-slate-300 peer-checked:bg-[#1BA6A6] peer-checked:border-[#1BA6A6] peer-focus:ring-2 peer-focus:ring-[#1BA6A6]/20 transition-all flex items-center justify-center bg-white">
                  {rememberMe && <Check className="w-3 h-3 text-white stroke-[3]" />}
                </div>
              </div>
              <span className="font-medium">Lembrar-me</span>
            </label>

            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-[#158383] hover:text-[#0E7A7A] font-semibold link-expand-underline transition-colors"
            >
              Esqueceu sua senha?
            </button>
          </div>

          {/* Main Submit Button */}
          <div className="pt-2 animate-ceph-in" style={{ animationDelay: '500ms' }}>
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-[#1BA6A6] hover:bg-[#158383] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2.5 shadow-[0_4px_14px_rgba(27,166,166,0.35)] hover:shadow-[0_6px_20px_rgba(27,166,166,0.45)] hover:-translate-y-0.5 disabled:opacity-75 disabled:pointer-events-none group"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Autenticando...</span>
                </>
              ) : (
                <>
                  <span>Entrar</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Security / Authorization Note */}
        <div
          className="mt-6 pt-5 border-t border-slate-200/80 flex items-center justify-center gap-2 text-xs text-[#4A5568] animate-ceph-in"
          style={{ animationDelay: '600ms' }}
        >
          <Shield className="w-4 h-4 text-[#1BA6A6] shrink-0" />
          <span>Acesso restrito a profissionais autorizados</span>
        </div>
      </div>

      {/* Form Footer / External Link */}
      <footer className="mt-8 text-center animate-ceph-in" style={{ animationDelay: '700ms' }}>
        <a
          href="https://cephrece.org.br/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-[#158383] hover:text-[#0D1B2A] font-medium link-expand-underline transition-colors group"
        >
          <span>Visite o site do CEPH/RECE</span>
          <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </footer>
    </div>
  )
}

export default LoginForm
