import { useState } from 'react'
import { Building2, MapPin, Phone, Stethoscope, ChevronLeft, Check, Loader2, Plus } from 'lucide-react'
import Badge from '../components/Badge'
import { units, doctors } from '../data/mock'
import type { Unit } from '../data/mock'
import { useMobile } from '../hooks/useMobile'

interface Props {
  navigate: (page: string) => void
}

const emptyForm = {
  name: '',
  address: '',
  phone: '',
}

export default function UnitsPage({ navigate }: Props) {
  const isMobile = useMobile()
  const [mode, setMode] = useState<'list' | 'register'>('list')
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [registered, setRegistered] = useState<Unit | null>(null)

  const isValid = Boolean(form.name.trim() && form.address.trim() && form.phone.trim())

  const updateField = (field: keyof typeof emptyForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const startRegister = () => {
    setMode('register')
    setForm(emptyForm)
    setRegistered(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    setSaving(true)
    setTimeout(() => {
      const seq = units.length + 1
      const newUnit: Unit = {
        id: `u${String(seq).padStart(2, '0')}`,
        name: form.name.trim(),
        address: form.address.trim(),
        phone: form.phone.trim(),
        status: 'active',
      }
      units.push(newUnit)
      setSaving(false)
      setRegistered(newUnit)
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

  if (mode === 'register' && registered) {
    return (
      <div style={{ maxWidth: 440, margin: '32px auto', textAlign: 'center', padding: isMobile ? '0' : '0 16px' }}>
        <div style={{ width: 60, height: 60, background: '#f0fdf4', border: '2px solid #16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <Check size={26} color="#16a34a" />
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1E2330', marginBottom: 8 }}>Unidade cadastrada.</h2>
        <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.6, marginBottom: 24 }}>
          <strong>{registered.name}</strong> foi adicionada ao sistema.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button
            onClick={() => setMode('list')}
            style={{ width: '100%', padding: '13px', background: '#1D4ED8', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
          >
            Ver unidades
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

  if (mode === 'register') {
    return (
      <div style={{ maxWidth: isMobile ? '100%' : 560, margin: '0 auto' }}>
        {!isMobile && (
          <button
            onClick={() => setMode('list')}
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6B7280', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 14, padding: 0 }}
          >
            <ChevronLeft size={14} /> Voltar
          </button>
        )}

        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <Building2 size={18} color="#1D4ED8" />
            <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1E2330' }}>Cadastrar unidade</h2>
          </div>
          <p style={{ fontSize: 13, color: '#6B7280' }}>Preencha os dados da nova unidade de atendimento.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ background: '#fff', border: '1px solid #D9DCE3', borderRadius: 8, padding: isMobile ? 16 : 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={labelStyle}>Nome da unidade *</label>
            <input required value={form.name} onChange={(e) => updateField('name', e.target.value)} placeholder="Ex: Unidade Leste" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Endereço *</label>
            <input required value={form.address} onChange={(e) => updateField('address', e.target.value)} placeholder="Rua, número - Bairro" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Telefone *</label>
            <input required value={form.phone} onChange={(e) => updateField('phone', e.target.value)} placeholder="(11) 3200-4000" style={inputStyle} />
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
              'Cadastrar unidade'
            )}
          </button>
        </form>

        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: isMobile ? '100%' : 860, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: isMobile ? 'stretch' : 'center', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', gap: 12, marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1E2330', marginBottom: 2 }}>Unidades</h2>
          <p style={{ fontSize: 13, color: '#6B7280' }}>Gerencie as unidades de atendimento da rede.</p>
        </div>
        <button
          onClick={startRegister}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: isMobile ? '12px 16px' : '9px 16px', background: '#1D4ED8', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}
        >
          <Plus size={15} /> Cadastrar unidade
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
        {units.map((unit) => {
          const staffCount = doctors.filter((d) => d.unit === unit.name).length
          return (
            <div key={unit.id} style={{ background: '#fff', border: '1px solid #D9DCE3', borderRadius: 8, padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Building2 size={17} color="#1D4ED8" />
                </div>
                <Badge status={unit.status} />
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#1E2330', marginBottom: 8 }}>{unit.name}</div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: 12, color: '#6B7280', marginBottom: 5 }}>
                <MapPin size={12} style={{ marginTop: 2, flexShrink: 0 }} />
                <span>{unit.address}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6B7280', marginBottom: 5 }}>
                <Phone size={12} style={{ flexShrink: 0 }} />
                <span>{unit.phone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6B7280', paddingTop: 8, marginTop: 4, borderTop: '1px solid #F3F4F6' }}>
                <Stethoscope size={12} style={{ flexShrink: 0 }} />
                <span>{staffCount} {staffCount !== 1 ? 'profissionais vinculados' : 'profissional vinculado'}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
