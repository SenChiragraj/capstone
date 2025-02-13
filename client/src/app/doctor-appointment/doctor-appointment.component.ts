import { Component, OnInit } from '@angular/core'
import { HttpService } from '../../services/http.service'
import { Appointment } from '../models/appointment.model'
import { MedicalRecord } from '../models/medical-record'

@Component({
  selector: 'app-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.scss']
})
export class DoctorAppointmentComponent implements OnInit {
  appointments: Appointment[] = []
  errorMessage: string = ''
  doctorId!: number

  constructor (private httpService: HttpService) {}

  ngOnInit (): void {
    const userIdString = localStorage.getItem('userId')
    this.doctorId = userIdString ? parseInt(userIdString, 10) : 0
    this.getAppointmentsByDocId()
  }
  getAppointmentsByDocId (): void {
    this.httpService.getAppointmentByDoctor(this.doctorId).subscribe({
      next: data => (this.appointments = data),
      error: () => console.error('Error fetching appointments:')
    })
  }
}
