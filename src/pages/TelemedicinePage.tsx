import { useState } from 'react'
import { Mic, MicOff, Video, VideoOff, Monitor, MessageSquare, MoreHorizontal, PhoneOff, Wifi, WifiOff, X, ChevronRight, User, FileText, Save, Loader2 } from 'lucide-react'
import type { Role } from '../data/mock'
import { clinicalNotes } from '../data/mock'
import { useMobile } from '../hooks/useMobile'

interface Props {
  navigate: (page: string) => void
  role: Role
}

interface InfoField {
  label: string
  value: string
  danger?: boolean
}

function getCallView(role: Role) {
  if (role === 'patient') {
    return {
      panelLabel: 'Profissional',
      patientId: 'p001',
      otherName: 'Dr. Marcelo Teixeira',
      otherInitials: 'MT',
      connectionLabel: 'Beatriz Andrade · Dr. Marcelo Teixeira · 16:00',
      gridFields: [
        { label: 'Especialidade', value: 'Clínica Geral' },
        { label: 'CRM', value: '11111/SP' },
      ] as InfoField[],
      fullFields: [
        { label: 'Unidade', value: 'Unidade Centro' },
        { label: 'Modalidade', value: 'Telemedicina' },
      ] as InfoField[],
      recordAction: { label: 'Ver meu prontuário', page: 'record' },
      chatSenderLabel: 'Dr. Teixeira',
      initialMessages: [
        { from: 'doctor', text: 'Olá, Beatriz. Como você está se sentindo hoje?', time: '15:59' },
        { from: 'patient', text: 'Oi, doutor! Estou bem, só queria confirmar os resultados dos meus exames.', time: '16:00' },
        { from: 'doctor', text: 'Claro, vamos revisar juntos agora.', time: '16:01' },
      ],
    }
  }

  return {
    panelLabel: 'Paciente',
    patientId: 'p004',
    otherName: 'Eduardo Martins',
    otherInitials: 'EM',
    connectionLabel: 'Eduardo Martins · Dra. Fernanda Costa · 10:30',
    gridFields: [
      { label: 'Idade', value: '53 anos' },
      { label: 'Tipo sanguíneo', value: 'AB+' },
    ] as InfoField[],
    fullFields: [
      { label: 'Alergias', value: 'Látex', danger: true },
      { label: 'Última consulta', value: '29/05/2026 · Dr. R. Almeida' },
    ] as InfoField[],
    recordAction: { label: 'Ver prontuário', page: 'medical-record' },
    chatSenderLabel: 'Dra. Costa',
    initialMessages: [
      { from: 'doctor', text: 'Olá, Eduardo. Pode me descrever os sintomas que está sentindo?', time: '10:31' },
      { from: 'patient', text: 'Tenho notado manchas vermelhas no couro cabeludo há cerca de 2 semanas.', time: '10:32' },
      { from: 'doctor', text: 'Entendido. Você tem usado algum produto novo no cabelo recentemente?', time: '10:33' },
    ],
  }
}

export default function TelemedicinePage({ navigate, role }: Props) {
  const isMobile = useMobile()
  const view = getCallView(role)
  const [micOn, setMicOn] = useState(true)
  const [camOn, setCamOn] = useState(true)
  const [connectionOk, setConnectionOk] = useState(true)
  const [activePanel, setActivePanel] = useState<'info' | 'chat' | 'notes'>('info')
  const [endModal, setEndModal] = useState(false)
  const [ended, setEnded] = useState(false)
  const [chatMsg, setChatMsg] = useState('')
  const [messages, setMessages] = useState(view.initialMessages)

  const sendMsg = () => {
    if (!chatMsg.trim()) return
    setMessages((prev) => [...prev, { from: 'patient', text: chatMsg, time: '10:3' + prev.length }])
    setChatMsg('')
  }

  if (ended) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
        <div style={{ textAlign: 'center', maxWidth: 320, margin: '0 auto' }}>
          <div style={{ width: 56, height: 56, background: '#f9fafb', border: '1px solid #D9DCE3', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <PhoneOff size={22} color="#6B7280" />
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1E2330', marginBottom: 8 }}>Consulta encerrada</h3>
          <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 24, lineHeight: 1.6 }}>
            A teleconsulta com {view.otherName} foi encerrada.<br />Duração: 14 minutos.
          </p>
          <button
            onClick={() => navigate('dashboard')}
            style={{ width: '100%', padding: '13px', background: '#1D4ED8', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
          >
            Voltar ao início
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ height: isMobile ? 'calc(100dvh - 52px)' : 'calc(100vh - 56px)', display: 'flex', flexDirection: 'column', gap: 0, overflow: 'hidden', margin: isMobile ? '-16px' : 0 }}>
      <div style={{ background: '#fff', borderBottom: '1px solid #D9DCE3', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => setConnectionOk(!connectionOk)}
            style={{
              display: 'flex', alignItems: 'center', gap: 5, padding: '4px 9px',
              background: connectionOk ? '#f0fdf4' : '#FDECEC',
              border: `1px solid ${connectionOk ? '#bbf7d0' : '#fca5a5'}`,
              borderRadius: 4, fontSize: 11, fontWeight: 500, color: connectionOk ? '#15803d' : '#b91c1c', cursor: 'pointer'
            }}
          >
            {connectionOk ? <Wifi size={11} /> : <WifiOff size={11} />}
            {connectionOk ? 'Conexão estável' : 'Conexão instável'}
          </button>
          {!isMobile && <span style={{ fontSize: 11, color: '#9CA3AF' }}>{view.connectionLabel}</span>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#DC2626', animation: 'pulse 2s infinite' }} />
          <span style={{ fontSize: 11, color: '#DC2626', fontWeight: 600 }}>AO VIVO</span>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: isMobile ? 'column' : 'row', overflow: 'hidden', minHeight: 0 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, minWidth: 0 }}>
          <div style={{ flex: 1, background: '#0f172a', position: 'relative', overflow: 'hidden', minHeight: isMobile ? 220 : 0 }}>
            {camOn ? (
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: isMobile ? 56 : 72, height: isMobile ? 56 : 72, borderRadius: '50%', background: '#1D4ED8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? 18 : 24, fontWeight: 700, color: '#fff', margin: '0 auto 10px', border: '2px solid rgba(255,255,255,0.15)' }}>
                    {view.otherInitials}
                  </div>
                  <div style={{ fontSize: isMobile ? 13 : 14, color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>{view.otherName}</div>
                  {!isMobile && <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>Câmera ativa — visualização simulada</div>}
                </div>
              </div>
            ) : (
              <div style={{ position: 'absolute', inset: 0, background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>
                  <VideoOff size={32} style={{ margin: '0 auto 8px', display: 'block' }} />
                  <div style={{ fontSize: 13 }}>Câmera desligada</div>
                </div>
              </div>
            )}

            <div style={{
              position: 'absolute', bottom: 10, right: 10,
              width: isMobile ? 72 : 120, height: isMobile ? 52 : 80,
              background: '#374151', borderRadius: 6, border: '1px solid rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'rgba(255,255,255,0.5)'
            }}>
              Você
            </div>

            {!micOn && (
              <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', alignItems: 'center', gap: 5, padding: '3px 8px', background: 'rgba(220,38,38,0.85)', borderRadius: 4, fontSize: 11, color: '#fff', fontWeight: 500 }}>
                <MicOff size={11} /> Mudo
              </div>
            )}
          </div>

          <div style={{
            background: '#fff', borderTop: '1px solid #D9DCE3',
            padding: isMobile ? '10px 12px' : '10px 16px',
            display: 'flex', alignItems: 'center',
            justifyContent: isMobile ? 'space-between' : 'center',
            gap: isMobile ? 6 : 8, flexShrink: 0,
          }}>
            <ControlBtn icon={micOn ? <Mic size={isMobile ? 18 : 16} /> : <MicOff size={isMobile ? 18 : 16} />} label={micOn ? 'Mic' : 'Mudo'} active={micOn} onClick={() => setMicOn(!micOn)} isMobile={isMobile} />
            <ControlBtn icon={camOn ? <Video size={isMobile ? 18 : 16} /> : <VideoOff size={isMobile ? 18 : 16} />} label={camOn ? 'Câmera' : 'Câm. off'} active={camOn} onClick={() => setCamOn(!camOn)} isMobile={isMobile} />
            {!isMobile && <ControlBtn icon={<Monitor size={16} />} label="Compartilhar" active={true} onClick={() => {}} isMobile={false} />}
            {isMobile && (
              <ControlBtn
                icon={<MessageSquare size={18} />}
                label="Chat"
                active={true}
                onClick={() => setActivePanel(activePanel === 'chat' ? 'info' : 'chat')}
                isMobile={true}
                highlight={activePanel !== 'chat'}
              />
            )}
            {!isMobile && <ControlBtn icon={<MessageSquare size={16} />} label="Chat" active={true} onClick={() => {}} isMobile={false} />}
            {!isMobile && <ControlBtn icon={<MoreHorizontal size={16} />} label="Mais" active={true} onClick={() => {}} isMobile={false} />}
            <div style={{ width: 1, height: 32, background: '#e5e7eb', margin: '0 4px' }} />
            <button
              onClick={() => setEndModal(true)}
              style={{
                display: 'flex', flexDirection: isMobile ? 'row' : 'column',
                alignItems: 'center', gap: isMobile ? 6 : 3,
                padding: isMobile ? '10px 16px' : '7px 14px',
                background: '#DC2626', border: 'none', borderRadius: 7,
                cursor: 'pointer', color: '#fff', fontSize: 12, fontWeight: 600,
              }}
            >
              <PhoneOff size={isMobile ? 18 : 15} />
              Encerrar
            </button>
          </div>
        </div>

        {isMobile ? (
          <div style={{ background: '#fff', borderTop: '1px solid #D9DCE3', display: 'flex', flexDirection: 'column', height: 220, flexShrink: 0 }}>
            <div style={{ display: 'flex', borderBottom: '1px solid #D9DCE3', flexShrink: 0 }}>
              <button
                onClick={() => setActivePanel('info')}
                style={{ flex: 1, padding: '10px', fontSize: 12, fontWeight: activePanel === 'info' ? 600 : 400, color: activePanel === 'info' ? '#1D4ED8' : '#9CA3AF', background: 'none', border: 'none', borderBottom: activePanel === 'info' ? '2px solid #1D4ED8' : '2px solid transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              >
                <User size={13} /> {view.panelLabel}
              </button>
              <button
                onClick={() => setActivePanel('chat')}
                style={{ flex: 1, padding: '10px', fontSize: 12, fontWeight: activePanel === 'chat' ? 600 : 400, color: activePanel === 'chat' ? '#1D4ED8' : '#9CA3AF', background: 'none', border: 'none', borderBottom: activePanel === 'chat' ? '2px solid #1D4ED8' : '2px solid transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              >
                <MessageSquare size={13} /> Chat
              </button>
              {role === 'professional' && (
                <button
                  onClick={() => setActivePanel('notes')}
                  style={{ flex: 1, padding: '10px', fontSize: 12, fontWeight: activePanel === 'notes' ? 600 : 400, color: activePanel === 'notes' ? '#1D4ED8' : '#9CA3AF', background: 'none', border: 'none', borderBottom: activePanel === 'notes' ? '2px solid #1D4ED8' : '2px solid transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                >
                  <FileText size={13} /> Prontuário
                </button>
              )}
            </div>

            {activePanel === 'info' && (
              <div style={{ flex: 1, overflow: 'auto', padding: '12px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px 12px', alignContent: 'start' }}>
                <div>
                  <div style={{ fontSize: 10, color: '#9CA3AF' }}>Nome</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#1E2330', marginTop: 1 }}>{view.otherName}</div>
                </div>
                {view.gridFields.map((field) => (
                  <div key={field.label}>
                    <div style={{ fontSize: 10, color: '#9CA3AF' }}>{field.label}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#1E2330', marginTop: 1 }}>{field.value}</div>
                  </div>
                ))}
                {view.fullFields.map((field) => (
                  <div key={field.label} style={{ gridColumn: '1 / -1' }}>
                    <div style={{ fontSize: 10, color: '#9CA3AF' }}>{field.label}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: field.danger ? '#DC2626' : '#374151', marginTop: 1 }}>{field.value}</div>
                  </div>
                ))}
              </div>
            )}

            {activePanel === 'chat' && (
              <>
                <div style={{ flex: 1, overflow: 'auto', padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {messages.map((msg, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.from === 'patient' ? 'flex-end' : 'flex-start' }}>
                      <div style={{ maxWidth: '80%', padding: '7px 10px', background: msg.from === 'patient' ? '#1D4ED8' : '#f3f4f6', color: msg.from === 'patient' ? '#fff' : '#374151', borderRadius: msg.from === 'patient' ? '8px 8px 2px 8px' : '8px 8px 8px 2px', fontSize: 12, lineHeight: 1.4 }}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '8px 12px', borderTop: '1px solid #D9DCE3', display: 'flex', gap: 6 }}>
                  <input
                    value={chatMsg}
                    onChange={(e) => setChatMsg(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMsg()}
                    placeholder="Mensagem..."
                    style={{ flex: 1, padding: '8px 10px', border: '1px solid #D9DCE3', borderRadius: 7, fontSize: 14, color: '#1E2330', outline: 'none', fontFamily: 'inherit' }}
                  />
                  <button onClick={sendMsg} style={{ padding: '8px 12px', background: '#1D4ED8', color: '#fff', border: 'none', borderRadius: 7, cursor: 'pointer', fontSize: 16 }}>→</button>
                </div>
              </>
            )}

            {activePanel === 'notes' && role === 'professional' && (
              <TelemedicineNotesPanel patientId={view.patientId} isMobile={isMobile} />
            )}
          </div>
        ) : (
          <div style={{ width: 280, flexShrink: 0, background: '#fff', borderLeft: '1px solid #D9DCE3', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid #D9DCE3' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>{view.panelLabel}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1E2330', marginBottom: 8 }}>{view.otherName}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 8px', fontSize: 12 }}>
                {view.gridFields.map((field) => (
                  <div key={field.label}>
                    <div style={{ color: '#9CA3AF', marginBottom: 1 }}>{field.label}</div>
                    <div style={{ fontWeight: 500, color: '#374151' }}>{field.value}</div>
                  </div>
                ))}
                {view.fullFields.map((field) => (
                  <div key={field.label} style={{ gridColumn: '1 / -1' }}>
                    <div style={{ color: '#9CA3AF', marginBottom: 1 }}>{field.label}</div>
                    <div style={{ fontWeight: field.danger ? 600 : 500, color: field.danger ? '#DC2626' : '#374151' }}>{field.value}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate(view.recordAction.page)} style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#1D4ED8', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                {view.recordAction.label} <ChevronRight size={12} />
              </button>
            </div>

            {role === 'professional' && (
              <div style={{ display: 'flex', borderBottom: '1px solid #D9DCE3', flexShrink: 0 }}>
                <button
                  onClick={() => setActivePanel('chat')}
                  style={{ flex: 1, padding: '9px', fontSize: 12, fontWeight: activePanel !== 'notes' ? 600 : 400, color: activePanel !== 'notes' ? '#1D4ED8' : '#9CA3AF', background: 'none', border: 'none', borderBottom: activePanel !== 'notes' ? '2px solid #1D4ED8' : '2px solid transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                >
                  <MessageSquare size={12} /> Chat
                </button>
                <button
                  onClick={() => setActivePanel('notes')}
                  style={{ flex: 1, padding: '9px', fontSize: 12, fontWeight: activePanel === 'notes' ? 600 : 400, color: activePanel === 'notes' ? '#1D4ED8' : '#9CA3AF', background: 'none', border: 'none', borderBottom: activePanel === 'notes' ? '2px solid #1D4ED8' : '2px solid transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                >
                  <FileText size={12} /> Prontuário
                </button>
              </div>
            )}

            {activePanel === 'notes' && role === 'professional' ? (
              <TelemedicineNotesPanel patientId={view.patientId} isMobile={false} />
            ) : (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                {role !== 'professional' && (
                  <div style={{ padding: '10px 16px', borderBottom: '1px solid #D9DCE3', fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Chat</div>
                )}
                <div style={{ flex: 1, overflow: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {messages.map((msg, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.from === 'patient' ? 'flex-end' : 'flex-start' }}>
                      <div style={{ maxWidth: '85%', padding: '7px 10px', background: msg.from === 'patient' ? '#1D4ED8' : '#f3f4f6', color: msg.from === 'patient' ? '#fff' : '#374151', borderRadius: msg.from === 'patient' ? '8px 8px 2px 8px' : '8px 8px 8px 2px', lineHeight: 1.5, fontSize: 12 }}>
                        {msg.text}
                      </div>
                      <span style={{ fontSize: 10, color: '#9CA3AF', marginTop: 2 }}>{msg.from === 'doctor' ? view.chatSenderLabel : 'Você'} · {msg.time}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '10px 12px', borderTop: '1px solid #D9DCE3', display: 'flex', gap: 6 }}>
                  <input
                    value={chatMsg}
                    onChange={(e) => setChatMsg(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMsg()}
                    placeholder="Escreva uma mensagem..."
                    style={{ flex: 1, padding: '7px 10px', border: '1px solid #D9DCE3', borderRadius: 5, fontSize: 12, color: '#1E2330', outline: 'none', fontFamily: 'inherit' }}
                  />
                  <button onClick={sendMsg} style={{ padding: '7px 10px', background: '#1D4ED8', color: '#fff', border: 'none', borderRadius: 5, cursor: 'pointer', fontSize: 14 }}>→</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {endModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: isMobile ? 'flex-end' : 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#fff', borderRadius: isMobile ? '16px 16px 0 0' : 8, padding: isMobile ? '20px 20px 32px' : 24, width: '100%', maxWidth: isMobile ? '100%' : 380 }}>
            {isMobile && <div style={{ width: 32, height: 4, background: '#D9DCE3', borderRadius: 2, margin: '0 auto 16px' }} />}
            <div style={{ fontSize: 15, fontWeight: 700, color: '#1E2330', marginBottom: 8 }}>Encerrar consulta?</div>
            <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 20, lineHeight: 1.5 }}>
              A chamada será encerrada para você e para o {view.panelLabel.toLowerCase()}. Esta ação não pode ser desfeita.
            </p>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 8 }}>
              <button onClick={() => setEndModal(false)} style={{ flex: 1, padding: isMobile ? '13px' : '9px 14px', background: '#fff', border: '1px solid #D9DCE3', borderRadius: 8, fontSize: 13, color: '#374151', cursor: 'pointer', fontWeight: 500 }}>
                Continuar consulta
              </button>
              <button onClick={() => { setEndModal(false); setEnded(true) }} style={{ flex: 1, padding: isMobile ? '13px' : '9px 14px', background: '#DC2626', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>
                Encerrar consulta
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </div>
  )
}

function TelemedicineNotesPanel({ patientId, isMobile }: { patientId: string; isMobile: boolean }) {
  const [text, setText] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    if (!text.trim()) return
    setSaving(true)
    setTimeout(() => {
      clinicalNotes.push({
        id: `n${String(clinicalNotes.length + 1).padStart(3, '0')}`,
        patientId,
        date: new Date().toLocaleDateString('pt-BR'),
        author: 'Dra. Fernanda Costa',
        text: text.trim(),
      })
      setText('')
      setSaving(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }, 800)
  }

  return (
    <div style={{ flex: 1, overflow: 'auto', padding: isMobile ? '12px 14px' : '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div>
        <label style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6, display: 'block' }}>
          Registrar no prontuário
        </label>
        <textarea
          value={text}
          onChange={(e) => { setText(e.target.value); setSaved(false) }}
          placeholder="Registre a evolução, sintomas relatados e conduta desta teleconsulta..."
          rows={isMobile ? 5 : 8}
          style={{ width: '100%', padding: '10px 12px', border: '1px solid #D9DCE3', borderRadius: 7, fontSize: 13, color: '#1E2330', fontFamily: 'inherit', lineHeight: 1.5, resize: 'vertical', outline: 'none' }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button
          onClick={handleSave}
          disabled={saving || !text.trim()}
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: !text.trim() ? '#93c5fd' : '#1D4ED8', color: '#fff', border: 'none', borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: !text.trim() ? 'not-allowed' : 'pointer' }}
        >
          {saving ? (
            <>
              <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} /> Salvando...
            </>
          ) : (
            <>
              <Save size={13} /> Salvar no prontuário
            </>
          )}
        </button>
        {saved && <span style={{ fontSize: 12, color: '#16a34a', fontWeight: 500 }}>✓ Salvo</span>}
      </div>
    </div>
  )
}

function ControlBtn({ icon, label, active, onClick, isMobile, highlight }: {
  icon: React.ReactNode; label: string; active: boolean; onClick: () => void; isMobile: boolean; highlight?: boolean
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isMobile ? 2 : 3,
        padding: isMobile ? '8px 10px' : '7px 12px',
        background: active ? '#f9fafb' : '#FDECEC',
        border: `1px solid ${active ? '#e5e7eb' : '#fca5a5'}`,
        borderRadius: 7, cursor: 'pointer',
        color: active ? '#374151' : '#DC2626',
        fontSize: isMobile ? 9 : 10, fontWeight: 500,
        position: 'relative', minWidth: isMobile ? 48 : 'unset',
      }}
    >
      {icon}
      {label}
      {highlight && (
        <span style={{ position: 'absolute', top: -3, right: -3, width: 7, height: 7, background: '#1D4ED8', borderRadius: '50%', border: '1.5px solid #fff' }} />
      )}
    </button>
  )
}
