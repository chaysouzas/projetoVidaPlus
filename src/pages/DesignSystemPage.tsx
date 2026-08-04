import { useState } from 'react'
import { Search, Check, AlertCircle, Info, AlertTriangle, Loader2, X, ChevronDown, Calendar } from 'lucide-react'
import Badge from '../components/Badge'

const statuses = [
  'confirmed', 'scheduled', 'in-progress', 'completed', 'cancelled', 'pending', 'waiting',
] as const

export default function DesignSystemPage() {
  const [checks, setChecks] = useState({ a: false, b: true, c: false })
  const [radio, setRadio] = useState('presencial')
  const [toggle, setToggle] = useState({ a: true, b: false })
  const [inputFocus, setInputFocus] = useState(false)
  const [searchFocus, setSearchFocus] = useState(false)

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: 36 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14, paddingBottom: 8, borderBottom: '1px solid #e5e7eb' }}>
        {title}
      </div>
      {children}
    </div>
  )

  const Row = ({ children }: { children: React.ReactNode }) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10 }}>{children}</div>
  )

  const btnBase = {
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: 6,
    padding: '8px 16px',
    borderRadius: 5,
    fontSize: 13,
    fontWeight: 500 as const,
    cursor: 'pointer',
    border: 'none',
    lineHeight: '1',
  }

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, color: '#1E2330', letterSpacing: '-0.01em', marginBottom: 4 }}>
          Design System — Vida Plus
        </h1>
        <p style={{ fontSize: 13, color: '#6B7280' }}>
          Componentes reutilizáveis do sistema. Inter · #1D4ED8 · #F6F7FB
        </p>
      </div>

      <Section title="Buttons">
        <Row>
          <button style={{ ...btnBase, background: '#1D4ED8', color: '#fff' }}>Primary</button>
          <button style={{ ...btnBase, background: '#fff', color: '#374151', border: '1px solid #D9DCE3' }}>Secondary</button>
          <button style={{ ...btnBase, background: 'none', color: '#1D4ED8', border: 'none', padding: '8px 0' }}>Tertiary</button>
          <button style={{ ...btnBase, background: '#DC2626', color: '#fff' }}>Destructive</button>
          <button style={{ ...btnBase, background: '#1D4ED8', color: '#fff', borderRadius: 5, padding: '8px' }}><Search size={15} /></button>
          <button style={{ ...btnBase, background: '#93c5fd', color: '#fff' }}>
            <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} /> Carregando
          </button>
          <button style={{ ...btnBase, background: '#e5e7eb', color: '#9CA3AF', cursor: 'not-allowed' }} disabled>Desabilitado</button>
        </Row>
      </Section>

      <Section title="Inputs">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 500, color: '#9CA3AF', marginBottom: 5 }}>Default</label>
            <input
              placeholder="Texto de exemplo"
              style={{ width: '100%', padding: '8px 10px', border: '1px solid #D9DCE3', borderRadius: 5, fontSize: 13, color: '#1E2330', outline: 'none', fontFamily: 'inherit' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 500, color: '#9CA3AF', marginBottom: 5 }}>Focus</label>
            <input
              placeholder="Campo ativo"
              onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = '#1D4ED8'; (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(29,78,216,0.08)' }}
              onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = '#D9DCE3'; (e.target as HTMLInputElement).style.boxShadow = 'none' }}
              style={{ width: '100%', padding: '8px 10px', border: '1px solid #1D4ED8', borderRadius: 5, fontSize: 13, outline: 'none', fontFamily: 'inherit', boxShadow: '0 0 0 3px rgba(29,78,216,0.08)' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 500, color: '#9CA3AF', marginBottom: 5 }}>Error</label>
            <input
              defaultValue="dado incorreto"
              style={{ width: '100%', padding: '8px 10px', border: '1px solid #DC2626', borderRadius: 5, fontSize: 13, color: '#1E2330', outline: 'none', fontFamily: 'inherit', boxShadow: '0 0 0 3px rgba(220,38,38,0.08)' }}
            />
            <p style={{ fontSize: 11, color: '#DC2626', marginTop: 3 }}>Campo obrigatório.</p>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 500, color: '#9CA3AF', marginBottom: 5 }}>Disabled</label>
            <input
              defaultValue="Valor fixo"
              disabled
              style={{ width: '100%', padding: '8px 10px', border: '1px solid #e5e7eb', borderRadius: 5, fontSize: 13, color: '#9CA3AF', background: '#f9fafb', outline: 'none', fontFamily: 'inherit', cursor: 'not-allowed' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 500, color: '#9CA3AF', marginBottom: 5 }}>Search</label>
            <div style={{ position: 'relative' }}>
              <Search size={13} color="#9CA3AF" style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                placeholder="Buscar..."
                style={{ width: '100%', padding: '8px 10px 8px 28px', border: '1px solid #D9DCE3', borderRadius: 5, fontSize: 13, color: '#1E2330', outline: 'none', fontFamily: 'inherit' }}
              />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 500, color: '#9CA3AF', marginBottom: 5 }}>Date Picker</label>
            <div style={{ position: 'relative' }}>
              <input
                type="date"
                style={{ width: '100%', padding: '8px 10px', border: '1px solid #D9DCE3', borderRadius: 5, fontSize: 13, color: '#1E2330', outline: 'none', fontFamily: 'inherit' }}
              />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 500, color: '#9CA3AF', marginBottom: 5 }}>Select</label>
            <div style={{ position: 'relative' }}>
              <select style={{ width: '100%', padding: '8px 30px 8px 10px', border: '1px solid #D9DCE3', borderRadius: 5, fontSize: 13, color: '#1E2330', outline: 'none', fontFamily: 'inherit', appearance: 'none', background: '#fff' }}>
                <option>Cardiologia</option>
                <option>Dermatologia</option>
                <option>Ortopedia</option>
              </select>
              <ChevronDown size={13} color="#9CA3AF" style={{ position: 'absolute', right: 9, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 500, color: '#9CA3AF', marginBottom: 5 }}>Time Picker</label>
            <input
              type="time"
              defaultValue="14:30"
              style={{ width: '100%', padding: '8px 10px', border: '1px solid #D9DCE3', borderRadius: 5, fontSize: 13, color: '#1E2330', outline: 'none', fontFamily: 'inherit' }}
            />
          </div>
        </div>
      </Section>

      <Section title="Form elements">
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 8 }}>Checkbox</div>
            {[{ k: 'a', label: 'Presencial' }, { k: 'b', label: 'Teleconsulta' }, { k: 'c', label: 'Urgência' }].map((item) => (
              <label key={item.k} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 7, cursor: 'pointer', fontSize: 13, color: '#374151' }}>
                <div
                  onClick={() => setChecks((prev) => ({ ...prev, [item.k]: !prev[item.k as keyof typeof prev] }))}
                  style={{
                    width: 15,
                    height: 15,
                    border: `1px solid ${checks[item.k as keyof typeof checks] ? '#1D4ED8' : '#D9DCE3'}`,
                    borderRadius: 3,
                    background: checks[item.k as keyof typeof checks] ? '#1D4ED8' : '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                >
                  {checks[item.k as keyof typeof checks] && <Check size={10} color="#fff" />}
                </div>
                {item.label}
              </label>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 8 }}>Radio</div>
            {['Presencial', 'Teleconsulta'].map((opt) => (
              <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 7, cursor: 'pointer', fontSize: 13, color: '#374151' }}>
                <div
                  onClick={() => setRadio(opt.toLowerCase())}
                  style={{
                    width: 15,
                    height: 15,
                    border: `1px solid ${radio === opt.toLowerCase() ? '#1D4ED8' : '#D9DCE3'}`,
                    borderRadius: '50%',
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                >
                  {radio === opt.toLowerCase() && <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#1D4ED8' }} />}
                </div>
                {opt}
              </label>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 8 }}>Toggle</div>
            {[{ k: 'a', label: 'Notificações' }, { k: 'b', label: 'Telemedicina' }].map((item) => (
              <label key={item.k} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9, cursor: 'pointer', fontSize: 13, color: '#374151' }}>
                <div
                  onClick={() => setToggle((prev) => ({ ...prev, [item.k]: !prev[item.k as keyof typeof prev] }))}
                  style={{
                    width: 32,
                    height: 18,
                    background: toggle[item.k as keyof typeof toggle] ? '#1D4ED8' : '#D9DCE3',
                    borderRadius: 9,
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    flexShrink: 0,
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    width: 12,
                    height: 12,
                    background: '#fff',
                    borderRadius: '50%',
                    top: 3,
                    left: toggle[item.k as keyof typeof toggle] ? 17 : 3,
                    transition: 'left 0.2s',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  }} />
                </div>
                {item.label}
              </label>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Status Badges">
        <Row>
          {statuses.map((s) => <Badge key={s} status={s} size="md" />)}
        </Row>
      </Section>

      <Section title="Feedback">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { type: 'success', icon: <Check size={14} />, title: 'Consulta confirmada.', msg: 'Sua consulta foi agendada com sucesso.', bg: '#f0fdf4', border: '#bbf7d0', titleColor: '#15803d', color: '#166534' },
            { type: 'error', icon: <AlertCircle size={14} />, title: 'Não foi possível concluir o agendamento.', msg: 'Tente novamente ou entre em contato com a unidade.', bg: '#FDECEC', border: '#fca5a5', titleColor: '#b91c1c', color: '#dc2626' },
            { type: 'warning', icon: <AlertTriangle size={14} />, title: 'Atenção.', msg: 'Você tem uma consulta amanhã às 14:30. Confirme sua presença.', bg: '#fffbeb', border: '#fde68a', titleColor: '#92400e', color: '#b45309' },
            { type: 'info', icon: <Info size={14} />, title: 'Informação.', msg: 'Seu resultado de exame está disponível para visualização.', bg: '#e0f2fe', border: '#bae6fd', titleColor: '#075985', color: '#0369a1' },
          ].map((item) => (
            <div key={item.type} style={{ display: 'flex', gap: 10, padding: '10px 14px', background: item.bg, border: `1px solid ${item.border}`, borderRadius: 5 }}>
              <div style={{ color: item.titleColor, flexShrink: 0, marginTop: 1 }}>{item.icon}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: item.titleColor }}>{item.title}</div>
                <div style={{ fontSize: 12, color: item.color, marginTop: 1 }}>{item.msg}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="States">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ border: '1px solid #D9DCE3', borderRadius: 5, padding: '24px 16px', textAlign: 'center', background: '#fff' }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#9CA3AF', marginBottom: 4 }}>Estado vazio</div>
            <p style={{ fontSize: 12, color: '#9CA3AF' }}>Nenhuma consulta agendada.<br />Agende uma consulta para começar.</p>
            <button style={{ marginTop: 12, padding: '7px 14px', background: '#1D4ED8', color: '#fff', border: 'none', borderRadius: 5, fontSize: 12, cursor: 'pointer' }}>
              Agendar consulta
            </button>
          </div>
          <div style={{ border: '1px solid #D9DCE3', borderRadius: 5, padding: '24px 16px', textAlign: 'center', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Loader2 size={24} color="#1D4ED8" style={{ animation: 'spin 1s linear infinite' }} />
            <span style={{ fontSize: 13, color: '#6B7280' }}>Carregando consultas...</span>
          </div>
        </div>
      </Section>

      <Section title="Typography">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#1E2330', letterSpacing: '-0.02em' }}>Título de página — 24px / 700</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#1E2330', letterSpacing: '-0.01em' }}>Título de seção — 18px / 600</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1E2330' }}>Subtítulo — 15px / 600</div>
          <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.6 }}>Corpo de texto — 13px / 400. Você tem uma consulta amanhã às 14:30. Confirme sua presença na unidade.</div>
          <div style={{ fontSize: 12, fontWeight: 500, color: '#6B7280' }}>Label — 12px / 500 · Especialidade · Cardiologia</div>
          <div style={{ fontSize: 11, color: '#9CA3AF' }}>Texto auxiliar — 11px / 400 · Última atualização: 30/07/2026</div>
          <div style={{ fontSize: 11, color: '#DC2626' }}>Mensagem de erro — 11px / 400 · Campo obrigatório.</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#1E2330', fontVariantNumeric: 'tabular-nums' }}>1.247 <span style={{ fontSize: 13, fontWeight: 400, color: '#9CA3AF' }}>pacientes</span></div>
        </div>
      </Section>

      <Section title="Colors">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { name: 'Primary', hex: '#1D4ED8', dark: true },
            { name: 'Background', hex: '#F6F7FB', dark: false },
            { name: 'Surface', hex: '#FFFFFF', dark: false },
            { name: 'Border', hex: '#D9DCE3', dark: false },
            { name: 'Text', hex: '#1E2330', dark: true },
            { name: 'Muted', hex: '#6B7280', dark: true },
            { name: 'Error', hex: '#DC2626', dark: true },
            { name: 'Success', hex: '#16a34a', dark: true },
            { name: 'Warning', hex: '#d97706', dark: true },
            { name: 'Info', hex: '#0369a1', dark: true },
          ].map((c) => (
            <div key={c.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 56, height: 40, background: c.hex, borderRadius: 5, border: '1px solid #D9DCE3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 8, color: c.dark ? '#fff' : '#9CA3AF', fontFamily: 'monospace' }}>{c.hex}</span>
              </div>
              <span style={{ fontSize: 10, color: '#9CA3AF' }}>{c.name}</span>
            </div>
          ))}
        </div>
      </Section>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
