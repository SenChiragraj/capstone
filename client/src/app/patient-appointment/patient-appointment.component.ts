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

  appointments: any[] = [
    {
      doctor: 'Dr. Anil Kumar',
      specialty: 'Cardiologist',
      date: '2025-02-15',
      time: '10:00 AM',
      location: 'Apollo Mumbai'
    },
    {
      doctor: 'Dr. Priya Sharma',
      specialty: 'Dermatologist',
      date: '2025-02-18',
      time: '2:00 PM',
      location: 'Apollo Delhi'
    }
  ]

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

  rescheduleAppointment (appointmentId: number): void {
    console.log('Rescheduling appointment with ID:', appointmentId)
    // Implement your reschedule logic here
  }
}
