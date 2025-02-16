import { Component, OnInit } from '@angular/core'
import { HttpService } from '../../services/http.service'
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-patient-appointment',
  templateUrl: './patient-appointment.component.html',
  styleUrls: ['./patient-appointment.component.scss'],
  providers: [DatePipe]
})
export class PatientAppointmentComponent implements OnInit {
  // No need for appointmentForm if it's not used
  // appointmentForm!: FormGroup

  constructor(
    private httpService: HttpService,
    public datePipe: DatePipe
  ) { }

  appointments: any[] = []

  ngOnInit(): void {
    this.fetchAppointments()
  }

  fetchAppointments(): void {
    const userIdString = localStorage.getItem('userId')
    const userId = userIdString ? parseInt(userIdString, 10) : 0

    this.httpService.getAppointmentByPatient(userId).subscribe({
      next: (response: any[]) => {
        this.appointments = response.map(appointment => {
          appointment.formattedTime = this.datePipe.transform(appointment.appointmentTime, 'dd-MM-yyyy HH:mm:ss', 'Asia/Kolkata');
          return appointment;
        });
      },
      error: error => console.error('Error loading appointments', error)
    });
  }

  cancelAppointment(id: number) {
    this.httpService.deleteByAppointmentId(id).subscribe({
      next: () => {
        console.log('Deleted Appointment')
        this.fetchAppointments()
      },
      error: () => { }
    })
  }

  rescheduleAppointment(appointmentId: number): void {
    console.log('Rescheduling appointment with ID:', appointmentId)
    // Implement your reschedule logic here
  }
}
