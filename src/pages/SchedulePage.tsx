import { useState } from 'react'
import { Search, ChevronRight, ChevronLeft, MapPin, Video, Check, Calendar, Loader2 } from 'lucide-react'
import { doctors } from '../data/mock'
import { useMobile } from '../hooks/useMobile'

interface Props {
  navigate: (page: string) => void
}

const specialties = [
  { id: 'cardiologia', label: 'Cardiologia', description: 'Coração e sistema cardiovascular' },
  { id: 'dermatologia', label: 'Dermatologia', description: 'Pele, cabelo e unhas' },
  { id: 'clinica-geral', label: 'Clínica Geral', description: 'Atendimento geral e preventivo' },
  { id: 'neurologia', label: 'Neurologia', description: 'Sistema nervoso' },
  { id: 'ortopedia', label: 'Ortopedia', description: 'Ossos, articulações e músculos' },
]

const specialtyDoctorMap: Record<string, string[]> = {
  cardiologia: ['d01'],
  dermatologia: ['d02'],
  'clinica-geral': ['d03'],
  neurologia: ['d05'],
  ortopedia: ['d04'],
}

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '13:30', '14:00', '14:30', '15:00',
  '15:30', '16:00', '16:30', '17:00',
]
const unavailableSlots = ['08:30', '09:30', '10:30', '14:00', '15:30']

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

export default function SchedulePage({ navigate }: Props) {
  const isMobile = useMobile()
  const [step, setStep] = useState(1)
  const [specialtySearch, setSpecialtySearch] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null)
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedModality, setSelectedModality] = useState<'Presencial' | 'Teleconsulta'>('Presencial')
  const [confirming, setConfirming] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const filteredSpecialties = specialties.filter((s) =>
    s.label.toLowerCase().includes(specialtySearch.toLowerCase())
  )

  const availableDoctors = selectedSpecialty
    ? (specialtyDoctorMap[selectedSpecialty] || []).map((id) => doctors.find((d) => d.id === id)).filter(Boolean)
    : []

  const selectedDoctorData = doctors.find((d) => d.id === selectedDoctor)
  const selectedSpecialtyData = specialties.find((s) => s.id === selectedSpecialty)

  const handleConfirm = () => {
    setConfirming(true)
    setTimeout(() => { setConfirming(false); setConfirmed(true) }, 1200)
  }

  const steps = [
    { n: 1, label: 'Especialidade' },
    { n: 2, label: 'Profissional' },
    { n: 3, label: 'Data e hora' },
    { n: 4, label: 'Confirmação' },
  ]

  if (confirmed) {
    return (
      <div style={{ maxWidth: 440, margin: '32px auto', textAlign: 'center', padding: isMobile ? '0' : '0 16px' }}>
        <div style={{ width: 60, height: 60, background: '#f0fdf4', border: '2px solid #16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <Check size={26} color="#16a34a" />
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1E2330', marginBottom: 8 }}>Consulta confirmada.</h2>
        <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.6, marginBottom: 24 }}>
          Sua consulta com <strong>{selectedDoctorData?.name}</strong> foi agendada para agosto de 2026, dia {selectedDay}, às {selectedTime}.
        </p>
        <div style={{ background: '#fff', border: '1px solid #D9DCE3', borderRadius: 10, padding: '14px 18px', textAlign: 'left', marginBottom: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 16px', fontSize: 13 }}>
            {[
              ['Profissional', selectedDoctorData?.name],
              ['Especialidade', selectedSpecialtyData?.label],
              ['Data', `${selectedDay}/08/2026`],
              ['Horário', selectedTime],
              ['Modalidade', selectedModality],
              ['Local', selectedModality === 'Presencial' ? selectedDoctorData?.unit : 'Videochamada'],
            ].map(([label, value]) => (
              <div key={label as string}>
                <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 2 }}>{label}</div>
                <div style={{ fontWeight: 600, color: '#1E2330' }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => navigate('dashboard')}
          style={{ width: '100%', padding: '13px', background: '#1D4ED8', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
        >
          Voltar ao início
        </button>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: isMobile ? '100%' : 680, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: isMobile ? 20 : 28 }}>
        {steps.map((s, i) => (
          <div key={s.n} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 'unset' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: isMobile ? 28 : 24, height: isMobile ? 28 : 24,
                borderRadius: '50%',
                background: step > s.n ? '#1D4ED8' : step === s.n ? '#1D4ED8' : '#e5e7eb',
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
              <h2 style={{ fontSize: 16, fontWeight: 600, color: '#1E2330', marginBottom: 4 }}>Qual especialidade você procura?</h2>
              <p style={{ fontSize: 13, color: '#6B7280' }}>Selecione uma especialidade para ver os profissionais disponíveis.</p>
            </div>
          )}
          <div style={{ position: 'relative', marginBottom: 14 }}>
            <Search size={14} color="#9CA3AF" style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="search"
              value={specialtySearch}
              onChange={(e) => setSpecialtySearch(e.target.value)}
              placeholder="Buscar especialidade..."
              style={{ width: '100%', padding: isMobile ? '12px 12px 12px 34px' : '9px 12px 9px 32px', border: '1px solid #D9DCE3', borderRadius: 8, fontSize: isMobile ? 15 : 13, color: '#1E2330', background: '#fff', outline: 'none', fontFamily: 'inherit' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filteredSpecialties.map((s) => (
              <button
                key={s.id}
                onClick={() => { setSelectedSpecialty(s.id); setStep(2) }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: isMobile ? '14px 16px' : '12px 14px', background: '#fff', border: `1px solid ${selectedSpecialty === s.id ? '#1D4ED8' : '#D9DCE3'}`, borderRadius: 9, cursor: 'pointer', textAlign: 'left' }}
              >
                <div>
                  <div style={{ fontSize: isMobile ? 15 : 13, fontWeight: 600, color: '#1E2330' }}>{s.label}</div>
                  <div style={{ fontSize: isMobile ? 13 : 12, color: '#6B7280', marginTop: 2 }}>{s.description}</div>
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
              <h2 style={{ fontSize: 16, fontWeight: 600, color: '#1E2330', marginBottom: 4 }}>Escolha um profissional</h2>
              <p style={{ fontSize: 13, color: '#6B7280' }}>Profissionais disponíveis em <strong>{selectedSpecialtyData?.label}</strong>.</p>
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {availableDoctors.map((doc) => {
              if (!doc) return null
              return (
                <button
                  key={doc.id}
                  onClick={() => { setSelectedDoctor(doc.id); setStep(3) }}
                  disabled={doc.status === 'inactive'}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: isMobile ? '14px' : '14px 16px', background: doc.status === 'inactive' ? '#f9fafb' : '#fff', border: `1px solid ${selectedDoctor === doc.id ? '#1D4ED8' : '#D9DCE3'}`, borderRadius: 10, cursor: doc.status === 'inactive' ? 'not-allowed' : 'pointer', textAlign: 'left', opacity: doc.status === 'inactive' ? 0.5 : 1 }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: '#1D4ED8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                    {doc.name.split(' ').filter((w) => /^[A-Z]/.test(w) && w.length > 2).slice(0, 2).map((w) => w[0]).join('')}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: isMobile ? 15 : 14, fontWeight: 700, color: '#1E2330', marginBottom: 2 }}>{doc.name}</div>
                    <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 8 }}>{doc.specialty} · {doc.crm}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px', marginBottom: 8 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#6B7280' }}>
                        <MapPin size={11} />{doc.unit}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#6B7280' }}>
                        <Calendar size={11} />{doc.nextAvailable}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: 5 }}>
                      {doc.modalities.map((m) => (
                        <span key={m} style={{ fontSize: 10, fontWeight: 600, padding: '2px 7px', background: '#eff6ff', color: '#1d4ed8', borderRadius: 4 }}>{m}</span>
                      ))}
                    </div>
                  </div>
                </button>
              )
            })}
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
              <p style={{ fontSize: 13, color: '#6B7280' }}>Consulta com <strong>{selectedDoctorData?.name}</strong></p>
            </div>
          )}

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Modalidade</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {(['Presencial', 'Teleconsulta'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedModality(m)}
                  style={{ display: 'flex', alignItems: 'center', gap: 7, padding: isMobile ? '11px 16px' : '8px 14px', border: `1px solid ${selectedModality === m ? '#1D4ED8' : '#D9DCE3'}`, background: selectedModality === m ? '#eff6ff' : '#fff', color: selectedModality === m ? '#1D4ED8' : '#374151', borderRadius: 8, fontSize: 13, fontWeight: selectedModality === m ? 600 : 400, cursor: 'pointer' }}
                >
                  {m === 'Teleconsulta' ? <Video size={14} /> : <MapPin size={14} />} {m}
                </button>
              ))}
            </div>
          </div>

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
              <div style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Resumo da consulta</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', fontSize: 13 }}>
              {[
                ['Profissional', selectedDoctorData?.name],
                ['Especialidade', selectedSpecialtyData?.label],
                ['Data', `${selectedDay}/08/2026`],
                ['Horário', selectedTime],
                ['Modalidade', selectedModality],
                ['Local', selectedModality === 'Presencial' ? selectedDoctorData?.unit : 'Videochamada'],
              ].map(([label, value], i) => (
                <div key={label as string} style={{ padding: '12px 16px', borderBottom: i < 4 ? '1px solid #F3F4F6' : 'none', borderRight: i % 2 === 0 ? '1px solid #F3F4F6' : 'none' }}>
                  <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 3 }}>{label}</div>
                  <div style={{ fontWeight: 600, color: '#1E2330' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: '10px 14px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, marginBottom: 16, fontSize: 12, color: '#92400e' }}>
            Você receberá uma confirmação por e-mail. Lembre-se de trazer documentos pessoais.
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
              {confirming ? <><Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> Confirmando...</> : 'Confirmar consulta'}
            </button>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
