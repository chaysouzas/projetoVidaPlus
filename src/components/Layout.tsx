import { useState } from 'react'
import {
  LayoutDashboard,
  Calendar,
  CalendarPlus,
  Video,
  FileText,
  FlaskConical,
  Pill,
  Bell,
  User,
  Users,
  Stethoscope,
  BedDouble,
  BarChart2,
  Settings,
  LogOut,
  Shield,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  UserPlus,
  Building2,
} from 'lucide-react'
import type { Role } from '../data/mock'
import { useMobile } from '../hooks/useMobile'
import Logo from './Logo'

type Page = string

interface NavItem {
  id: Page
  label: string
  icon: React.ReactNode
}

const patientNav: NavItem[] = [
  { id: 'dashboard', label: 'Visão geral', icon: <LayoutDashboard size={18} /> },
  { id: 'appointments', label: 'Minhas consultas', icon: <Calendar size={18} /> },
  { id: 'schedule', label: 'Agendar consulta', icon: <CalendarPlus size={18} /> },
  { id: 'telemedicine', label: 'Telemedicina', icon: <Video size={18} /> },
  { id: 'record', label: 'Meu prontuário', icon: <FileText size={18} /> },
  { id: 'exams', label: 'Exames', icon: <FlaskConical size={18} /> },
  { id: 'prescriptions', label: 'Receitas', icon: <Pill size={18} /> },
  { id: 'notifications', label: 'Notificações', icon: <Bell size={18} /> },
  { id: 'profile', label: 'Meu perfil', icon: <User size={18} /> },
]

const professionalNav: NavItem[] = [
  { id: 'dashboard', label: 'Visão geral', icon: <LayoutDashboard size={18} /> },
  { id: 'agenda', label: 'Agenda', icon: <Calendar size={18} /> },
  { id: 'patients', label: 'Pacientes', icon: <Users size={18} /> },
  { id: 'register-patient', label: 'Cadastrar paciente', icon: <UserPlus size={18} /> },
  { id: 'records', label: 'Prontuários', icon: <FileText size={18} /> },
  { id: 'prescriptions', label: 'Prescrições', icon: <Pill size={18} /> },
  { id: 'exams', label: 'Exames', icon: <FlaskConical size={18} /> },
  { id: 'telemedicine', label: 'Telemedicina', icon: <Video size={18} /> },
  { id: 'notifications', label: 'Notificações', icon: <Bell size={18} /> },
  { id: 'profile', label: 'Meu perfil', icon: <User size={18} /> },
]

const adminNav: NavItem[] = [
  { id: 'dashboard', label: 'Visão geral', icon: <LayoutDashboard size={18} /> },
  { id: 'patients', label: 'Pacientes', icon: <Users size={18} /> },
  { id: 'register-patient', label: 'Cadastrar paciente', icon: <UserPlus size={18} /> },
  { id: 'professionals', label: 'Profissionais', icon: <Stethoscope size={18} /> },
  { id: 'register-professional', label: 'Cadastrar profissional', icon: <UserPlus size={18} /> },
  { id: 'units', label: 'Unidades', icon: <Building2 size={18} /> },
  { id: 'hospitalizations', label: 'Internações', icon: <BedDouble size={18} /> },
  { id: 'beds', label: 'Leitos', icon: <BedDouble size={18} /> },
  { id: 'reports', label: 'Relatórios', icon: <BarChart2 size={18} /> },
  { id: 'settings', label: 'Configurações', icon: <Settings size={18} /> },
]

const patientBottomNav = [
  { id: 'dashboard', label: 'Início', icon: <LayoutDashboard size={20} /> },
  { id: 'appointments', label: 'Consultas', icon: <Calendar size={20} /> },
  { id: 'schedule', label: 'Agendar', icon: <CalendarPlus size={20} />, primary: true },
  { id: 'telemedicine', label: 'Telemed', icon: <Video size={20} /> },
]

const professionalBottomNav = [
  { id: 'dashboard', label: 'Início', icon: <LayoutDashboard size={20} /> },
  { id: 'agenda', label: 'Agenda', icon: <Calendar size={20} /> },
  { id: 'patients', label: 'Pacientes', icon: <Users size={20} /> },
  { id: 'telemedicine', label: 'Telemed', icon: <Video size={20} /> },
]

const adminBottomNav = [
  { id: 'dashboard', label: 'Início', icon: <LayoutDashboard size={20} /> },
  { id: 'patients', label: 'Pacientes', icon: <Users size={20} /> },
  { id: 'professionals', label: 'Profissionais', icon: <Stethoscope size={20} /> },
  { id: 'beds', label: 'Leitos', icon: <BedDouble size={20} /> },
]

function getNav(role: Role) {
  if (role === 'patient') return patientNav
  if (role === 'professional') return professionalNav
  return adminNav
}

function getBottomNav(role: Role) {
  if (role === 'patient') return patientBottomNav
  if (role === 'professional') return professionalBottomNav
  return adminBottomNav
}

function getUserInfo(role: Role) {
  if (role === 'patient') return { name: 'Beatriz Andrade', sub: 'Paciente · VP-0001', initials: 'BA' }
  if (role === 'professional') return { name: 'Dra. Fernanda Costa', sub: 'Dermatologia · CRM 67890/SP', initials: 'FC' }
  return { name: 'Vinícius Farias', sub: 'Administrador', initials: 'VF' }
}

const subPageTitles: Record<string, string> = {
  schedule: 'Agendar consulta',
  agenda: 'Agenda',
  telemedicine: 'Telemedicina',
  'medical-record': 'Prontuário',
  record: 'Meu prontuário',
  exams: 'Exames',
  prescriptions: 'Receitas',
  notifications: 'Notificações',
  profile: 'Meu perfil',
  patients: 'Pacientes',
  'register-patient': 'Cadastrar paciente',
  records: 'Prontuários',
  professionals: 'Profissionais',
  'register-professional': 'Cadastrar profissional',
  units: 'Unidades',
  hospitalizations: 'Internações',
  beds: 'Leitos',
  reports: 'Relatórios',
  settings: 'Configurações',
  'design-system': 'Design System',
  appointments: 'Minhas consultas',
}

interface Props {
  role: Role
  currentPage: Page
  navigate: (page: Page) => void
  onLogout: () => void
  pageTitle: string
  breadcrumb?: string[]
  children: React.ReactNode
}

export default function Layout({ role, currentPage, navigate, onLogout, pageTitle, breadcrumb, children }: Props) {
  const isMobile = useMobile()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const nav = getNav(role)
  const bottomNav = getBottomNav(role)
  const user = getUserInfo(role)

  const isSubPage = currentPage !== 'dashboard'
  const subPageTitle = subPageTitles[currentPage]

  const SidebarNav = ({ onItemClick }: { onItemClick?: () => void }) => (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
      {nav.map((item) => {
        const isActive = currentPage === item.id
        return (
          <li key={item.id}>
            <button
              onClick={() => { navigate(item.id); onItemClick?.() }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: '100%',
                padding: isMobile ? '13px 16px' : '7px 10px',
                borderRadius: 5,
                fontSize: isMobile ? 15 : 13,
                fontWeight: isActive ? 500 : 400,
                color: isActive ? '#1D4ED8' : '#374151',
                background: isActive ? '#eff6ff' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                borderLeft: isActive ? '2px solid #1D4ED8' : '2px solid transparent',
                marginLeft: -2,
                transition: 'background 0.1s',
              }}
            >
              <span style={{ color: isActive ? '#1D4ED8' : '#6B7280', display: 'flex', flexShrink: 0 }}>
                {item.icon}
              </span>
              {item.label}
            </button>
          </li>
        )
      })}
    </ul>
  )

  if (isMobile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', background: '#F6F7FB', overflow: 'hidden' }}>
        <header
          style={{
            height: 52,
            background: '#fff',
            borderBottom: '1px solid #D9DCE3',
            display: 'flex',
            alignItems: 'center',
            paddingInline: 16,
            gap: 10,
            flexShrink: 0,
            position: 'sticky',
            top: 0,
            zIndex: 30,
          }}
        >
          {isSubPage && currentPage !== 'telemedicine' ? (
            <button
              onClick={() => navigate('dashboard')}
              style={{ display: 'flex', padding: 8, color: '#374151', border: 'none', background: 'transparent', cursor: 'pointer', marginLeft: -8 }}
              aria-label="Voltar"
            >
              <ChevronLeft size={20} />
            </button>
          ) : (
            <Logo size={26} textSize={15} />
          )}

          <div style={{ flex: 1, minWidth: 0 }}>
            {isSubPage && subPageTitle && (
              <div style={{ fontSize: 15, fontWeight: 600, color: '#1E2330', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {subPageTitle}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <button
              style={{ position: 'relative', padding: 8, color: '#6B7280', border: 'none', background: 'transparent', cursor: 'pointer', borderRadius: 8 }}
              aria-label="Notificações"
            >
              <Bell size={18} />
              <span style={{ position: 'absolute', top: 6, right: 6, width: 7, height: 7, background: '#DC2626', borderRadius: '50%', border: '1.5px solid #fff' }} />
            </button>
            <button
              onClick={() => setDrawerOpen(true)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 8, background: '#1D4ED8', border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600, color: '#fff' }}
              aria-label="Menu"
            >
              {user.initials}
            </button>
          </div>
        </header>

        <main
          style={{
            flex: 1,
            overflow: 'auto',
            padding: '16px 16px',
            paddingBottom: currentPage === 'telemedicine' ? 16 : 80,
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {children}
        </main>

        {currentPage !== 'telemedicine' && (
          <nav
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              height: 62,
              background: '#fff',
              borderTop: '1px solid #D9DCE3',
              display: 'flex',
              alignItems: 'stretch',
              zIndex: 40,
              paddingBottom: 'env(safe-area-inset-bottom, 0px)',
            }}
          >
            {bottomNav.map((item) => {
              const isActive = currentPage === item.id
              const isPrimary = 'primary' in item && item.primary
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 3,
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    color: isActive ? '#1D4ED8' : '#9CA3AF',
                    fontSize: 10,
                    fontWeight: isActive ? 600 : 400,
                    padding: '6px 4px',
                    transition: 'color 0.15s',
                    position: 'relative',
                  }}
                >
                  {isPrimary ? (
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        background: isActive ? '#1e40af' : '#1D4ED8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        marginBottom: -4,
                        boxShadow: '0 2px 8px rgba(29,78,216,0.35)',
                      }}
                    >
                      {item.icon}
                    </div>
                  ) : (
                    <div style={{ display: 'flex' }}>{item.icon}</div>
                  )}
                  <span>{item.label}</span>
                  {isActive && !isPrimary && (
                    <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 20, height: 2, background: '#1D4ED8', borderRadius: 1 }} />
                  )}
                </button>
              )
            })}

            <button
              onClick={() => setDrawerOpen(true)}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                color: '#9CA3AF',
                fontSize: 10,
                fontWeight: 400,
                padding: '6px 4px',
              }}
            >
              <Menu size={20} />
              <span>Mais</span>
            </button>
          </nav>
        )}

        {drawerOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'flex', flexDirection: 'column' }}>
            <div
              style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }}
              onClick={() => setDrawerOpen(false)}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: '#fff',
                borderRadius: '16px 16px 0 0',
                maxHeight: '85dvh',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              <div style={{ padding: '12px 20px 0', flexShrink: 0 }}>
                <div style={{ width: 32, height: 4, background: '#D9DCE3', borderRadius: 2, margin: '0 auto 14px' }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 14, borderBottom: '1px solid #e5e7eb' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: '#1D4ED8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>
                      {user.initials}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#1E2330' }}>{user.name}</div>
                      <div style={{ fontSize: 11, color: '#6B7280' }}>{user.sub}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setDrawerOpen(false)}
                    style={{ padding: 8, border: 'none', background: '#f3f4f6', borderRadius: 8, cursor: 'pointer', display: 'flex' }}
                  >
                    <X size={16} color="#6B7280" />
                  </button>
                </div>
              </div>

              <div style={{ flex: 1, overflow: 'auto', padding: '8px 16px' }}>
                <SidebarNav onItemClick={() => setDrawerOpen(false)} />
              </div>

              <div style={{ padding: '12px 16px', borderTop: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 10px', background: '#f9fafb', borderRadius: 8 }}>
                  <Shield size={12} color="#6B7280" />
                  <div>
                    <div style={{ fontSize: 11, color: '#6B7280' }}>Conexão segura · Dados protegidos</div>
                    <div style={{ fontSize: 10, color: '#9CA3AF' }}>Último acesso: hoje às 08:42</div>
                  </div>
                </div>
                <button
                  onClick={() => { setDrawerOpen(false); onLogout() }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    width: '100%',
                    padding: '12px',
                    background: '#fff',
                    border: '1px solid #D9DCE3',
                    borderRadius: 8,
                    fontSize: 14,
                    color: '#374151',
                    cursor: 'pointer',
                    fontWeight: 500,
                  }}
                >
                  <LogOut size={15} />
                  Sair da conta
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#F6F7FB' }}>
      <aside style={{ width: 240, flexShrink: 0, background: '#fff', borderRight: '1px solid #D9DCE3', display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid #D9DCE3' }}>
          <Logo size={28} textSize={15} tagline="Sistema de Saúde" />
        </div>

        <nav style={{ flex: 1, overflow: 'auto', padding: '12px 14px' }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0 6px 8px' }}>
            {role === 'patient' ? 'Área do Paciente' : role === 'professional' ? 'Área do Profissional' : 'Administração'}
          </div>
          <SidebarNav />
        </nav>

        <div style={{ margin: '0 12px 8px', padding: '8px 10px', background: '#f9fafb', borderRadius: 5, border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Shield size={11} color="#6B7280" />
            <span style={{ fontSize: 11, color: '#6B7280' }}>Conexão segura</span>
          </div>
          <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 2 }}>Último acesso: hoje às 08:42</div>
        </div>

        <div style={{ borderTop: '1px solid #D9DCE3', padding: '10px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: 6, background: '#1D4ED8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: '#fff', flexShrink: 0 }}>
              {user.initials}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#1E2330', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</div>
              <div style={{ fontSize: 10, color: '#6B7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.sub}</div>
            </div>
            <button onClick={onLogout} style={{ display: 'flex', padding: 5, color: '#9CA3AF', border: 'none', background: 'transparent', cursor: 'pointer', borderRadius: 4 }} title="Sair">
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
        <header style={{ height: 56, background: '#fff', borderBottom: '1px solid #D9DCE3', display: 'flex', alignItems: 'center', paddingInline: 24, gap: 12, flexShrink: 0 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            {breadcrumb && breadcrumb.length > 1 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#9CA3AF', marginBottom: 1 }}>
                {breadcrumb.map((crumb, i) => (
                  <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {i > 0 && <ChevronRight size={10} />}
                    <span style={{ color: i === breadcrumb.length - 1 ? '#6B7280' : '#9CA3AF' }}>{crumb}</span>
                  </span>
                ))}
              </div>
            )}
            <h1 style={{ fontSize: 15, fontWeight: 600, color: '#1E2330', lineHeight: 1 }}>{pageTitle}</h1>
          </div>
          <button style={{ position: 'relative', padding: 7, color: '#6B7280', border: 'none', background: 'transparent', cursor: 'pointer', borderRadius: 5 }} title="Notificações">
            <Bell size={16} />
            <span style={{ position: 'absolute', top: 5, right: 5, width: 7, height: 7, background: '#DC2626', borderRadius: '50%', border: '1.5px solid #fff' }} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: '#1D4ED8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: '#fff' }}>
              {user.initials}
            </div>
            <span style={{ fontSize: 12, fontWeight: 500, color: '#1E2330' }}>{user.name.split(' ')[0]}</span>
          </div>
        </header>

        <main style={{ flex: 1, overflow: 'auto', padding: 24 }}>
          {children}
        </main>
      </div>
    </div>
  )
}
