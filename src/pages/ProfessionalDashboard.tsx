import { useState } from 'react'
import { Search, Video, MapPin, FileText, Plus, ChevronRight, UserPlus } from 'lucide-react'
import Badge from '../components/Badge'
import { useMobile } from '../hooks/useMobile'
import { patients } from '../data/mock'

interface Props {
  navigate: (page: string, params?: Record<string, unknown>) => void
}

const todaySchedule = [
  { time: '08:00', patientName: 'Ricardo Nogueira', type: 'Presencial', note: 'Primeira consulta', status: 'completed' as const },
  { time: '09:00', patientName: 'Camila Duarte', type: 'Presencial', note: 'Retorno', status: 'completed' as const },
  { time: '10:30', patientName: 'Eduardo Martins', type: 'Teleconsulta', note: 'Retorno — dermatite', status: 'in-progress' as const },
  { time: '14:00', patientName: 'Patrícia Lopes', type: 'Presencial', note: 'Consulta rotina', status: 'scheduled' as const },
  { time: '15:30', patientName: 'Juliana Rocha', type: 'Presencial', note: 'Primeira consulta', status: 'scheduled' as const },
]

const metrics = [
  { label: 'Consultas hoje', value: 5, sub: '2 concluídas', color: '#1D4ED8' },
  { label: 'Aguardando', value: 1, sub: 'Em espera', color: '#d97706' },
  { label: 'Teleconsultas', value: 1, sub: 'Ativa agora', color: '#16a34a' },
  { label: 'Prontuários', value: 3, sub: 'Pendentes', color: '#6B7280' },
]

export default function ProfessionalDashboard({ navigate }: Props) {
  const isMobile = useMobile()
  const [patientSearch, setPatientSearch] = useState('')

  const recentPatients = patients.slice(0, isMobile ? 4 : 5)
  const filteredPatients = recentPatients.filter((p) =>
    p.name.toLowerCase().includes(patientSearch.toLowerCase())
  )

  return (
    <div style={{ maxWidth: isMobile ? '100%' : 1060, margin: '0 auto' }}>
      <div style={{ marginBottom: isMobile ? 16 : 24, textAlign: isMobile ? 'center' : 'left' }}>
        <h1 style={{ fontSize: isMobile ? 22 : 20, fontWeight: 700, color: '#1E2330', letterSpacing: '-0.02em', marginBottom: 4 }}>
          Bom dia, Dra. Fernanda.
        </h1>
        <p style={{ fontSize: 13, color: '#6B7280' }}>
          {isMobile ? '30 jul 2026 · Unidade Norte' : '30 de julho de 2026 · Unidade Norte · Dermatologia'}
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
        gap: isMobile ? 10 : 12,
        marginBottom: isMobile ? 12 : 20,
      }}>
        {metrics.map((m) => (
          <div key={m.label} style={{ background: '#fff', border: '1px solid #D9DCE3', borderRadius: 8, padding: isMobile ? '12px 14px' : '14px 16px' }}>
            <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 4, lineHeight: 1.3 }}>{m.label}</div>
            <div style={{ fontSize: isMobile ? 28 : 26, fontWeight: 700, color: '#1E2330', lineHeight: 1 }}>{m.value}</div>
            <div style={{ fontSize: 11, color: m.color, marginTop: 4, fontWeight: 500 }}>{m.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', border: '1px solid #d97706', borderRadius: 8, padding: '12px 16px', marginBottom: isMobile ? 12 : 16, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#d97706', animation: 'pulse 2s infinite', flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#92400e' }}>Teleconsulta ativa</div>
          <div style={{ fontSize: 12, color: '#6B7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            Eduardo Martins · iniciada às 10:30 · Dermatite
          </div>
        </div>
        <button
          onClick={() => navigate('telemedicine')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: isMobile ? '10px 14px' : '7px 12px',
            background: '#d97706',
            color: '#fff',
            border: 'none',
            borderRadius: 7,
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          <Video size={13} />
          {isMobile ? 'Entrar' : 'Voltar à consulta'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 12 : 16, marginBottom: isMobile ? 12 : 16 }}>
        <div style={{ background: '#fff', border: '1px solid #D9DCE3', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid #D9DCE3', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1E2330' }}>Agenda do dia</div>
            <span style={{ fontSize: 11, color: '#9CA3AF' }}>30/07/2026</span>
          </div>
          {todaySchedule.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 16px',
                borderBottom: i < todaySchedule.length - 1 ? '1px solid #F3F4F6' : 'none',
                background: item.status === 'in-progress' ? '#fffbeb' : 'transparent',
                borderLeft: item.status === 'in-progress' ? '3px solid #d97706' : '3px solid transparent',
              }}
            >
              <div style={{ width: 36, flexShrink: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{item.time}</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#1E2330', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.patientName}</span>
                  {item.type === 'Teleconsulta' && <Video size={11} color="#6B7280" style={{ flexShrink: 0 }} />}
                </div>
                <div style={{ fontSize: 11, color: '#9CA3AF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.note}</div>
              </div>
              <div style={{ flexShrink: 0 }}>
                <Badge status={item.status} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 10 : 12 }}>
          <div style={{ background: '#fff', border: '1px solid #D9DCE3', borderRadius: 8, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1E2330', marginBottom: 12 }}>Acesso rápido</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                { label: 'Novo atendimento', icon: <Plus size={14} />, action: 'schedule', primary: true },
                { label: 'Cadastrar paciente', icon: <UserPlus size={14} />, action: 'register-patient', primary: false },
                { label: 'Buscar paciente', icon: <Search size={14} />, action: 'patients', primary: false },
                { label: 'Prontuário', icon: <FileText size={14} />, action: 'medical-record', primary: false },
                { label: 'Telemedicina', icon: <Video size={14} />, action: 'telemedicine', primary: false },
              ].map((btn) => (
                <button
                  key={btn.label}
                  onClick={() => navigate(btn.action)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 7,
                    padding: isMobile ? '12px 10px' : '9px 12px',
                    background: btn.primary ? '#1D4ED8' : '#fff',
                    color: btn.primary ? '#fff' : '#374151',
                    border: `1px solid ${btn.primary ? '#1D4ED8' : '#D9DCE3'}`,
                    borderRadius: 7,
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  {btn.icon}
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #D9DCE3', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #D9DCE3', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#1E2330' }}>Pacientes recentes</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ position: 'relative' }}>
              <Search size={13} color="#9CA3AF" style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="search"
                value={patientSearch}
                onChange={(e) => setPatientSearch(e.target.value)}
                placeholder="Buscar..."
                style={{
                  width: isMobile ? 130 : 200,
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
              onClick={() => navigate('patients')}
              style={{ fontSize: 12, color: '#1D4ED8', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 2, whiteSpace: 'nowrap' }}
            >
              Ver todos <ChevronRight size={12} />
            </button>
          </div>
        </div>

        {isMobile ? (
          <div>
            {filteredPatients.map((patient, i) => (
              <div
                key={patient.id}
                onClick={() => navigate('medical-record', { patientId: patient.id })}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 16px',
                  borderBottom: i < filteredPatients.length - 1 ? '1px solid #F3F4F6' : 'none',
                  cursor: 'pointer',
                  active: { background: '#f9fafb' },
                }}
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
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', padding: '8px 16px', fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #F3F4F6' }}>
              <div>Paciente</div>
              <div>Idade</div>
              <div>Última consulta</div>
              <div>Próxima consulta</div>
              <div>Status</div>
            </div>
            {filteredPatients.map((patient, i) => (
              <div
                key={patient.id}
                style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', alignItems: 'center', padding: '10px 16px', borderBottom: i < filteredPatients.length - 1 ? '1px solid #F3F4F6' : 'none', cursor: 'pointer' }}
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
              </div>
            ))}
          </div>
        )}

        {filteredPatients.length === 0 && (
          <div style={{ padding: 24, textAlign: 'center', fontSize: 13, color: '#9CA3AF' }}>Nenhum paciente encontrado.</div>
        )}
      </div>

      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </div>
  )
}
