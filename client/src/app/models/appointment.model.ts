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
  status: string
}

export interface Doctor {
  id: number
  name: string
  email: string
  speciality: string
  availabilty: string
}
