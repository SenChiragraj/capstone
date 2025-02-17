import { PatientAppointmentComponent } from '../patient-appointment/patient-appointment.component'

export interface Appointment {
  id: number
  patient: {
    id: number
    name: string
    phone: number
    username: string
    email: string
    role: string
  }
  doctor: {
    id: number
    name: string
    phone: number
    username: string
    email: string
    role: string
    specialty: string
    availability: string
  }
  appointmentTime: string | null
  formattedTime? : string
  status: string
}

export interface Doctor {
  id: number
  name: string
  email: string
  speciality: string
  availabilty: string
  role: string
  medicalRecords: []
  specialty: string
  availability: 'Mon-Wed'
}

export interface MedicalRecord {
  id: number
  patient: {
    id: number
    name: string
    phone: number
    username: string
    email: string
    role: string
  }
  doctor: {
    id: number
    name: string
    phone: number
    username: string
    email: string
    role: string
    specialty: string
    availability: string
  }
  date: string | null
  details: string
}

export interface Patient{
  id: number
  name: string
  phone: number
  username: string
  email: string
  role: string
}