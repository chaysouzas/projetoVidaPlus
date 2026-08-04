import { useState } from 'react'
import { Search, ChevronRight } from 'lucide-react'
import Badge from '../components/Badge'
import { patients } from '../data/mock'
import { useMobile } from '../hooks/useMobile'

interface Props {
  navigate: (page: string, params?: Record<string, unknown>) => void
  title?: string
  subtitle?: string
}

export default function RecordsListPage({ navigate, title = 'Prontuários', subtitle = 'Selecione um paciente para visualizar ou atualizar o prontuário.' }: Props) {
  const isMobile = useMobile()
  const [search, setSearch] = useState('')

  const filtered = patients.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ maxWidth: isMobile ? '100%' : 860, margin: '0 auto' }}>
      <div style={{ marginBottom: 16, textAlign: isMobile ? 'center' : 'left' }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1E2330', marginBottom: 2 }}>{title}</h2>
        <p style={{ fontSize: 13, color: '#6B7280' }}>{subtitle}</p>
      </div>

      <div style={{ position: 'relative', marginBottom: 14 }}>
        <Search size={14} color="#9CA3AF" style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)' }} />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar paciente por nome..."
          style={{ width: '100%', padding: isMobile ? '12px 12px 12px 34px' : '9px 12px 9px 32px', border: '1px solid #D9DCE3', borderRadius: 8, fontSize: isMobile ? 15 : 13, color: '#1E2330', background: '#fff', outline: 'none', fontFamily: 'inherit' }}
        />
      </div>

      <div style={{ background: '#fff', border: '1px solid #D9DCE3', borderRadius: 8, overflow: 'hidden' }}>
        {isMobile ? (
          <div>
            {filtered.map((patient, i) => (
              <div
                key={patient.id}
                onClick={() => navigate('medical-record', { patientId: patient.id })}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: i < filtered.length - 1 ? '1px solid #F3F4F6' : 'none', cursor: 'pointer' }}
              >
                <div style={{ width: 38, height: 38, borderRadius: 10, background: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#1D4ED8', flexShrink: 0 }}>
                  {patient.name.split(' ').slice(0, 2).map((w) => w[0]).join('')}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#1E2330', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {patient.name}
                  </div>
                  <div style={{ fontSize: 12, color: '#6B7280' }}>
                    {patient.age} anos · {patient.lastVisit}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Badge status={patient.status} />
                  <ChevronRight size={14} color="#D9DCE3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto 20px', padding: '8px 16px', fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #F3F4F6' }}>
              <div>Paciente</div>
              <div>Idade</div>
              <div>Última consulta</div>
              <div>Próxima consulta</div>
              <div>Status</div>
              <div />
            </div>
            {filtered.map((patient, i) => (
              <div
                key={patient.id}
                style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto 20px', alignItems: 'center', padding: '10px 16px', borderBottom: i < filtered.length - 1 ? '1px solid #F3F4F6' : 'none', cursor: 'pointer' }}
                onClick={() => navigate('medical-record', { patientId: patient.id })}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#f9fafb' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#1E2330' }}>{patient.name}</div>
                  <div style={{ fontSize: 11, color: '#9CA3AF' }}>{patient.patientId}</div>
                </div>
                <div style={{ fontSize: 13, color: '#374151' }}>{patient.age} anos</div>
                <div style={{ fontSize: 12, color: '#6B7280' }}>{patient.lastVisit}</div>
                <div style={{ fontSize: 12, color: patient.nextVisit ? '#374151' : '#9CA3AF' }}>{patient.nextVisit ?? '—'}</div>
                <Badge status={patient.status} />
                <ChevronRight size={14} color="#D9DCE3" />
              </div>
            ))}
          </div>
        )}
        {filtered.length === 0 && (
          <div style={{ padding: 24, textAlign: 'center', fontSize: 13, color: '#9CA3AF' }}>Nenhum paciente encontrado.</div>
        )}
      </div>
    </div>
  )
}
