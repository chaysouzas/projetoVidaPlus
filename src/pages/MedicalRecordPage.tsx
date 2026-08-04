import { useState } from 'react'
import { ChevronLeft, AlertTriangle, FileText, Download, Save, Loader2 } from 'lucide-react'
import Badge from '../components/Badge'
import { useMobile } from '../hooks/useMobile'
import { patients, appointments, exams, prescriptions, clinicalNotes } from '../data/mock'

interface Props {
  navigate: (page: string) => void
  patientId?: string
  backTo?: string
}

export default function MedicalRecordPage({ navigate, patientId = 'p004', backTo = 'dashboard' }: Props) {
  const isMobile = useMobile()
  const [activeTab, setActiveTab] = useState('summary')
  const [notes, setNotes] = useState('')
  const [notesFocus, setNotesFocus] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const patient = patients.find((p) => p.id === patientId) ?? patients[3]
  const patientAppts = appointments.filter((a) => a.patientId === patientId)
  const patientExams = exams.filter((e) => e.patientId === patientId)
  const patientPrescriptions = prescriptions.filter((r) => r.patientId === patientId)
  const patientNotes = clinicalNotes.filter((n) => n.patientId === patientId).slice().reverse()

  const tabs = [
    { id: 'summary', label: 'Resumo' },
    { id: 'history', label: 'Histórico' },
    { id: 'exams', label: 'Exames' },
    { id: 'prescriptions', label: 'Prescrições' },
    { id: 'notes', label: 'Anotações' },
  ]

  const handleSave = () => {
    if (!notes.trim()) return
    setSaving(true)
    setSaved(false)
    setTimeout(() => {
      clinicalNotes.push({
        id: `n${String(clinicalNotes.length + 1).padStart(3, '0')}`,
        patientId,
        date: new Date().toLocaleDateString('pt-BR'),
        author: 'Dra. Fernanda Costa',
        text: notes.trim(),
      })
      setNotes('')
      setSaving(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    }, 900)
  }

  return (
    <div style={{ maxWidth: isMobile ? '100%' : 860, margin: '0 auto' }}>
      {!isMobile && (
        <button
          onClick={() => navigate(backTo)}
          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6B7280', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 14, padding: 0 }}
        >
          <ChevronLeft size={14} /> Voltar
        </button>
      )}

      <div style={{ background: '#fff', border: '1px solid #D9DCE3', borderRadius: 8, padding: isMobile ? '18px 14px' : '16px 20px', marginBottom: 0, borderBottom: 'none', borderRadius: '8px 8px 0 0' }}>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'center' : 'flex-start', gap: isMobile ? 10 : 12, textAlign: isMobile ? 'center' : 'left' }}>
          <div style={{ width: isMobile ? 52 : 44, height: isMobile ? 52 : 44, borderRadius: 12, background: '#1D4ED8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? 17 : 16, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
            {patient.name.split(' ').slice(0, 2).map((w) => w[0]).join('')}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-start', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
              <h2 style={{ fontSize: isMobile ? 16 : 17, fontWeight: 700, color: '#1E2330', margin: 0 }}>{patient.name}</h2>
              <span style={{ fontSize: 11, color: '#9CA3AF', background: '#f3f4f6', padding: '2px 7px', borderRadius: 4 }}>{patient.patientId}</span>
              <Badge status={patient.status} />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-start', gap: '3px 14px', fontSize: 12, color: '#6B7280' }}>
              <span>{patient.age} anos</span>
              <span>{patient.gender === 'F' ? 'Feminino' : 'Masculino'}</span>
              {!isMobile && <span>Nasc. {patient.dob}</span>}
              <span>Tipo sanguíneo: <strong style={{ color: '#1E2330' }}>{patient.bloodType}</strong></span>
            </div>
            {patient.allergies.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-start', gap: 5, marginTop: 6 }}>
                <AlertTriangle size={12} color="#b91c1c" />
                <span style={{ fontSize: 12, color: '#b91c1c', fontWeight: 500 }}>
                  Alergia: {patient.allergies.join(', ')}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          background: '#fff',
          borderLeft: '1px solid #D9DCE3',
          borderRight: '1px solid #D9DCE3',
          borderBottom: '1px solid #D9DCE3',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: isMobile ? '12px 16px' : '11px 18px',
              fontSize: isMobile ? 13 : 13,
              fontWeight: activeTab === tab.id ? 600 : 400,
              color: activeTab === tab.id ? '#1D4ED8' : '#6B7280',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid #1D4ED8' : '2px solid transparent',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ background: '#fff', border: '1px solid #D9DCE3', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: isMobile ? '16px' : '20px' }}>

        {activeTab === 'summary' && (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 20 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>Condições relevantes</div>
              {patient.conditions.length > 0 ? (
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {patient.conditions.map((c) => (
                    <li key={c} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#374151', padding: '8px 10px', background: '#f9fafb', borderRadius: 6, border: '1px solid #e5e7eb' }}>
                      <span style={{ width: 5, height: 5, background: '#1D4ED8', borderRadius: '50%', flexShrink: 0 }} />
                      {c}
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ fontSize: 13, color: '#9CA3AF' }}>Nenhuma condição registrada.</p>
              )}

              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>Alergias</div>
                {patient.allergies.length > 0 ? (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {patient.allergies.map((a) => (
                      <span key={a} style={{ fontSize: 12, fontWeight: 600, padding: '5px 10px', background: '#FDECEC', color: '#b91c1c', borderRadius: 6, border: '1px solid #fca5a5' }}>{a}</span>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: 13, color: '#9CA3AF' }}>Nenhuma alergia registrada.</p>
                )}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>Medicamentos atuais</div>
              {patient.medications.length > 0 ? (
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {patient.medications.map((m) => (
                    <li key={m} style={{ fontSize: 13, color: '#374151', padding: '8px 10px', background: '#f9fafb', borderRadius: 6, border: '1px solid #e5e7eb', lineHeight: 1.4 }}>{m}</li>
                  ))}
                </ul>
              ) : (
                <p style={{ fontSize: 13, color: '#9CA3AF' }}>Nenhum medicamento em uso.</p>
              )}

              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>Últimos atendimentos</div>
                {patientAppts.filter((a) => a.status === 'completed').slice(0, 3).map((a) => (
                  <div key={a.id} style={{ fontSize: 12, color: '#374151', padding: '7px 0', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.date} · {a.specialty}</span>
                    <span style={{ color: '#9CA3AF', flexShrink: 0 }}>{a.doctorName.split(' ').pop()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {patientAppts.filter((a) => !['scheduled', 'confirmed'].includes(a.status)).map((a, i, arr) => (
              <div key={a.id} style={{ display: 'flex', gap: 14, paddingBottom: i < arr.length - 1 ? 20 : 0, position: 'relative' }}>
                {i < arr.length - 1 && (
                  <div style={{ position: 'absolute', left: 15, top: 30, bottom: 0, width: 1, background: '#e5e7eb' }} />
                )}
                <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#eff6ff', border: '2px solid #1D4ED8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FileText size={12} color="#1D4ED8" />
                  </div>
                </div>
                <div style={{ flex: 1, paddingBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 5 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{a.date}</span>
                    <span style={{ fontSize: 12, color: '#6B7280' }}>{a.doctorName}</span>
                    {!isMobile && <span style={{ fontSize: 12, color: '#9CA3AF' }}>{a.specialty}</span>}
                    <Badge status={a.status} />
                  </div>
                  <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 4 }}>{a.type}{a.unit ? ` · ${a.unit}` : ''}</div>
                  {a.notes && (
                    <div style={{ fontSize: 12, color: '#374151', lineHeight: 1.6, background: '#f9fafb', padding: '8px 10px', borderRadius: 6, border: '1px solid #e5e7eb' }}>
                      {a.notes}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'exams' && (
          <div>
            {isMobile ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {patientExams.map((exam) => (
                  <div key={exam.id} style={{ border: '1px solid #D9DCE3', borderRadius: 8, padding: '12px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#1E2330' }}>{exam.name}</div>
                        <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 1 }}>{exam.date} · {exam.requestedBy.split(' ').pop()}</div>
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
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 2fr auto', padding: '0 0 8px', fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e5e7eb', gap: 12 }}>
                  <div>Exame</div><div>Data</div><div>Status</div><div>Resultado</div><div>Ação</div>
                </div>
                {patientExams.map((exam) => (
                  <div key={exam.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 2fr auto', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #F3F4F6', gap: 12, fontSize: 13 }}>
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
        )}

        {activeTab === 'prescriptions' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {patientPrescriptions.map((rx) => (
              <div key={rx.id} style={{ border: '1px solid #D9DCE3', borderRadius: 8, padding: '14px' }}>
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1E2330' }}>{rx.medication}</div>
                  <div style={{ fontSize: 13, color: '#6B7280', marginTop: 1 }}>{rx.dosage}</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr 1fr', gap: '8px 16px', fontSize: 12 }}>
                  <div>
                    <div style={{ color: '#9CA3AF', marginBottom: 2 }}>Posologia</div>
                    <div style={{ color: '#374151', lineHeight: 1.4 }}>{rx.frequency}</div>
                  </div>
                  <div>
                    <div style={{ color: '#9CA3AF', marginBottom: 2 }}>Emitido por</div>
                    <div style={{ color: '#374151' }}>{isMobile ? rx.issuedBy.split(' ').slice(-2).join(' ') : rx.issuedBy}</div>
                  </div>
                  <div>
                    <div style={{ color: '#9CA3AF', marginBottom: 2 }}>Data</div>
                    <div style={{ color: '#374151' }}>{rx.issuedDate}</div>
                  </div>
                </div>
              </div>
            ))}
            {patientPrescriptions.length === 0 && (
              <p style={{ fontSize: 13, color: '#9CA3AF', textAlign: 'center', padding: '20px 0' }}>Nenhuma prescrição registrada.</p>
            )}
          </div>
        )}

        {activeTab === 'notes' && (
          <div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 500, color: '#374151', marginBottom: 6, display: 'block' }}>
                Anotação clínica — {new Date().toLocaleDateString('pt-BR')}
              </label>
              <textarea
                value={notes}
                onChange={(e) => { setNotes(e.target.value); setSaved(false) }}
                onFocus={() => setNotesFocus(true)}
                onBlur={() => setNotesFocus(false)}
                placeholder="Registre observações, evolução clínica, orientações ao paciente..."
                rows={isMobile ? 5 : 7}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1px solid ${notesFocus ? '#1D4ED8' : '#D9DCE3'}`,
                  borderRadius: 7,
                  fontSize: 14,
                  color: '#1E2330',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  lineHeight: 1.6,
                  resize: 'vertical',
                  outline: 'none',
                  boxShadow: notesFocus ? '0 0 0 3px rgba(29,78,216,0.08)' : 'none',
                }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                onClick={handleSave}
                disabled={saving || !notes.trim()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: isMobile ? '12px 20px' : '9px 16px',
                  background: !notes.trim() ? '#93c5fd' : '#1D4ED8',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 7,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: !notes.trim() ? 'not-allowed' : 'pointer',
                  flex: isMobile ? 1 : 'unset',
                }}
              >
                {saving ? (
                  <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Salvando...</>
                ) : (
                  <><Save size={14} /> Salvar anotação</>
                )}
              </button>
              {saved && <span style={{ fontSize: 12, color: '#16a34a', fontWeight: 500 }}>✓ Salvo</span>}
            </div>

            <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
                Anotações anteriores
              </div>
              {patientNotes.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {patientNotes.map((note) => (
                    <div key={note.id} style={{ padding: '12px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 7, fontSize: 13, color: '#374151', lineHeight: 1.6 }}>
                      <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 6 }}>{note.date} · {note.author}</div>
                      <p style={{ margin: 0 }}>{note.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: 13, color: '#9CA3AF' }}>Nenhuma anotação registrada.</p>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
