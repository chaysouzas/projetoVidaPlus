export type AppStatus =
  | 'confirmed'
  | 'scheduled'
  | 'in-progress'
  | 'completed'
  | 'cancelled'
  | 'pending'
  | 'waiting'

export type Role = 'patient' | 'professional' | 'admin'

export interface Patient {
  id: string
  patientId: string
  name: string
  age: number
  dob: string
  gender: 'M' | 'F'
  bloodType: string
  allergies: string[]
  phone: string
  email: string
  lastVisit: string
  nextVisit: string | null
  status: 'active' | 'waiting' | 'inactive'
  conditions: string[]
  medications: string[]
}

export interface Doctor {
  id: string
  name: string
  specialty: string
  crm: string
  unit: string
  modalities: string[]
  nextAvailable: string
  status: 'active' | 'inactive'
  lastAccess: string
}

export interface Appointment {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  date: string
  time: string
  type: 'Presencial' | 'Teleconsulta'
  unit: string | null
  specialty: string
  status: AppStatus
  notes?: string
}

export interface Exam {
  id: string
  patientId: string
  name: string
  date: string
  status: 'pending' | 'completed' | 'available'
  result: string | null
  requestedBy: string
}

export interface Prescription {
  id: string
  patientId: string
  medication: string
  dosage: string
  frequency: string
  issuedBy: string
  issuedDate: string
  notes?: string
}

export interface ClinicalNote {
  id: string
  patientId: string
  date: string
  author: string
  text: string
}

export interface Bed {
  id: string
  number: string
  ward: string
  status: 'available' | 'occupied' | 'maintenance' | 'reserved'
  patientName?: string
  since?: string
}

export interface Unit {
  id: string
  name: string
  address: string
  phone: string
  status: 'active' | 'inactive'
}

export const units: Unit[] = [
  { id: 'u01', name: 'Unidade Centro', address: 'Rua das Flores, 123 - Centro', phone: '(11) 3200-1000', status: 'active' },
  { id: 'u02', name: 'Unidade Norte', address: 'Av. Norte, 450 - Zona Norte', phone: '(11) 3200-2000', status: 'active' },
  { id: 'u03', name: 'Unidade Sul', address: 'Av. Sul, 780 - Zona Sul', phone: '(11) 3200-3000', status: 'active' },
]

export const patients: Patient[] = [
  {
    id: 'p001',
    patientId: 'VP-0001',
    name: 'Beatriz Andrade',
    age: 35,
    dob: '12/05/1991',
    gender: 'F',
    bloodType: 'O+',
    allergies: ['Penicilina'],
    phone: '(11) 99234-5678',
    email: 'beatriz.andrade@email.com',
    lastVisit: '14/06/2026',
    nextVisit: '18/08/2026',
    status: 'active',
    conditions: ['Arritmia supraventricular leve'],
    medications: ['Metoprolol 50mg 1x/dia'],
  },
  {
    id: 'p002',
    patientId: 'VP-0002',
    name: 'Ricardo Nogueira',
    age: 62,
    dob: '01/07/1964',
    gender: 'M',
    bloodType: 'A-',
    allergies: [],
    phone: '(11) 98765-4321',
    email: 'ricardo.nogueira@email.com',
    lastVisit: '10/07/2026',
    nextVisit: '20/08/2026',
    status: 'active',
    conditions: ['Lombalgia crônica'],
    medications: ['Ibuprofeno 400mg quando necessário'],
  },
  {
    id: 'p003',
    patientId: 'VP-0003',
    name: 'Camila Duarte',
    age: 41,
    dob: '22/03/1985',
    gender: 'F',
    bloodType: 'B+',
    allergies: ['Dipirona'],
    phone: '(11) 97654-3210',
    email: 'camila.duarte@email.com',
    lastVisit: '28/05/2026',
    nextVisit: null,
    status: 'active',
    conditions: ['Ansiedade generalizada'],
    medications: ['Escitalopram 10mg 1x/dia'],
  },
  {
    id: 'p004',
    patientId: 'VP-0004',
    name: 'Eduardo Martins',
    age: 53,
    dob: '29/05/1973',
    gender: 'M',
    bloodType: 'AB+',
    allergies: ['Látex'],
    phone: '(11) 96543-2109',
    email: 'eduardo.martins@email.com',
    lastVisit: '15/07/2026',
    nextVisit: '15/08/2026',
    status: 'active',
    conditions: ['Arritmia supraventricular', 'Dermatite seborreica'],
    medications: ['Metoprolol 50mg 1x/dia', 'Cetoconazol shampoo 2x/semana'],
  },
  {
    id: 'p005',
    patientId: 'VP-0005',
    name: 'Patrícia Lopes',
    age: 48,
    dob: '21/10/1978',
    gender: 'F',
    bloodType: 'O-',
    allergies: [],
    phone: '(11) 95432-1098',
    email: 'patricia.lopes@email.com',
    lastVisit: '30/06/2026',
    nextVisit: '05/09/2026',
    status: 'active',
    conditions: ['Hipertensão arterial leve'],
    medications: ['Losartana 50mg 1x/dia'],
  },
  {
    id: 'p006',
    patientId: 'VP-0006',
    name: 'Marcos Vieira',
    age: 67,
    dob: '06/06/1959',
    gender: 'M',
    bloodType: 'A+',
    allergies: ['Aspirina'],
    phone: '(11) 94321-0987',
    email: 'marcos.vieira@email.com',
    lastVisit: '20/07/2026',
    nextVisit: null,
    status: 'waiting',
    conditions: ['Diabetes tipo 2', 'Artrose joelho direito'],
    medications: ['Metformina 850mg 2x/dia', 'Paracetamol 750mg quando necessário'],
  },
  {
    id: 'p007',
    patientId: 'VP-0007',
    name: 'Juliana Rocha',
    age: 44,
    dob: '17/09/1982',
    gender: 'F',
    bloodType: 'O+',
    allergies: [],
    phone: '(11) 93210-9876',
    email: 'juliana.rocha@email.com',
    lastVisit: '12/04/2026',
    nextVisit: '25/08/2026',
    status: 'active',
    conditions: [],
    medications: [],
  },
  {
    id: 'p008',
    patientId: 'VP-0008',
    name: 'Rafael Souza',
    age: 28,
    dob: '10/04/1998',
    gender: 'M',
    bloodType: 'B-',
    allergies: ['Ibuprofeno'],
    phone: '(11) 92109-8765',
    email: 'rafael.souza@email.com',
    lastVisit: '28/07/2026',
    nextVisit: '28/08/2026',
    status: 'active',
    conditions: ['Rinite alérgica'],
    medications: ['Loratadina 10mg 1x/dia'],
  },
]

export const doctors: Doctor[] = [
  {
    id: 'd01',
    name: 'Dr. Rodrigo Almeida',
    specialty: 'Cardiologia',
    crm: 'CRM 12345/SP',
    unit: 'Unidade Centro',
    modalities: ['Presencial', 'Telemedicina'],
    nextAvailable: 'Amanhã, 08:00',
    status: 'active',
    lastAccess: 'Hoje às 08:42',
  },
  {
    id: 'd02',
    name: 'Dra. Fernanda Costa',
    specialty: 'Dermatologia',
    crm: 'CRM 67890/SP',
    unit: 'Unidade Norte',
    modalities: ['Presencial', 'Telemedicina'],
    nextAvailable: 'Hoje, 16:00',
    status: 'active',
    lastAccess: 'Hoje às 07:55',
  },
  {
    id: 'd03',
    name: 'Dr. Marcelo Teixeira',
    specialty: 'Clínica Geral',
    crm: 'CRM 11111/SP',
    unit: 'Unidade Centro',
    modalities: ['Presencial'],
    nextAvailable: 'Em 3 dias',
    status: 'active',
    lastAccess: 'Ontem às 17:30',
  },
  {
    id: 'd04',
    name: 'Dr. Paulo Ribeiro',
    specialty: 'Ortopedia',
    crm: 'CRM 22222/SP',
    unit: 'Unidade Sul',
    modalities: ['Presencial'],
    nextAvailable: 'Em 5 dias',
    status: 'active',
    lastAccess: 'Hoje às 09:15',
  },
  {
    id: 'd05',
    name: 'Dr. Gustavo Cardoso',
    specialty: 'Neurologia',
    crm: 'CRM 33333/SP',
    unit: 'Unidade Centro',
    modalities: ['Presencial', 'Telemedicina'],
    nextAvailable: 'Em 2 dias',
    status: 'inactive',
    lastAccess: '25/07/2026 às 14:20',
  },
]

export const appointments: Appointment[] = [
  {
    id: 'a001',
    patientId: 'p001',
    patientName: 'Beatriz Andrade',
    doctorId: 'd01',
    doctorName: 'Dr. Rodrigo Almeida',
    date: '18/08/2026',
    time: '14:30',
    type: 'Presencial',
    unit: 'Unidade Centro',
    specialty: 'Cardiologia',
    status: 'confirmed',
  },
  {
    id: 'a002',
    patientId: 'p001',
    patientName: 'Beatriz Andrade',
    doctorId: 'd02',
    doctorName: 'Dra. Fernanda Costa',
    date: '10/09/2026',
    time: '10:00',
    type: 'Presencial',
    unit: 'Unidade Norte',
    specialty: 'Dermatologia',
    status: 'scheduled',
  },
  {
    id: 'a003',
    patientId: 'p001',
    patientName: 'Beatriz Andrade',
    doctorId: 'd03',
    doctorName: 'Dr. Marcelo Teixeira',
    date: '05/10/2026',
    time: '09:00',
    type: 'Teleconsulta',
    unit: null,
    specialty: 'Clínica Geral',
    status: 'scheduled',
  },
  {
    id: 'a004',
    patientId: 'p001',
    patientName: 'Beatriz Andrade',
    doctorId: 'd01',
    doctorName: 'Dr. Rodrigo Almeida',
    date: '14/06/2026',
    time: '14:00',
    type: 'Presencial',
    unit: 'Unidade Centro',
    specialty: 'Cardiologia',
    status: 'completed',
    notes: 'Paciente sem queixas. ECG normal. Manter metoprolol. Retorno em 60 dias.',
  },
  {
    id: 'a005',
    patientId: 'p001',
    patientName: 'Beatriz Andrade',
    doctorId: 'd03',
    doctorName: 'Dr. Marcelo Teixeira',
    date: '20/03/2026',
    time: '09:30',
    type: 'Presencial',
    unit: 'Unidade Centro',
    specialty: 'Clínica Geral',
    status: 'completed',
    notes: 'Queixa de cansaço. Solicitado hemograma. Resultado normal.',
  },
  {
    id: 'a006',
    patientId: 'p001',
    patientName: 'Beatriz Andrade',
    doctorId: 'd03',
    doctorName: 'Dr. Marcelo Teixeira',
    date: '05/01/2026',
    time: '11:00',
    type: 'Presencial',
    unit: 'Unidade Centro',
    specialty: 'Clínica Geral',
    status: 'completed',
    notes: 'Consulta de rotina anual. Sem alterações relevantes.',
  },
  {
    id: 'a007',
    patientId: 'p002',
    patientName: 'Ricardo Nogueira',
    doctorId: 'd02',
    doctorName: 'Dra. Fernanda Costa',
    date: '30/07/2026',
    time: '08:00',
    type: 'Presencial',
    unit: 'Unidade Norte',
    specialty: 'Dermatologia',
    status: 'completed',
  },
  {
    id: 'a008',
    patientId: 'p003',
    patientName: 'Camila Duarte',
    doctorId: 'd02',
    doctorName: 'Dra. Fernanda Costa',
    date: '30/07/2026',
    time: '09:00',
    type: 'Presencial',
    unit: 'Unidade Norte',
    specialty: 'Dermatologia',
    status: 'completed',
  },
  {
    id: 'a009',
    patientId: 'p004',
    patientName: 'Eduardo Martins',
    doctorId: 'd02',
    doctorName: 'Dra. Fernanda Costa',
    date: '30/07/2026',
    time: '10:30',
    type: 'Teleconsulta',
    unit: null,
    specialty: 'Dermatologia',
    status: 'in-progress',
  },
  {
    id: 'a010',
    patientId: 'p005',
    patientName: 'Patrícia Lopes',
    doctorId: 'd02',
    doctorName: 'Dra. Fernanda Costa',
    date: '30/07/2026',
    time: '14:00',
    type: 'Presencial',
    unit: 'Unidade Norte',
    specialty: 'Dermatologia',
    status: 'scheduled',
  },
]

export const exams: Exam[] = [
  {
    id: 'e001',
    patientId: 'p001',
    name: 'Eletrocardiograma',
    date: '14/06/2026',
    status: 'available',
    result: 'Ritmo sinusal normal. Sem alterações significativas.',
    requestedBy: 'Dr. Rodrigo Almeida',
  },
  {
    id: 'e002',
    patientId: 'p001',
    name: 'Hemograma completo',
    date: '20/03/2026',
    status: 'available',
    result: 'Dentro dos parâmetros normais.',
    requestedBy: 'Dr. Marcelo Teixeira',
  },
  {
    id: 'e003',
    patientId: 'p001',
    name: 'Ecocardiograma',
    date: '18/08/2026',
    status: 'pending',
    result: null,
    requestedBy: 'Dr. Rodrigo Almeida',
  },
  {
    id: 'e004',
    patientId: 'p004',
    name: 'Eletrocardiograma',
    date: '15/07/2026',
    status: 'available',
    result: 'Normal. Sem extrassistolia no momento.',
    requestedBy: 'Dra. Fernanda Costa',
  },
  {
    id: 'e005',
    patientId: 'p004',
    name: 'Hemograma completo',
    date: '15/07/2026',
    status: 'available',
    result: 'Dentro dos parâmetros normais. Ferritina levemente elevada.',
    requestedBy: 'Dra. Fernanda Costa',
  },
  {
    id: 'e006',
    patientId: 'p004',
    name: 'Holter 24h',
    date: '29/05/2026',
    status: 'available',
    result: 'Leve extrassistolia supraventricular. Sem episódios sustentados.',
    requestedBy: 'Dr. Rodrigo Almeida',
  },
]

export const prescriptions: Prescription[] = [
  {
    id: 'rx001',
    patientId: 'p001',
    medication: 'Metoprolol',
    dosage: '50mg',
    frequency: '1 comprimido ao dia, pela manhã',
    issuedBy: 'Dr. Rodrigo Almeida',
    issuedDate: '14/06/2026',
  },
  {
    id: 'rx002',
    patientId: 'p004',
    medication: 'Metoprolol',
    dosage: '50mg',
    frequency: '1 comprimido ao dia, pela manhã',
    issuedBy: 'Dr. Rodrigo Almeida',
    issuedDate: '29/05/2026',
  },
  {
    id: 'rx003',
    patientId: 'p004',
    medication: 'Cetoconazol shampoo 2%',
    dosage: 'Uso externo',
    frequency: '2x por semana, deixar agir por 5 minutos',
    issuedBy: 'Dra. Fernanda Costa',
    issuedDate: '15/07/2026',
  },
]

export const clinicalNotes: ClinicalNote[] = [
  {
    id: 'n001',
    patientId: 'p004',
    date: '15/07/2026',
    author: 'Dra. Fernanda Costa',
    text: 'Paciente com queixa de prurido e descamação no couro cabeludo há 3 semanas. Sem febre. Ao exame, placas eritematosas com escamas amareladas na região frontoparietal. Compatível com dermatite seborreica. Prescrito cetoconazol shampoo 2%. Retorno em 30 dias.',
  },
]

export const beds: Bed[] = [
  { id: 'b01', number: '101', ward: 'Clínica Médica', status: 'available' },
  { id: 'b02', number: '102', ward: 'Clínica Médica', status: 'occupied', patientName: 'Ricardo Nogueira', since: '28/07/2026' },
  { id: 'b03', number: '103', ward: 'Clínica Médica', status: 'maintenance' },
  { id: 'b04', number: '104', ward: 'Clínica Médica', status: 'reserved', patientName: 'Camila Duarte' },
  { id: 'b05', number: '105', ward: 'Clínica Médica', status: 'available' },
  { id: 'b06', number: '106', ward: 'Clínica Médica', status: 'occupied', patientName: 'Patrícia Lopes', since: '27/07/2026' },
  { id: 'b07', number: '201', ward: 'UTI', status: 'available' },
  { id: 'b08', number: '202', ward: 'UTI', status: 'available' },
  { id: 'b09', number: '203', ward: 'UTI', status: 'occupied', patientName: 'Marcos Vieira', since: '25/07/2026' },
  { id: 'b10', number: '204', ward: 'UTI', status: 'maintenance' },
  { id: 'b11', number: '205', ward: 'Ortopedia', status: 'reserved', patientName: 'Rafael Souza' },
  { id: 'b12', number: '206', ward: 'Ortopedia', status: 'available' },
  { id: 'b13', number: '301', ward: 'Ortopedia', status: 'occupied', patientName: 'Juliana Rocha', since: '29/07/2026' },
  { id: 'b14', number: '302', ward: 'Ortopedia', status: 'available' },
  { id: 'b15', number: '303', ward: 'Maternidade', status: 'available' },
  { id: 'b16', number: '304', ward: 'Maternidade', status: 'available' },
]
