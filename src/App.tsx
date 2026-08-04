import { useState } from 'react'
import { patients } from './data/mock'
import type { Role } from './data/mock'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import PatientDashboard from './pages/PatientDashboard'
import SchedulePage from './pages/SchedulePage'
import TelemedicinePage from './pages/TelemedicinePage'
import ProfessionalDashboard from './pages/ProfessionalDashboard'
import MedicalRecordPage from './pages/MedicalRecordPage'
import AdminDashboard from './pages/AdminDashboard'
import DesignSystemPage from './pages/DesignSystemPage'
import PatientRegistrationPage from './pages/PatientRegistrationPage'
import ExamsPage from './pages/ExamsPage'
import AgendaPage from './pages/AgendaPage'
import RecordsListPage from './pages/RecordsListPage'
import ProfessionalRegistrationPage from './pages/ProfessionalRegistrationPage'
import UnitsPage from './pages/UnitsPage'

interface NavState {
  page: string
  params?: Record<string, unknown>
}

const pageTitles: Record<string, string> = {
  dashboard: 'Visão geral',
  appointments: 'Minhas consultas',
  schedule: 'Agendar consulta',
  agenda: 'Agenda',
  telemedicine: 'Telemedicina',
  record: 'Meu prontuário',
  'medical-record': 'Prontuário do paciente',
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
  beds: 'Gestão de leitos',
  reports: 'Relatórios',
  settings: 'Configurações',
  'design-system': 'Design System',
}

const breadcrumbs: Record<string, string[]> = {
  schedule: ['Consultas', 'Agendar'],
  telemedicine: ['Telemedicina', 'Consulta ativa'],
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [role, setRole] = useState<Role>('patient')
  const [nav, setNav] = useState<NavState>({ page: 'dashboard' })

  const navigate = (page: string, params?: Record<string, unknown>) => {
    setNav({ page, params })
  }

  const handleLogin = (r: Role) => {
    setRole(r)
    setIsLoggedIn(true)
    setNav({ page: 'dashboard' })
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setNav({ page: 'dashboard' })
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />
  }

  const currentPage = nav.page
  const pageTitle = pageTitles[currentPage] ?? currentPage
  const breadcrumb = currentPage === 'medical-record'
    ? ['Prontuários', patients.find((p) => p.id === ((nav.params?.patientId as string) ?? 'p004'))?.name ?? '']
    : breadcrumbs[currentPage]

  const renderPage = () => {
    if (role === 'patient') {
      switch (currentPage) {
        case 'dashboard':
          return <PatientDashboard navigate={navigate} />
        case 'appointments':
          return <PatientDashboard navigate={navigate} />
        case 'schedule':
          return <SchedulePage navigate={navigate} />
        case 'telemedicine':
          return <TelemedicinePage navigate={navigate} role={role} />
        case 'record':
          return <MedicalRecordPage navigate={navigate} patientId="p001" />
        case 'exams':
          return <ExamsPage navigate={navigate} />
        case 'design-system':
          return <DesignSystemPage />
        default:
          return (
            <EmptyPage
              title={pageTitle}
              message={`A seção "${pageTitle}" está em desenvolvimento.`}
              navigate={navigate}
            />
          )
      }
    }

    if (role === 'professional') {
      switch (currentPage) {
        case 'dashboard':
          return <ProfessionalDashboard navigate={navigate} />
        case 'patients':
          return <RecordsListPage navigate={navigate} title="Pacientes" subtitle="Selecione um paciente para visualizar o prontuário." />
        case 'agenda':
          return <AgendaPage navigate={navigate} />
        case 'register-patient':
          return <PatientRegistrationPage navigate={navigate} />
        case 'telemedicine':
          return <TelemedicinePage navigate={navigate} role={role} />
        case 'records':
          return <RecordsListPage navigate={navigate} />
        case 'medical-record':
          return <MedicalRecordPage navigate={navigate} patientId={nav.params?.patientId as string ?? 'p004'} backTo="records" />
        case 'design-system':
          return <DesignSystemPage />
        default:
          return (
            <EmptyPage
              title={pageTitle}
              message={`A seção "${pageTitle}" está em desenvolvimento.`}
              navigate={navigate}
            />
          )
      }
    }

    switch (currentPage) {
      case 'dashboard':
      case 'beds':
      case 'professionals':
        return <AdminDashboard navigate={navigate} />
      case 'patients':
        return <RecordsListPage navigate={navigate} title="Pacientes" subtitle="Gerencie os cadastros de pacientes da rede." />
      case 'medical-record':
        return <MedicalRecordPage navigate={navigate} patientId={nav.params?.patientId as string ?? 'p004'} backTo="patients" />
      case 'register-patient':
        return <PatientRegistrationPage navigate={navigate} />
      case 'register-professional':
        return <ProfessionalRegistrationPage navigate={navigate} />
      case 'units':
        return <UnitsPage navigate={navigate} />
      case 'design-system':
        return <DesignSystemPage />
      default:
        return (
          <EmptyPage
            title={pageTitle}
            message={`A seção "${pageTitle}" está em desenvolvimento.`}
            navigate={navigate}
          />
        )
    }
  }

  const extraNav = (
    <div />
  )

  return (
    <>
      <Layout
        role={role}
        currentPage={currentPage}
        navigate={navigate}
        onLogout={handleLogout}
        pageTitle={pageTitle}
        breadcrumb={breadcrumb}
      >
        {renderPage()}
        <div style={{ marginTop: 32, paddingTop: 16, borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={() => navigate('design-system')}
            style={{ fontSize: 11, color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer', display: currentPage === 'design-system' ? 'none' : 'block' }}
          >
            Design System
          </button>
        </div>
      </Layout>
    </>
  )
}

function EmptyPage({ title, message, navigate }: { title: string; message: string; navigate: (p: string) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 300, gap: 12 }}>
      <div style={{ fontSize: 13, fontWeight: 500, color: '#9CA3AF' }}>{message}</div>
      <button
        onClick={() => navigate('dashboard')}
        style={{ fontSize: 12, color: '#1D4ED8', background: 'none', border: 'none', cursor: 'pointer' }}
      >
        ← Voltar ao início
      </button>
    </div>
  )
}
