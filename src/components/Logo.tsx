import { Activity } from 'lucide-react'

interface Props {
  size?: number
  textSize?: number
  onDark?: boolean
  tagline?: string
}

export default function Logo({ size = 28, textSize = 15, onDark = false, tagline }: Props) {
  const textColor = onDark ? '#fff' : '#1E2330'
  const accentColor = onDark ? 'rgba(255,255,255,0.7)' : '#1D4ED8'
  const taglineColor = onDark ? 'rgba(255,255,255,0.5)' : '#6B7280'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: size < 32 ? 7 : 10 }}>
      <div
        style={{
          width: size,
          height: size,
          background: onDark ? 'rgba(255,255,255,0.15)' : '#1D4ED8',
          border: onDark ? '1px solid rgba(255,255,255,0.2)' : 'none',
          borderRadius: Math.round(size * 0.25),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Activity size={Math.round(size * 0.55)} color="#fff" strokeWidth={2.25} />
      </div>
      <div>
        <div style={{ fontSize: textSize, fontWeight: 700, color: textColor, letterSpacing: '-0.02em', lineHeight: 1 }}>
          Vida <span style={{ color: accentColor }}>Plus</span>
        </div>
        {tagline && (
          <div style={{ fontSize: 10, color: taglineColor, letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1.4, marginTop: 2 }}>
            {tagline}
          </div>
        )}
      </div>
    </div>
  )
}
