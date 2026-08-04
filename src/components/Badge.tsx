import type { AppStatus } from '../data/mock'

const config: Record<
  AppStatus | string,
  { label: string; bg: string; text: string; dot: string }
> = {
  confirmed: { label: 'Confirmada', bg: '#f0fdf4', text: '#15803d', dot: '#16a34a' },
  scheduled: { label: 'Agendada', bg: '#eff6ff', text: '#1d4ed8', dot: '#2563eb' },
  'in-progress': { label: 'Em atendimento', bg: '#fffbeb', text: '#b45309', dot: '#d97706' },
  completed: { label: 'Concluída', bg: '#f9fafb', text: '#4b5563', dot: '#9ca3af' },
  cancelled: { label: 'Cancelada', bg: '#FDECEC', text: '#b91c1c', dot: '#dc2626' },
  pending: { label: 'Pendente', bg: '#fff7ed', text: '#c2410c', dot: '#ea580c' },
  waiting: { label: 'Em espera', bg: '#fefce8', text: '#a16207', dot: '#ca8a04' },
  available: { label: 'Disponível', bg: '#f0fdf4', text: '#15803d', dot: '#16a34a' },
  active: { label: 'Ativo', bg: '#f0fdf4', text: '#15803d', dot: '#16a34a' },
  inactive: { label: 'Inativo', bg: '#f9fafb', text: '#4b5563', dot: '#9ca3af' },
}

interface Props {
  status: string
  label?: string
  size?: 'sm' | 'md'
}

export default function Badge({ status, label, size = 'sm' }: Props) {
  const cfg = config[status] ?? { label: status, bg: '#f9fafb', text: '#4b5563', dot: '#9ca3af' }
  const displayLabel = label ?? cfg.label
  const padding = size === 'md' ? '3px 10px' : '2px 8px'
  const fontSize = size === 'md' ? '12px' : '11px'

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        backgroundColor: cfg.bg,
        color: cfg.text,
        padding,
        borderRadius: 4,
        fontSize,
        fontWeight: 500,
        lineHeight: '16px',
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: '50%',
          backgroundColor: cfg.dot,
          flexShrink: 0,
        }}
      />
      {displayLabel}
    </span>
  )
}
