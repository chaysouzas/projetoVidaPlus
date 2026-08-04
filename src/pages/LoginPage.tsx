import { useState } from 'react'
import { Eye, EyeOff, Shield, AlertCircle, Loader2 } from 'lucide-react'
import type { Role } from '../data/mock'
import { useMobile } from '../hooks/useMobile'
import Logo from '../components/Logo'

interface Props {
  onLogin: (role: Role) => void
}

export default function LoginPage({ onLogin }: Props) {
  const isMobile = useMobile()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

  const credentials: Record<string, { role: Role; pass: string }> = {
    'paciente@vidaplus.com': { role: 'patient', pass: '123456' },
    'medico@vidaplus.com': { role: 'professional', pass: '123456' },
    'admin@vidaplus.com': { role: 'admin', pass: '123456' },
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(false)
    setLoading(true)
    setTimeout(() => {
      const match = credentials[email.toLowerCase()]
      if (match && match.pass === password) {
        onLogin(match.role)
      } else {
        setError(true)
        setLoading(false)
      }
    }, 900)
  }

  const inputStyle = (focused: boolean, hasError: boolean) => ({
    width: '100%',
    padding: isMobile ? '13px 14px' : '9px 12px',
    fontSize: isMobile ? 16 : 13,
    color: '#1E2330',
    background: '#fff',
    border: `1px solid ${hasError ? '#DC2626' : focused ? '#1D4ED8' : '#D9DCE3'}`,
    borderRadius: 5,
    outline: 'none',
    transition: 'border-color 0.15s',
    fontFamily: 'Inter, system-ui, sans-serif',
    boxShadow: focused && !hasError ? '0 0 0 3px rgba(29,78,216,0.08)' : hasError ? '0 0 0 3px rgba(220,38,38,0.08)' : 'none',
  })

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#F6F7FB' }}>
      <div
        className="hidden lg:flex"
        style={{
          width: '45%',
          background: '#1D4ED8',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '48px 52px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundSize: '32px 32px',
            
          }}
        />

        <div style={{ position: 'relative' }}>
          <Logo size={34} textSize={20} onDark tagline="Sistema de Gestão de Saúde" />
        </div>

        <div style={{ position: 'relative' }}>
          <p style={{ fontSize: 28, fontWeight: 600, color: '#fff', lineHeight: 1.3, letterSpacing: '-0.02em', marginBottom: 16 }}>
            Gestão hospitalar integrada para pacientes, profissionais e administradores.
          </p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)',  lineHeight: 1.6, maxWidth: 380 }}>
            Prontuários eletrônicos, agendamento, telemedicina e gestão de leitos em uma plataforma unificada.
          </p>

          <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'Prontuário eletrônico unificado',
              'Telemedicina integrada',
              'Gestão de leitos em tempo real',
            ].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.5)' }} />
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Shield size={12} color="rgba(255,255,255,0.5)" />
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
              Dados protegidos · LGPD · Ambiente seguro
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '48px 24px 40px' : '40px 24px',
        }}
      >
        <div style={{ width: '100%', maxWidth: 380 }}>
          <div className="lg:hidden" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 36 }}>
            <Logo size={36} textSize={22} />
          </div>

          <div style={{ marginBottom: 28, textAlign: isMobile ? 'center' : 'left' }}>
            <h2 style={{ fontSize: isMobile ? 22 : 20, fontWeight: 600, color: '#1E2330', letterSpacing: '-0.02em', marginBottom: 4 }}>
              Acessar o sistema
            </h2>
            <p style={{ fontSize: 13, color: '#6B7280' }}>
              Use suas credenciais institucionais para entrar.
            </p>
          </div>

          {error && (
            <div
              style={{
                display: 'flex',
                gap: 10,
                padding: '10px 12px',
                background: '#FDECEC',
                border: '1px solid #fca5a5',
                borderRadius: 5,
                marginBottom: 16,
              }}
              role="alert"
            >
              <AlertCircle size={15} color="#DC2626" style={{ flexShrink: 0, marginTop: 1 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#b91c1c' }}>
                  Não foi possível entrar.
                </div>
                <div style={{ fontSize: 12, color: '#dc2626', marginTop: 1 }}>
                  Verifique seu e-mail e senha e tente novamente.
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#374151', marginBottom: 5 }}>
                E-mail institucional
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(false) }}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                placeholder="seu@vidaplus.com"
                style={inputStyle(emailFocused, error)}
                autoComplete="username"
                aria-invalid={error}
              />
              {error && (
                <p style={{ fontSize: 11, color: '#DC2626', marginTop: 4 }} role="alert">
                  Credenciais inválidas.
                </p>
              )}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#374151', marginBottom: 5 }}>
                Senha
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(false) }}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  placeholder="••••••••"
                  style={{
                    ...inputStyle(passwordFocused, error),
                    padding: undefined,
                    paddingTop: isMobile ? 13 : 9,
                    paddingBottom: isMobile ? 13 : 9,
                    paddingLeft: isMobile ? 14 : 12,
                    paddingRight: 40,
                  }}
                  autoComplete="current-password"
                  aria-invalid={error}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: 10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#9CA3AF',
                    display: 'flex',
                    padding: 2,
                  }}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                style={{ fontSize: 12, color: '#1D4ED8', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                Esqueci minha senha
              </button>
            </div>

            <button
              type="submit"
              disabled={loading || !email || !password}
              style={{
                width: '100%',
                padding: isMobile ? '14px 16px' : '10px 16px',
                background: loading || !email || !password ? '#93c5fd' : '#1D4ED8',
                color: '#fff',
                border: 'none',
                borderRadius: 5,
                fontSize: isMobile ? 15 : 13,
                fontWeight: 600,
                cursor: loading || !email || !password ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                transition: 'background 0.15s',
                marginTop: 2,
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
                  Verificando...
                </>
              ) : (
                'Entrar'
              )}
            </button>
          </form>

          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 5, textAlign: 'center' }}>
            <Shield size={11} color="#9CA3AF" />
            <span style={{ fontSize: 11, color: '#9CA3AF' }}>Ambiente seguro · Dados criptografados</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
