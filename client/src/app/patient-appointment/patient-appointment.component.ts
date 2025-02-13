import { Component, OnInit } from '@angular/core'
import { HttpService } from '../../services/http.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-patient-appointment',
  templateUrl: './patient-appointment.component.html',
  styleUrls: ['./patient-appointment.component.scss']
})
export class PatientAppointmentComponent implements OnInit {
  appointmentForm!: FormGroup

  constructor (
    private httpService: HttpService,
    private formBuilder: FormBuilder
  ) {}

  appointments: any[] = []

  ngOnInit (): void {
    this.appointmentForm = this.formBuilder.group({
      patientId: ['']
    })
    this.fetchAppointments()
  }

  fetchAppointments (): void {
    const userIdString = localStorage.getItem('userId')
    const userId = userIdString ? parseInt(userIdString, 10) : 0

    this.httpService.getAppointmentByPatient(userId).subscribe(
      data => {
        this.appointments = data
        console.log(this.appointments)
      },
      error => {
        console.error('Error fetching appointments', error)
      }
    )
  }

  cancelAppointment (id: number) {
    this.httpService.deleteByAppointmentId(id).subscribe({
      next: () => {
        console.log('Deleted Appointment')
      },
      error: () => {}
    })
    this.fetchAppointments()
  }

  rescheduleAppointment (appointmentId: number): void {
    console.log('Rescheduling appointment with ID:', appointmentId)
    // Implement your reschedule logic here
  }
}
