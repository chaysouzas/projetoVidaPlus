import { useState } from 'react'
import { ChevronLeft, Check, Loader2, UserPlus } from 'lucide-react'
import { patients } from '../data/mock'
import type { Patient } from '../data/mock'
import { useMobile } from '../hooks/useMobile'

interface Props {
  navigate: (page: string, params?: Record<string, unknown>) => void
}

const bloodTypes = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']

const emptyForm = {
  name: '',
  dob: '',
  gender: '',
  bloodType: '',
  phone: '',
  email: '',
  allergies: '',
  conditions: '',
  medications: '',
}

function calculateAge(isoDate: string) {
  const dob = new Date(isoDate)
  const today = new Date()
  let age = today.getFullYear() - dob.getFullYear()
  const monthDiff = today.getMonth() - dob.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) age--
  return age
}

function formatDob(isoDate: string) {
  const [y, m, d] = isoDate.split('-')
  return `${d}/${m}/${y}`
}

function splitList(value: string) {
  return value.split(',').map((v) => v.trim()).filter(Boolean)
}

export default function PatientRegistrationPage({ navigate }: Props) {
  const isMobile = useMobile()
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [registered, setRegistered] = useState<Patient | null>(null)

  const isValid = Boolean(
    form.name.trim() && form.dob && form.gender && form.bloodType && form.phone.trim() && form.email.trim()
  )

  const updateField = (field: keyof typeof emptyForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    setSaving(true)
    setTimeout(() => {
      const seq = patients.length + 1
      const newPatient: Patient = {
        id: `p${String(seq).padStart(3, '0')}`,
        patientId: `VP-${String(seq).padStart(4, '0')}`,
        name: form.name.trim(),
        age: calculateAge(form.dob),
        dob: formatDob(form.dob),
        gender: form.gender as 'M' | 'F',
        bloodType: form.bloodType,
        allergies: splitList(form.allergies),
        phone: form.phone.trim(),
        email: form.email.trim(),
        lastVisit: new Date().toLocaleDateString('pt-BR'),
        nextVisit: null,
        status: 'active',
        conditions: splitList(form.conditions),
        medications: splitList(form.medications),
      }
      patients.push(newPatient)
      setSaving(false)
      setRegistered(newPatient)
    }, 900)
  }

  const inputStyle = {
    width: '100%',
    padding: isMobile ? '12px 14px' : '9px 12px',
    fontSize: isMobile ? 15 : 13,
    color: '#1E2330',
    background: '#fff',
    border: '1px solid #D9DCE3',
    borderRadius: 6,
    outline: 'none',
    fontFamily: 'inherit',
  } as const

  const labelStyle = { display: 'block', fontSize: 12, fontWeight: 500, color: '#374151', marginBottom: 5 } as const

  if (registered) {
    return (
      <div style={{ maxWidth: 440, margin: '32px auto', textAlign: 'center', padding: isMobile ? '0' : '0 16px' }}>
        <div style={{ width: 60, height: 60, background: '#f0fdf4', border: '2px solid #16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <Check size={26} color="#16a34a" />
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1E2330', marginBottom: 8 }}>Paciente cadastrado.</h2>
        <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.6, marginBottom: 24 }}>
          <strong>{registered.name}</strong> foi adicionado ao sistema com o identificador <strong>{registered.patientId}</strong>.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button
            onClick={() => navigate('medical-record', { patientId: registered.id })}
            style={{ width: '100%', padding: '13px', background: '#1D4ED8', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
          >
            Ver prontuário
          </button>
          <button
            onClick={() => { setForm(emptyForm); setRegistered(null) }}
            style={{ width: '100%', padding: '13px', background: '#fff', color: '#374151', border: '1px solid #D9DCE3', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
          >
            Cadastrar outro paciente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: isMobile ? '100%' : 680, margin: '0 auto' }}>
      {!isMobile && (
        <button
          onClick={() => navigate('dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6B7280', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 14, padding: 0 }}
        >
          <ChevronLeft size={14} /> Voltar
        </button>
      )}

      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <UserPlus size={18} color="#1D4ED8" />
          <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1E2330' }}>Cadastrar paciente</h2>
        </div>
        <p style={{ fontSize: 13, color: '#6B7280' }}>Preencha os dados do paciente para criar o registro no sistema.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ background: '#fff', border: '1px solid #D9DCE3', borderRadius: 8, padding: isMobile ? 16 : 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 12 }}>
            Dados pessoais
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={labelStyle}>Nome completo *</label>
              <input required value={form.name} onChange={(e) => updateField('name', e.target.value)} placeholder="Nome do paciente" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Data de nascimento *</label>
              <input required type="date" value={form.dob} onChange={(e) => updateField('dob', e.target.value)} style={inputStyle} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={labelStyle}>Gênero *</label>
              <select required value={form.gender} onChange={(e) => updateField('gender', e.target.value)} style={inputStyle}>
                <option value="">Selecione</option>
                <option value="F">Feminino</option>
                <option value="M">Masculino</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Tipo sanguíneo *</label>
              <select required value={form.bloodType} onChange={(e) => updateField('bloodType', e.target.value)} style={inputStyle}>
                <option value="">Selecione</option>
                {bloodTypes.map((bt) => (
                  <option key={bt} value={bt}>{bt}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 12 }}>
            Contato
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12 }}>
            <div>
              <label style={labelStyle}>Telefone *</label>
              <input required type="tel" value={form.phone} onChange={(e) => updateField('phone', e.target.value)} placeholder="(11) 99999-9999" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>E-mail *</label>
              <input required type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)} placeholder="paciente@email.com" style={inputStyle} />
            </div>
          </div>
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 12 }}>
            Informações médicas (opcional)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={labelStyle}>Alergias</label>
              <input value={form.allergies} onChange={(e) => updateField('allergies', e.target.value)} placeholder="Ex: Penicilina, Dipirona" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Condições pré-existentes</label>
              <input value={form.conditions} onChange={(e) => updateField('conditions', e.target.value)} placeholder="Ex: Hipertensão arterial" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Medicamentos em uso</label>
              <input value={form.medications} onChange={(e) => updateField('medications', e.target.value)} placeholder="Ex: Losartana 50mg 1x/dia" style={inputStyle} />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={!isValid || saving}
          style={{
            padding: isMobile ? '13px' : '10px',
            background: !isValid || saving ? '#93c5fd' : '#1D4ED8',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontSize: isMobile ? 14 : 13,
            fontWeight: 700,
            cursor: !isValid || saving ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          {saving ? (
            <>
              <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> Cadastrando...
            </>
          ) : (
            'Cadastrar paciente'
          )}
        </button>
      </form>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
