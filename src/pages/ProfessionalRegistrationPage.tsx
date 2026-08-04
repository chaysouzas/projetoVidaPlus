import { useState } from 'react'
import { ChevronLeft, Check, Loader2, Stethoscope } from 'lucide-react'
import { doctors, units } from '../data/mock'
import type { Doctor } from '../data/mock'
import { useMobile } from '../hooks/useMobile'

interface Props {
  navigate: (page: string, params?: Record<string, unknown>) => void
}

const specialties = [
  'Cardiologia', 'Dermatologia', 'Clínica Geral', 'Neurologia', 'Ortopedia',
  'Pediatria', 'Ginecologia', 'Psiquiatria', 'Endocrinologia', 'Oftalmologia',
]

const emptyForm = {
  treatment: 'Dr.',
  name: '',
  specialty: '',
  crm: '',
  unit: '',
}

export default function ProfessionalRegistrationPage({ navigate }: Props) {
  const isMobile = useMobile()
  const [form, setForm] = useState(emptyForm)
  const [modalities, setModalities] = useState<string[]>(['Presencial'])
  const [saving, setSaving] = useState(false)
  const [registered, setRegistered] = useState<Doctor | null>(null)

  const isValid = Boolean(
    form.name.trim() && form.specialty && form.crm.trim() && form.unit && modalities.length > 0
  )

  const updateField = (field: keyof typeof emptyForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const toggleModality = (modality: string) => {
    setModalities((prev) => (prev.includes(modality) ? prev.filter((m) => m !== modality) : [...prev, modality]))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    setSaving(true)
    setTimeout(() => {
      const seq = doctors.length + 1
      const newDoctor: Doctor = {
        id: `d${String(seq).padStart(2, '0')}`,
        name: `${form.treatment} ${form.name.trim()}`,
        specialty: form.specialty,
        crm: form.crm.trim().toUpperCase().startsWith('CRM') ? form.crm.trim() : `CRM ${form.crm.trim()}`,
        unit: form.unit,
        modalities,
        nextAvailable: 'A definir',
        status: 'active',
        lastAccess: 'Nunca acessou',
      }
      doctors.push(newDoctor)
      setSaving(false)
      setRegistered(newDoctor)
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
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1E2330', marginBottom: 8 }}>Profissional cadastrado.</h2>
        <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.6, marginBottom: 24 }}>
          <strong>{registered.name}</strong> foi adicionado ao sistema · {registered.specialty} · {registered.crm}.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button
            onClick={() => navigate('professionals')}
            style={{ width: '100%', padding: '13px', background: '#1D4ED8', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
          >
            Ver profissionais
          </button>
          <button
            onClick={() => { setForm(emptyForm); setModalities(['Presencial']); setRegistered(null) }}
            style={{ width: '100%', padding: '13px', background: '#fff', color: '#374151', border: '1px solid #D9DCE3', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
          >
            Cadastrar outro profissional
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: isMobile ? '100%' : 680, margin: '0 auto' }}>
      {!isMobile && (
        <button
          onClick={() => navigate('professionals')}
          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6B7280', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 14, padding: 0 }}
        >
          <ChevronLeft size={14} /> Voltar
        </button>
      )}

      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <Stethoscope size={18} color="#1D4ED8" />
          <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1E2330' }}>Cadastrar profissional</h2>
        </div>
        <p style={{ fontSize: 13, color: '#6B7280' }}>Preencha os dados do profissional de saúde para criar o registro no sistema.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ background: '#fff', border: '1px solid #D9DCE3', borderRadius: 8, padding: isMobile ? 16 : 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 12 }}>
            Dados profissionais
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '90px 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={labelStyle}>Tratamento</label>
              <select value={form.treatment} onChange={(e) => updateField('treatment', e.target.value)} style={inputStyle}>
                <option value="Dr.">Dr.</option>
                <option value="Dra.">Dra.</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Nome completo *</label>
              <input required value={form.name} onChange={(e) => updateField('name', e.target.value)} placeholder="Nome do profissional" style={inputStyle} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={labelStyle}>Especialidade *</label>
              <select required value={form.specialty} onChange={(e) => updateField('specialty', e.target.value)} style={inputStyle}>
                <option value="">Selecione</option>
                {specialties.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>CRM *</label>
              <input required value={form.crm} onChange={(e) => updateField('crm', e.target.value)} placeholder="Ex: 44556/SP" style={inputStyle} />
            </div>
          </div>
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 12 }}>
            Local de atendimento
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={labelStyle}>Unidade *</label>
            <select required value={form.unit} onChange={(e) => updateField('unit', e.target.value)} style={inputStyle}>
              <option value="">Selecione</option>
              {units.map((u) => (
                <option key={u.id} value={u.name}>{u.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Modalidades de atendimento *</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {(['Presencial', 'Telemedicina'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => toggleModality(m)}
                  style={{ display: 'flex', alignItems: 'center', gap: 7, padding: isMobile ? '11px 16px' : '8px 14px', border: `1px solid ${modalities.includes(m) ? '#1D4ED8' : '#D9DCE3'}`, background: modalities.includes(m) ? '#eff6ff' : '#fff', color: modalities.includes(m) ? '#1D4ED8' : '#374151', borderRadius: 8, fontSize: 13, fontWeight: modalities.includes(m) ? 600 : 400, cursor: 'pointer' }}
                >
                  {modalities.includes(m) && <Check size={13} />} {m}
                </button>
              ))}
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
            'Cadastrar profissional'
          )}
        </button>
      </form>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
