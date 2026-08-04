import { useState } from 'react'
import { Search, MoreHorizontal, UserPlus } from 'lucide-react'
import Badge from '../components/Badge'
import { useMobile } from '../hooks/useMobile'
import { doctors, beds } from '../data/mock'

interface Props {
  navigate: (page: string) => void
}

const adminMetrics = [
  { label: 'Pacientes', value: 1_247, delta: '+12 este mês', color: '#1D4ED8' },
  { label: 'Profissionais ativos', value: 38, delta: '5 especialidades', color: '#16a34a' },
  { label: 'Atendimentos hoje', value: 84, delta: '↑ 6% vs. ontem', color: '#0369a1' },
  { label: 'Internações ativas', value: 11, delta: '3 UTI', color: '#d97706' },
  { label: 'Leitos disponíveis', value: 9, delta: 'de 24 no total', color: '#6B7280' },
]

const bedStatusColors: Record<string, { bg: string; text: string; border: string; label: string }> = {
  available: { bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0', label: 'Disponível' },
  occupied: { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe', label: 'Ocupado' },
  maintenance: { bg: '#fffbeb', text: '#92400e', border: '#fde68a', label: 'Manutenção' },
  reserved: { bg: '#fdf4ff', text: '#7e22ce', border: '#e9d5ff', label: 'Reservado' },
}

export default function AdminDashboard({ navigate }: Props) {
  const isMobile = useMobile()
  const [doctorSearch, setDoctorSearch] = useState('')
  const [bedFilter, setBedFilter] = useState<string | null>(null)

  const filteredDoctors = doctors.filter((d) =>
    d.name.toLowerCase().includes(doctorSearch.toLowerCase()) ||
    d.specialty.toLowerCase().includes(doctorSearch.toLowerCase())
  )

  const filteredBeds = bedFilter ? beds.filter((b) => b.status === bedFilter) : beds
  const bedCounts = beds.reduce<Record<string, number>>((acc, b) => {
    acc[b.status] = (acc[b.status] || 0) + 1
    return acc
  }, {})
  const wards = [...new Set(beds.map((b) => b.ward))]

  return (
    <div style={{ maxWidth: isMobile ? '100%' : 1060, margin: '0 auto' }}>
      <div style={{ marginBottom: isMobile ? 16 : 24, textAlign: isMobile ? 'center' : 'left' }}>
        <h1 style={{ fontSize: isMobile ? 22 : 20, fontWeight: 700, color: '#1E2330', letterSpacing: '-0.02em', marginBottom: 4 }}>
          Painel administrativo
        </h1>
        <p style={{ fontSize: 13, color: '#6B7280' }}>30 de julho de 2026 · Vinícius Farias</p>
      </div>

      {isMobile ? (
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', marginBottom: 16, paddingBottom: 4, WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
          {adminMetrics.map((m) => (
            <div
              key={m.label}
              style={{ background: '#fff', border: '1px solid #D9DCE3', borderRadius: 8, padding: '12px 14px', flexShrink: 0, minWidth: 130 }}
            >
              <div style={{ fontSize: 10, color: '#9CA3AF', marginBottom: 6, lineHeight: 1.3 }}>{m.label}</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: '#1E2330', lineHeight: 1 }}>
                {m.value.toLocaleString('pt-BR')}
              </div>
              <div style={{ fontSize: 10, color: m.color, marginTop: 4, fontWeight: 500 }}>{m.delta}</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginBottom: 20 }}>
          {adminMetrics.map((m) => (
            <div key={m.label} style={{ background: '#fff', border: '1px solid #D9DCE3', borderRadius: 6, padding: '12px 14px' }}>
              <div style={{ fontSize: 10, color: '#9CA3AF', marginBottom: 6, lineHeight: 1.3 }}>{m.label}</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#1E2330', lineHeight: 1 }}>{m.value.toLocaleString('pt-BR')}</div>
              <div style={{ fontSize: 10, color: '#6B7280', marginTop: 4 }}>{m.delta}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{ background: '#fff', border: '1px solid #D9DCE3', borderRadius: 8, marginBottom: isMobile ? 12 : 16, overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #D9DCE3', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#1E2330' }}>Profissionais</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ position: 'relative' }}>
              <Search size={13} color="#9CA3AF" style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="search"
                value={doctorSearch}
                onChange={(e) => setDoctorSearch(e.target.value)}
                placeholder="Buscar..."
                style={{
                  width: isMobile ? 120 : 200,
                  padding: '7px 10px 7px 28px',
                  border: '1px solid #D9DCE3',
                  borderRadius: 6,
                  fontSize: 13,
                  color: '#1E2330',
                  background: '#fff',
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
            </div>
            <button
              onClick={() => navigate('register-professional')}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: isMobile ? '7px 10px' : '7px 12px', background: '#1D4ED8', color: '#fff', border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}
            >
              <UserPlus size={13} /> {!isMobile && 'Cadastrar'}
            </button>
          </div>
        </div>

        {isMobile ? (
          <div>
            {filteredDoctors.map((doc, i) => (
              <div
                key={doc.id}
                style={{ padding: '12px 16px', borderBottom: i < filteredDoctors.length - 1 ? '1px solid #F3F4F6' : 'none', display: 'flex', alignItems: 'center', gap: 12 }}
              >
                <div style={{ width: 38, height: 38, borderRadius: 10, background: doc.status === 'active' ? '#eff6ff' : '#f3f4f6', border: `1px solid ${doc.status === 'active' ? '#bfdbfe' : '#e5e7eb'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: doc.status === 'active' ? '#1D4ED8' : '#9CA3AF', flexShrink: 0 }}>
                  {doc.name.split(' ').filter((w) => /^[A-Z]/.test(w) && w.length > 2).slice(0, 2).map((w) => w[0]).join('')}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#1E2330', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.name}</div>
                    <Badge status={doc.status} />
                  </div>
                  <div style={{ fontSize: 12, color: '#6B7280' }}>{doc.specialty} · {doc.crm}</div>
                  <div style={{ fontSize: 11, color: '#9CA3AF' }}>{doc.unit} · {doc.lastAccess}</div>
                </div>
                <button style={{ display: 'flex', padding: 8, color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer' }}>
                  <MoreHorizontal size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1.2fr 0.8fr 1.2fr 44px', padding: '8px 16px', fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e5e7eb', gap: 8 }}>
              <div>Nome</div><div>Especialidade</div><div>Registro</div><div>Unidade</div><div>Status</div><div>Último acesso</div><div />
            </div>
            {filteredDoctors.map((doc, i) => (
              <div
                key={doc.id}
                style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1.2fr 0.8fr 1.2fr 44px', padding: '10px 16px', borderBottom: i < filteredDoctors.length - 1 ? '1px solid #F3F4F6' : 'none', alignItems: 'center', gap: 8, fontSize: 13 }}
              >
                <div style={{ fontWeight: 500, color: '#1E2330' }}>{doc.name}</div>
                <div style={{ color: '#374151' }}>{doc.specialty}</div>
                <div style={{ color: '#6B7280', fontSize: 12 }}>{doc.crm}</div>
                <div style={{ color: '#6B7280', fontSize: 12 }}>{doc.unit}</div>
                <div><Badge status={doc.status} /></div>
                <div style={{ color: '#9CA3AF', fontSize: 12 }}>{doc.lastAccess}</div>
                <div><button style={{ display: 'flex', padding: 5, color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer' }}><MoreHorizontal size={14} /></button></div>
              </div>
            ))}
          </div>
        )}
        {filteredDoctors.length === 0 && (
          <div style={{ padding: 20, textAlign: 'center', fontSize: 13, color: '#9CA3AF' }}>Nenhum profissional encontrado.</div>
        )}
      </div>

      <div style={{ background: '#fff', border: '1px solid #D9DCE3', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #D9DCE3' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#1E2330', marginBottom: 10 }}>Gestão de leitos</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <button
              onClick={() => setBedFilter(null)}
              style={{ padding: '5px 10px', borderRadius: 5, border: `1px solid ${bedFilter === null ? '#1D4ED8' : '#D9DCE3'}`, background: bedFilter === null ? '#eff6ff' : '#fff', color: bedFilter === null ? '#1D4ED8' : '#6B7280', fontSize: 11, fontWeight: bedFilter === null ? 600 : 400, cursor: 'pointer' }}
            >
              Todos ({beds.length})
            </button>
            {Object.entries(bedStatusColors).map(([status, cfg]) => (
              <button
                key={status}
                onClick={() => setBedFilter(bedFilter === status ? null : status)}
                style={{ padding: '5px 10px', borderRadius: 5, border: `1px solid ${bedFilter === status ? cfg.border : '#D9DCE3'}`, background: bedFilter === status ? cfg.bg : '#fff', color: bedFilter === status ? cfg.text : '#6B7280', fontSize: 11, fontWeight: bedFilter === status ? 600 : 400, cursor: 'pointer' }}
              >
                {cfg.label} ({bedCounts[status] ?? 0})
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding: '16px' }}>
          {wards.map((ward) => {
            const wardBeds = filteredBeds.filter((b) => b.ward === ward)
            if (wardBeds.length === 0) return null
            return (
              <div key={ward} style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
                  {ward}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(auto-fill, minmax(110px, 1fr))', gap: 8 }}>
                  {wardBeds.map((bed) => {
                    const cfg = bedStatusColors[bed.status]
                    return (
                      <div
                        key={bed.id}
                        style={{ padding: '10px', border: `1px solid ${bed.status === 'available' ? '#D9DCE3' : cfg.border}`, borderRadius: 7, background: bed.status === 'available' ? '#fff' : cfg.bg }}
                      >
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#1E2330', marginBottom: 4 }}>
                          {bed.number}
                        </div>
                        <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 500, padding: '1px 6px', background: cfg.bg, color: cfg.text, borderRadius: 3, border: `1px solid ${cfg.border}` }}>
                          {cfg.label}
                        </span>
                        {bed.patientName && (
                          <div style={{ fontSize: 10, color: '#374151', marginTop: 5, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {bed.patientName.split(' ')[0]}
                          </div>
                        )}
                        {bed.since && !isMobile && (
                          <div style={{ fontSize: 9, color: '#9CA3AF', marginTop: 1 }}>desde {bed.since}</div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
          {filteredBeds.length === 0 && (
            <p style={{ fontSize: 13, color: '#9CA3AF', textAlign: 'center', padding: '12px 0' }}>Nenhum leito encontrado.</p>
          )}
        </div>
      </div>
    </div>
  )
}
