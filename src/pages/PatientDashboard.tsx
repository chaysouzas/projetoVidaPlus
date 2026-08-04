import { useState } from 'react'
import { MapPin, Video, FileText, ChevronRight, AlertTriangle, Clock, Calendar, X, CalendarPlus } from 'lucide-react'
import Badge from '../components/Badge'
import { useMobile } from '../hooks/useMobile'
import { appointments, exams } from '../data/mock'

interface Props {
  navigate: (page: string, params?: Record<string, unknown>) => void
}

export default function PatientDashboard({ navigate }: Props) {
  const isMobile = useMobile()
  const [cancelModal, setCancelModal] = useState(false)
  const [examAlert, setExamAlert] = useState(true)

  const upcoming = appointments.filter(
    (a) => a.patientId === 'p001' && ['confirmed', 'scheduled'].includes(a.status)
  )
  const history = appointments.filter(
    (a) => a.patientId === 'p001' && a.status === 'completed'
  )
  const nextAppt = upcoming[0]
  const pendingExams = exams.filter((e) => e.patientId === 'p001' && e.status === 'available')

  const visitMonths = ['Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul']
  const visitData = [1, 2, 0, 1, 1, 2]
  const maxVal = Math.max(...visitData)

  return (
    <div style={{ maxWidth: isMobile ? '100%' : 960, margin: '0 auto' }}>
      <div style={{ marginBottom: isMobile ? 16 : 24, textAlign: isMobile ? 'center' : 'left' }}>
        <h1 style={{ fontSize: isMobile ? 22 : 20, fontWeight: 700, color: '#1E2330', letterSpacing: '-0.02em', marginBottom: 4 }}>
          Bom dia, Beatriz. 👋
        </h1>
        <p style={{ fontSize: 13, color: '#6B7280' }}>
          {isMobile ? 'Seus próximos atendimentos.' : 'Veja seus próximos atendimentos e informações de saúde.'}
        </p>
      </div>

      {examAlert && pendingExams.length > 0 && (
        <div
          style={{
            display: 'flex',
            alignItems: isMobile ? 'flex-start' : 'center',
            gap: 10,
            padding: '10px 14px',
            background: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: 8,
            marginBottom: 16,
          }}
        >
          <FileText size={14} color="#1D4ED8" style={{ flexShrink: 0, marginTop: isMobile ? 2 : 0 }} />
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: 13, color: '#1e40af' }}>
              Resultado do exame disponível:{' '}
              <strong>{pendingExams[0].name}</strong> — {pendingExams[0].date}.
            </span>
            {isMobile && (
              <button
                onClick={() => navigate('exams')}
                style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#1D4ED8', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0 0', textAlign: 'left' }}
              >
                Ver exame →
              </button>
            )}
          </div>
          {!isMobile && (
            <button
              onClick={() => navigate('exams')}
              style={{ fontSize: 12, fontWeight: 500, color: '#1D4ED8', background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              Ver exame
            </button>
          )}
          <button
            onClick={() => setExamAlert(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#93c5fd', display: 'flex', padding: 2, flexShrink: 0 }}
          >
            <X size={13} />
          </button>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? 12 : 16,
        marginBottom: isMobile ? 12 : 16,
      }}>
        <div style={{ background: '#fff', border: '1px solid #D9DCE3', borderRadius: 8, padding: '16px' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 12 }}>
            Próxima consulta
          </div>
          {nextAppt ? (
            <>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#1E2330', marginBottom: 2 }}>{nextAppt.doctorName}</div>
                  <div style={{ fontSize: 12, color: '#6B7280' }}>{nextAppt.specialty}</div>
                </div>
                <Badge status={nextAppt.status} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <Calendar size={12} color="#9CA3AF" />
                  <span style={{ fontSize: 13, color: '#374151' }}>18 de agosto de 2026, {nextAppt.time}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <MapPin size={12} color="#9CA3AF" />
                  <span style={{ fontSize: 13, color: '#374151' }}>{nextAppt.type} · {nextAppt.unit}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => navigate('appointment-detail')}
                  style={{ flex: 1, padding: isMobile ? '11px 12px' : '8px 12px', background: '#1D4ED8', color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
                >
                  Ver detalhes
                </button>
                <button
                  onClick={() => setCancelModal(true)}
                  style={{ padding: isMobile ? '11px 14px' : '8px 12px', background: '#fff', color: '#6B7280', border: '1px solid #D9DCE3', borderRadius: 6, fontSize: 13, cursor: 'pointer' }}
                >
                  Cancelar
                </button>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '16px 0', color: '#9CA3AF' }}>
              <Calendar size={28} style={{ margin: '0 auto 8px', display: 'block' }} />
              <p style={{ fontSize: 13, marginBottom: 12 }}>Nenhuma consulta agendada.</p>
              <button
                onClick={() => navigate('schedule')}
                style={{ padding: '10px 18px', background: '#1D4ED8', color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
              >
                Agendar agora
              </button>
            </div>
          )}
        </div>

        <div style={{ background: '#fff', border: '1px solid #D9DCE3', borderRadius: 8, padding: '16px' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 12 }}>
            Telemedicina
          </div>
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#16a34a', boxShadow: '0 0 0 3px rgba(22,163,74,0.2)', flexShrink: 0 }} />
              <span style={{ fontSize: 12, fontWeight: 500, color: '#15803d' }}>Consulta disponível</span>
            </div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1E2330', marginBottom: 2 }}>Dr. Marcelo Teixeira</div>
              <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 6 }}>Clínica Geral</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Clock size={12} color="#9CA3AF" />
                <span style={{ fontSize: 12, color: '#374151' }}>Hoje às 16:00 · Teleconsulta</span>
              </div>
            </div>
            <button
              onClick={() => navigate('telemedicine')}
              style={{
                width: '100%',
                padding: isMobile ? '11px 12px' : '8px 12px',
                background: '#16a34a',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              <Video size={14} />
              Entrar na consulta
            </button>
          </>
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #D9DCE3', borderRadius: 8, marginBottom: isMobile ? 12 : 16, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: '1px solid #D9DCE3' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#1E2330' }}>Consultas agendadas</div>
          <button
            onClick={() => navigate('appointments')}
            style={{ fontSize: 12, color: '#1D4ED8', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3 }}
          >
            Ver todas <ChevronRight size={12} />
          </button>
        </div>
        {upcoming.length === 0 ? (
          <div style={{ padding: 24, textAlign: 'center', color: '#9CA3AF', fontSize: 13 }}>
            Nenhuma consulta agendada.
          </div>
        ) : (
          <div>
            {upcoming.map((appt, i) => (
              <div
                key={appt.id}
                style={{
                  padding: '12px 16px',
                  borderBottom: i < upcoming.length - 1 ? '1px solid #F3F4F6' : 'none',
                  display: 'flex',
                  alignItems: isMobile ? 'flex-start' : 'center',
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 8,
                    background: '#F6F7FB',
                    border: '1px solid #D9DCE3',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1E2330', lineHeight: 1 }}>
                    {appt.date.split('/')[0]}
                  </div>
                  <div style={{ fontSize: 9, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][parseInt(appt.date.split('/')[1]) - 1]}
                  </div>
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 3 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#1E2330', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {appt.doctorName}
                    </div>
                    <Badge status={appt.status} />
                  </div>
                  <div style={{ fontSize: 12, color: '#6B7280', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', gap: '3px 12px' }}>
                    <span>{appt.specialty}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      {appt.type === 'Teleconsulta' ? <Video size={11} /> : <MapPin size={11} />}
                      {appt.type}
                    </span>
                    <span>{appt.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
        gap: isMobile ? 12 : 16,
      }}>
        <div style={{ background: '#fff', border: '1px solid #D9DCE3', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid #D9DCE3' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1E2330' }}>Últimas consultas</div>
          </div>
          {history.map((appt, i) => (
            <div
              key={appt.id}
              style={{
                padding: '11px 16px',
                borderBottom: i < history.length - 1 ? '1px solid #F3F4F6' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div style={{ width: 36, flexShrink: 0, textAlign: 'center' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>
                  {appt.date.split('/')[0]}/{appt.date.split('/')[1]}
                </div>
                <div style={{ fontSize: 10, color: '#9CA3AF' }}>{appt.date.split('/')[2]}</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#1E2330', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {appt.doctorName}
                </div>
                <div style={{ fontSize: 11, color: '#6B7280' }}>{appt.specialty}</div>
                {appt.notes && !isMobile && (
                  <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {appt.notes}
                  </div>
                )}
              </div>
              <Badge status="completed" />
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', border: '1px solid #D9DCE3', borderRadius: 8, padding: '14px 16px' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#1E2330', marginBottom: 2 }}>Atendimentos</div>
          <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 16 }}>Últimos 6 meses · 2026</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 72 }}>
            {visitMonths.map((month, i) => (
              <div key={month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div
                  style={{
                    width: '100%',
                    background: visitData[i] > 0 ? '#1D4ED8' : '#e5e7eb',
                    borderRadius: 3,
                    height: maxVal > 0 ? `${(visitData[i] / maxVal) * 56}px` : 4,
                    minHeight: 4,
                    opacity: visitData[i] === 0 ? 0.35 : 1,
                  }}
                />
                <span style={{ fontSize: 10, color: '#9CA3AF' }}>{month}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid #f3f4f6' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <div style={{ fontSize: 26, fontWeight: 700, color: '#1E2330' }}>
                {visitData.reduce((a, b) => a + b, 0)}
              </div>
              <div style={{ fontSize: 12, color: '#16a34a', fontWeight: 500 }}>consultas</div>
            </div>
            <div style={{ fontSize: 11, color: '#9CA3AF' }}>realizadas no período</div>
          </div>
        </div>
      </div>

      {isMobile && (
        <button
          onClick={() => navigate('schedule')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            width: '100%',
            marginTop: 12,
            padding: '14px',
            background: '#1D4ED8',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <CalendarPlus size={16} />
          Agendar nova consulta
        </button>
      )}

      {cancelModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: isMobile ? 'flex-end' : 'center', justifyContent: 'center', zIndex: 100, padding: isMobile ? 0 : 16 }}>
          <div style={{ background: '#fff', borderRadius: isMobile ? '16px 16px 0 0' : 8, padding: isMobile ? '20px 20px 32px' : 24, width: '100%', maxWidth: isMobile ? '100%' : 400, border: isMobile ? 'none' : '1px solid #D9DCE3' }}>
            {isMobile && <div style={{ width: 32, height: 4, background: '#D9DCE3', borderRadius: 2, margin: '0 auto 16px' }} />}
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <AlertTriangle size={18} color="#d97706" style={{ flexShrink: 0, marginTop: 1 }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1E2330', marginBottom: 4 }}>Cancelar consulta?</div>
                <div style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.5 }}>
                  Cancelar com <strong>Dr. Rodrigo Almeida</strong> em 18/08/2026 às 14:30. Esta ação não pode ser desfeita.
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 8 }}>
              <button
                onClick={() => setCancelModal(false)}
                style={{ flex: 1, padding: isMobile ? '13px' : '8px 14px', background: '#fff', border: '1px solid #D9DCE3', borderRadius: 8, fontSize: 13, color: '#374151', cursor: 'pointer', fontWeight: 500 }}
              >
                Manter consulta
              </button>
              <button
                onClick={() => setCancelModal(false)}
                style={{ flex: 1, padding: isMobile ? '13px' : '8px 14px', background: '#DC2626', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#fff', cursor: 'pointer' }}
              >
                Sim, cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
