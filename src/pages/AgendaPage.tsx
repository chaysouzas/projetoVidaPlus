import { useState } from 'react'
import { ChevronLeft, ChevronRight, MapPin, Video, FileText, Play, Check, X } from 'lucide-react'
import Badge from '../components/Badge'
import { appointments, doctors } from '../data/mock'
import type { AppStatus } from '../data/mock'
import { useMobile } from '../hooks/useMobile'

interface Props {
  navigate: (page: string, params?: Record<string, unknown>) => void
}

const DOCTOR_ID = 'd02'
const TODAY = '30/07/2026'

const filterOptions: { id: AppStatus | 'all'; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'confirmed', label: 'Confirmados' },
  { id: 'scheduled', label: 'Agendados' },
  { id: 'in-progress', label: 'Em atendimento' },
  { id: 'completed', label: 'Concluídos' },
  { id: 'cancelled', label: 'Cancelados' },
]

function parseBR(date: string): Date {
  const [d, m, y] = date.split('/').map(Number)
  return new Date(y, m - 1, d)
}

function formatBR(date: Date): string {
  const d = String(date.getDate()).padStart(2, '0')
  const m = String(date.getMonth() + 1).padStart(2, '0')
  return `${d}/${m}/${date.getFullYear()}`
}

function shiftDate(date: string, days: number): string {
  const d = parseBR(date)
  d.setDate(d.getDate() + days)
  return formatBR(d)
}

function formatLong(date: string): string {
  return parseBR(date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function AgendaPage({ navigate }: Props) {
  const isMobile = useMobile()
  const [selectedDate, setSelectedDate] = useState(TODAY)
  const [statusFilter, setStatusFilter] = useState<AppStatus | 'all'>('all')
  const [, forceRerender] = useState(0)

  const doctor = doctors.find((d) => d.id === DOCTOR_ID)

  const dayAppointments = appointments
    .filter((a) => a.doctorId === DOCTOR_ID && a.date === selectedDate)
    .filter((a) => statusFilter === 'all' || a.status === statusFilter)
    .sort((a, b) => a.time.localeCompare(b.time))

  const allDayAppointments = appointments.filter((a) => a.doctorId === DOCTOR_ID && a.date === selectedDate)
  const counts = {
    total: allDayAppointments.length,
    completed: allDayAppointments.filter((a) => a.status === 'completed').length,
    inProgress: allDayAppointments.filter((a) => a.status === 'in-progress').length,
    upcoming: allDayAppointments.filter((a) => a.status === 'scheduled' || a.status === 'confirmed').length,
  }

  const updateStatus = (id: string, status: AppStatus) => {
    const appt = appointments.find((a) => a.id === id)
    if (appt) appt.status = status
    forceRerender((n) => n + 1)
  }

  return (
    <div style={{ maxWidth: isMobile ? '100%' : 900, margin: '0 auto' }}>
      <div style={{ marginBottom: isMobile ? 16 : 20, textAlign: isMobile ? 'center' : 'left' }}>
        <h1 style={{ fontSize: isMobile ? 22 : 20, fontWeight: 700, color: '#1E2330', letterSpacing: '-0.02em', marginBottom: 4 }}>
          Minha agenda
        </h1>
        <p style={{ fontSize: 13, color: '#6B7280' }}>{doctor?.name} · {doctor?.specialty} · {doctor?.unit}</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 16, background: '#fff', border: '1px solid #D9DCE3', borderRadius: 8, padding: '10px 12px' }}>
        <button
          onClick={() => setSelectedDate((d) => shiftDate(d, -1))}
          style={{ display: 'flex', padding: 8, color: '#374151', border: '1px solid #D9DCE3', background: '#fff', borderRadius: 6, cursor: 'pointer' }}
          aria-label="Dia anterior"
        >
          <ChevronLeft size={16} />
        </button>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: isMobile ? 14 : 15, fontWeight: 600, color: '#1E2330' }}>{formatLong(selectedDate)}</div>
          {selectedDate !== TODAY && (
            <button
              onClick={() => setSelectedDate(TODAY)}
              style={{ fontSize: 11, color: '#1D4ED8', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginTop: 2 }}
            >
              Voltar para hoje
            </button>
          )}
        </div>
        <button
          onClick={() => setSelectedDate((d) => shiftDate(d, 1))}
          style={{ display: 'flex', padding: 8, color: '#374151', border: '1px solid #D9DCE3', background: '#fff', borderRadius: 6, cursor: 'pointer' }}
          aria-label="Próximo dia"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 10, marginBottom: 16 }}>
        {[
          { label: 'Atendimentos', value: counts.total, color: '#1D4ED8' },
          { label: 'Em andamento', value: counts.inProgress, color: '#d97706' },
          { label: 'A confirmar/iniciar', value: counts.upcoming, color: '#2563eb' },
          { label: 'Concluídos', value: counts.completed, color: '#16a34a' },
        ].map((m) => (
          <div key={m.label} style={{ background: '#fff', border: '1px solid #D9DCE3', borderRadius: 8, padding: '12px 14px' }}>
            <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: m.color, lineHeight: 1 }}>{m.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
        {filterOptions.map((f) => (
          <button
            key={f.id}
            onClick={() => setStatusFilter(f.id)}
            style={{
              padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: statusFilter === f.id ? 600 : 400,
              border: `1px solid ${statusFilter === f.id ? '#1D4ED8' : '#D9DCE3'}`,
              background: statusFilter === f.id ? '#eff6ff' : '#fff',
              color: statusFilter === f.id ? '#1D4ED8' : '#6B7280', cursor: 'pointer',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {dayAppointments.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid #D9DCE3', borderRadius: 8, padding: 32, textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: '#9CA3AF' }}>Nenhum atendimento para este dia.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {dayAppointments.map((appt) => (
            <div key={appt.id} style={{ background: '#fff', border: '1px solid #D9DCE3', borderRadius: 8, padding: isMobile ? '14px' : '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1E2330', minWidth: 44 }}>{appt.time}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#1E2330' }}>{appt.patientName}</div>
                    <div style={{ fontSize: 12, color: '#6B7280', display: 'flex', alignItems: 'center', gap: 5 }}>
                      {appt.type === 'Teleconsulta' ? <Video size={11} /> : <MapPin size={11} />}
                      {appt.specialty} · {appt.type}{appt.unit ? ` · ${appt.unit}` : ''}
                    </div>
                  </div>
                </div>
                <Badge status={appt.status} />
              </div>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingTop: 10, borderTop: '1px solid #F3F4F6' }}>
                {(appt.status === 'scheduled' || appt.status === 'confirmed') && (
                  <>
                    <button
                      onClick={() => updateStatus(appt.id, 'in-progress')}
                      style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 12px', background: '#1D4ED8', color: '#fff', border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                    >
                      <Play size={12} /> Iniciar atendimento
                    </button>
                    <button
                      onClick={() => updateStatus(appt.id, 'cancelled')}
                      style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 12px', background: '#fff', color: '#DC2626', border: '1px solid #fca5a5', borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: 'pointer' }}
                    >
                      <X size={12} /> Cancelar
                    </button>
                  </>
                )}
                {appt.status === 'in-progress' && (
                  <>
                    {appt.type === 'Teleconsulta' && (
                      <button
                        onClick={() => navigate('telemedicine')}
                        style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 12px', background: '#d97706', color: '#fff', border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                      >
                        <Video size={12} /> Entrar na consulta
                      </button>
                    )}
                    <button
                      onClick={() => updateStatus(appt.id, 'completed')}
                      style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 12px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                    >
                      <Check size={12} /> Concluir atendimento
                    </button>
                  </>
                )}
                <button
                  onClick={() => navigate('medical-record', { patientId: appt.patientId })}
                  style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 12px', background: '#fff', color: '#374151', border: '1px solid #D9DCE3', borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: 'pointer' }}
                >
                  <FileText size={12} /> Ver prontuário
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
