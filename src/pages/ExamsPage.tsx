import { useState } from 'react'
import { FlaskConical, ChevronRight, ChevronLeft, MapPin, Calendar, Check, Loader2, Download, CalendarPlus } from 'lucide-react'
import Badge from '../components/Badge'
import { exams } from '../data/mock'
import type { Exam } from '../data/mock'
import { useMobile } from '../hooks/useMobile'

interface Props {
  navigate: (page: string) => void
}

const PATIENT_ID = 'p001'

const examTypes = [
  { id: 'hemograma', label: 'Hemograma completo', description: 'Avaliação geral do sangue' },
  { id: 'eletro', label: 'Eletrocardiograma', description: 'Atividade elétrica do coração' },
  { id: 'eco', label: 'Ecocardiograma', description: 'Estrutura e função do coração' },
  { id: 'raiox', label: 'Raio-X de tórax', description: 'Imagem dos pulmões e coração' },
  { id: 'ressonancia', label: 'Ressonância magnética', description: 'Imagem detalhada de tecidos moles' },
  { id: 'ultrassom', label: 'Ultrassonografia abdominal', description: 'Imagem dos órgãos abdominais' },
]

const units = ['Unidade Centro', 'Unidade Norte', 'Unidade Sul']

const timeSlots = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00']
const unavailableSlots = ['08:30', '09:30', '14:00']

const calendarDays = [
  { day: 4, dayName: 'Qui', available: true },
  { day: 5, dayName: 'Sex', available: false },
  { day: 7, dayName: 'Dom', available: false },
  { day: 8, dayName: 'Seg', available: true },
  { day: 9, dayName: 'Ter', available: true },
  { day: 10, dayName: 'Qua', available: true },
  { day: 11, dayName: 'Qui', available: false },
  { day: 12, dayName: 'Sex', available: true },
  { day: 14, dayName: 'Dom', available: false },
  { day: 15, dayName: 'Seg', available: true },
  { day: 16, dayName: 'Ter', available: true },
  { day: 17, dayName: 'Qua', available: false },
  { day: 18, dayName: 'Qui', available: true },
  { day: 19, dayName: 'Sex', available: true },
]

export default function ExamsPage({ navigate }: Props) {
  const isMobile = useMobile()
  const [mode, setMode] = useState<'list' | 'schedule'>('list')
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [confirming, setConfirming] = useState(false)
  const [confirmed, setConfirmed] = useState<Exam | null>(null)

  const myExams = exams.filter((e) => e.patientId === PATIENT_ID).slice().reverse()
  const selectedTypeData = examTypes.find((t) => t.id === selectedType)

  const steps = [
    { n: 1, label: 'Tipo de exame' },
    { n: 2, label: 'Unidade' },
    { n: 3, label: 'Data e hora' },
    { n: 4, label: 'Confirmação' },
  ]

  const startScheduling = () => {
    setMode('schedule')
    setStep(1)
    setSelectedType(null)
    setSelectedUnit(null)
    setSelectedDay(null)
    setSelectedTime(null)
    setConfirmed(null)
  }

  const handleConfirm = () => {
    if (!selectedTypeData || !selectedUnit || !selectedDay || !selectedTime) return
    setConfirming(true)
    setTimeout(() => {
      const seq = exams.length + 1
      const newExam: Exam = {
        id: `e${String(seq).padStart(3, '0')}`,
        patientId: PATIENT_ID,
        name: selectedTypeData.label,
        date: `${selectedDay}/08/2026`,
        status: 'pending',
        result: null,
        requestedBy: 'Solicitação do paciente',
      }
      exams.push(newExam)
      setConfirming(false)
      setConfirmed(newExam)
    }, 1000)
  }

  if (mode === 'schedule' && confirmed) {
    return (
      <div style={{ maxWidth: 440, margin: '32px auto', textAlign: 'center', padding: isMobile ? '0' : '0 16px' }}>
        <div style={{ width: 60, height: 60, background: '#f0fdf4', border: '2px solid #16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <Check size={26} color="#16a34a" />
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1E2330', marginBottom: 8 }}>Exame agendado.</h2>
        <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.6, marginBottom: 24 }}>
          <strong>{confirmed.name}</strong> foi agendado para {confirmed.date}, às {selectedTime}, em <strong>{selectedUnit}</strong>.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button
            onClick={() => setMode('list')}
            style={{ width: '100%', padding: '13px', background: '#1D4ED8', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
          >
            Ver meus exames
          </button>
          <button
            onClick={() => navigate('dashboard')}
            style={{ width: '100%', padding: '13px', background: '#fff', color: '#374151', border: '1px solid #D9DCE3', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
          >
            Voltar ao início
          </button>
        </div>
      </div>
    )
  }

  if (mode === 'schedule') {
    return (
      <div style={{ maxWidth: isMobile ? '100%' : 680, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: isMobile ? 20 : 28 }}>
          {steps.map((s, i) => (
            <div key={s.n} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 'unset' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: isMobile ? 28 : 24, height: isMobile ? 28 : 24,
                  borderRadius: '50%',
                  background: step >= s.n ? '#1D4ED8' : '#e5e7eb',
                  color: step >= s.n ? '#fff' : '#9CA3AF',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: isMobile ? 12 : 11, fontWeight: 700, flexShrink: 0,
                }}>
                  {step > s.n ? <Check size={isMobile ? 14 : 12} /> : s.n}
                </div>
                {!isMobile && (
                  <span style={{ fontSize: 12, fontWeight: step === s.n ? 600 : 400, color: step >= s.n ? '#1E2330' : '#9CA3AF', whiteSpace: 'nowrap' }}>
                    {s.label}
                  </span>
                )}
              </div>
              {i < steps.length - 1 && (
                <div style={{ flex: 1, height: 1, background: step > s.n ? '#1D4ED8' : '#e5e7eb', margin: '0 6px' }} />
              )}
            </div>
          ))}
        </div>

        {isMobile && (
          <div style={{ marginBottom: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 2 }}>Passo {step} de 4</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: '#1E2330' }}>{steps[step - 1].label}</div>
          </div>
        )}

        {step === 1 && (
          <div>
            {!isMobile && (
              <div style={{ marginBottom: 16 }}>
                <h2 style={{ fontSize: 16, fontWeight: 600, color: '#1E2330', marginBottom: 4 }}>Qual exame você precisa agendar?</h2>
                <p style={{ fontSize: 13, color: '#6B7280' }}>Selecione o tipo de exame desejado.</p>
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {examTypes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setSelectedType(t.id); setStep(2) }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: isMobile ? '14px 16px' : '12px 14px', background: '#fff', border: `1px solid ${selectedType === t.id ? '#1D4ED8' : '#D9DCE3'}`, borderRadius: 9, cursor: 'pointer', textAlign: 'left' }}
                >
                  <div>
                    <div style={{ fontSize: isMobile ? 15 : 13, fontWeight: 600, color: '#1E2330' }}>{t.label}</div>
                    <div style={{ fontSize: isMobile ? 13 : 12, color: '#6B7280', marginTop: 2 }}>{t.description}</div>
                  </div>
                  <ChevronRight size={16} color="#9CA3AF" />
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            {!isMobile && (
              <div style={{ marginBottom: 16 }}>
                <h2 style={{ fontSize: 16, fontWeight: 600, color: '#1E2330', marginBottom: 4 }}>Escolha a unidade</h2>
                <p style={{ fontSize: 13, color: '#6B7280' }}>Onde você prefere realizar o <strong>{selectedTypeData?.label}</strong>?</p>
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {units.map((unit) => (
                <button
                  key={unit}
                  onClick={() => { setSelectedUnit(unit); setStep(3) }}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: isMobile ? '14px' : '14px 16px', background: '#fff', border: `1px solid ${selectedUnit === unit ? '#1D4ED8' : '#D9DCE3'}`, borderRadius: 10, cursor: 'pointer', textAlign: 'left' }}
                >
                  <MapPin size={16} color="#1D4ED8" />
                  <span style={{ fontSize: isMobile ? 15 : 14, fontWeight: 600, color: '#1E2330' }}>{unit}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(1)} style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6B7280', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <ChevronLeft size={14} /> Voltar
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            {!isMobile && (
              <div style={{ marginBottom: 14 }}>
                <h2 style={{ fontSize: 16, fontWeight: 600, color: '#1E2330', marginBottom: 2 }}>Escolha data e horário</h2>
                <p style={{ fontSize: 13, color: '#6B7280' }}>{selectedTypeData?.label} · {selectedUnit}</p>
              </div>
            )}

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Agosto 2026</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: isMobile ? 5 : 4 }}>
                {calendarDays.map((d) => (
                  <button
                    key={d.day}
                    onClick={() => d.available && setSelectedDay(d.day)}
                    disabled={!d.available}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: isMobile ? '7px 4px' : '6px 4px', border: `1px solid ${selectedDay === d.day ? '#1D4ED8' : d.available ? '#D9DCE3' : '#e5e7eb'}`, background: selectedDay === d.day ? '#1D4ED8' : d.available ? '#fff' : '#f9fafb', borderRadius: 7, cursor: d.available ? 'pointer' : 'not-allowed', opacity: d.available ? 1 : 0.35 }}
                  >
                    <span style={{ fontSize: 9, color: selectedDay === d.day ? 'rgba(255,255,255,0.7)' : '#9CA3AF' }}>{d.dayName}</span>
                    <span style={{ fontSize: isMobile ? 14 : 13, fontWeight: 700, color: selectedDay === d.day ? '#fff' : d.available ? '#1E2330' : '#9CA3AF' }}>{d.day}</span>
                  </button>
                ))}
              </div>
            </div>

            {selectedDay && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Horários — {selectedDay}/08/2026</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? 8 : 6 }}>
                  {timeSlots.map((t) => {
                    const isUnavail = unavailableSlots.includes(t)
                    const isSel = selectedTime === t
                    return (
                      <button
                        key={t}
                        onClick={() => !isUnavail && setSelectedTime(t)}
                        disabled={isUnavail}
                        style={{ padding: isMobile ? '9px 14px' : '6px 12px', border: `1px solid ${isSel ? '#1D4ED8' : isUnavail ? '#e5e7eb' : '#D9DCE3'}`, background: isSel ? '#1D4ED8' : isUnavail ? '#f9fafb' : '#fff', color: isSel ? '#fff' : isUnavail ? '#D9DCE3' : '#374151', borderRadius: 6, fontSize: isMobile ? 13 : 12, fontWeight: isSel ? 600 : 400, cursor: isUnavail ? 'not-allowed' : 'pointer', textDecoration: isUnavail ? 'line-through' : 'none' }}
                      >
                        {t}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: 8, marginTop: isMobile ? 8 : 16 }}>
              <button onClick={() => setStep(2)} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6B7280', background: '#fff', border: '1px solid #D9DCE3', borderRadius: 8, padding: isMobile ? '12px 16px' : '9px 14px', cursor: 'pointer', fontWeight: 500 }}>
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => selectedDay && selectedTime && setStep(4)}
                disabled={!selectedDay || !selectedTime}
                style={{ flex: 1, padding: isMobile ? '13px' : '9px', background: !selectedDay || !selectedTime ? '#93c5fd' : '#1D4ED8', color: '#fff', border: 'none', borderRadius: 8, fontSize: isMobile ? 14 : 13, fontWeight: 600, cursor: !selectedDay || !selectedTime ? 'not-allowed' : 'pointer' }}
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            {!isMobile && (
              <div style={{ marginBottom: 18 }}>
                <h2 style={{ fontSize: 16, fontWeight: 600, color: '#1E2330', marginBottom: 4 }}>Confirmar agendamento</h2>
                <p style={{ fontSize: 13, color: '#6B7280' }}>Revise os dados antes de confirmar.</p>
              </div>
            )}
            <div style={{ background: '#fff', border: '1px solid #D9DCE3', borderRadius: 10, overflow: 'hidden', marginBottom: 16 }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #D9DCE3', background: '#F6F7FB' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Resumo do exame</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', fontSize: 13 }}>
                {[
                  ['Exame', selectedTypeData?.label],
                  ['Unidade', selectedUnit],
                  ['Data', `${selectedDay}/08/2026`],
                  ['Horário', selectedTime],
                ].map(([label, value], i) => (
                  <div key={label as string} style={{ padding: '12px 16px', borderBottom: i < 2 ? '1px solid #F3F4F6' : 'none', borderRight: i % 2 === 0 ? '1px solid #F3F4F6' : 'none' }}>
                    <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 3 }}>{label}</div>
                    <div style={{ fontWeight: 600, color: '#1E2330' }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: '10px 14px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, marginBottom: 16, fontSize: 12, color: '#92400e' }}>
              Chegue com 15 minutos de antecedência. Alguns exames exigem jejum — confira as orientações por e-mail.
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setStep(3)} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#6B7280', background: '#fff', border: '1px solid #D9DCE3', borderRadius: 8, padding: isMobile ? '12px 16px' : '9px 14px', cursor: 'pointer' }}>
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={handleConfirm}
                disabled={confirming}
                style={{ flex: 1, padding: isMobile ? '13px' : '10px', background: '#1D4ED8', color: '#fff', border: 'none', borderRadius: 8, fontSize: isMobile ? 14 : 13, fontWeight: 700, cursor: confirming ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              >
                {confirming ? <><Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> Confirmando...</> : 'Confirmar agendamento'}
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => setMode('list')}
          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginTop: 20 }}
        >
          Cancelar agendamento
        </button>

        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: isMobile ? '100%' : 860, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: isMobile ? 'stretch' : 'center', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', gap: 12, marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1E2330', marginBottom: 2 }}>Meus exames</h2>
          <p style={{ fontSize: 13, color: '#6B7280' }}>Acompanhe seus exames e agende novos quando precisar.</p>
        </div>
        <button
          onClick={startScheduling}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: isMobile ? '12px 16px' : '9px 16px', background: '#1D4ED8', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}
        >
          <CalendarPlus size={15} /> Agendar exame
        </button>
      </div>

      {myExams.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid #D9DCE3', borderRadius: 8, padding: 32, textAlign: 'center' }}>
          <FlaskConical size={28} color="#9CA3AF" style={{ margin: '0 auto 10px', display: 'block' }} />
          <p style={{ fontSize: 13, color: '#9CA3AF' }}>Nenhum exame registrado.</p>
        </div>
      ) : isMobile ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {myExams.map((exam) => (
            <div key={exam.id} style={{ background: '#fff', border: '1px solid #D9DCE3', borderRadius: 8, padding: '12px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#1E2330' }}>{exam.name}</div>
                  <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 1 }}>{exam.date} · {exam.requestedBy}</div>
                </div>
                <Badge status={exam.status} />
              </div>
              {exam.result ? (
                <div style={{ fontSize: 12, color: '#374151', background: '#f9fafb', padding: '8px 10px', borderRadius: 5, lineHeight: 1.5 }}>
                  {exam.result}
                </div>
              ) : (
                <div style={{ fontSize: 12, color: '#9CA3AF' }}>Aguardando resultado</div>
              )}
              {exam.status !== 'pending' && (
                <button style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 10, fontSize: 13, fontWeight: 500, color: '#1D4ED8', background: 'none', border: '1px solid #bfdbfe', borderRadius: 6, padding: '7px 12px', cursor: 'pointer' }}>
                  <Download size={13} /> Ver laudo
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ background: '#fff', border: '1px solid #D9DCE3', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 2fr auto', padding: '10px 16px', fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e5e7eb', gap: 12 }}>
            <div>Exame</div><div>Data</div><div>Status</div><div>Resultado</div><div>Ação</div>
          </div>
          {myExams.map((exam, i) => (
            <div key={exam.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 2fr auto', alignItems: 'center', padding: '12px 16px', borderBottom: i < myExams.length - 1 ? '1px solid #F3F4F6' : 'none', gap: 12, fontSize: 13 }}>
              <div style={{ fontWeight: 500, color: '#1E2330' }}>{exam.name}</div>
              <div style={{ color: '#6B7280' }}>{exam.date}</div>
              <div><Badge status={exam.status} /></div>
              <div style={{ fontSize: 12, color: exam.result ? '#374151' : '#9CA3AF' }}>{exam.result ?? 'Aguardando resultado'}</div>
              <div>{exam.status !== 'pending' && (
                <button style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#1D4ED8', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  <Download size={12} /> Ver
                </button>
              )}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
