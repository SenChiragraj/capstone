import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { HttpService } from '../../services/http.service'

@Component({
  selector: 'app-receptionist-schedule-appointments',
  templateUrl: './receptionist-schedule-appointments.component.html',
  styleUrls: ['./receptionist-schedule-appointments.component.scss']
})
export class ReceptionistScheduleAppointmentsComponent implements OnInit {
  appointment: any = {
    patient: {},
    doctor: {},
    appointmentTime: ''
  }

  constructor (
    private route: ActivatedRoute,
    private httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit (): void {
    this.route.params.subscribe(params => {
      const appointmentId = params['id']
      this.fetchAppointmentDetails(appointmentId)
    })
  }

  fetchAppointmentDetails (appointmentId: number): void {
    this.httpService.getAppointmentById(appointmentId).subscribe(
      (response: any) => {
        this.appointment = response
      },
      (error: any) => {
        console.error('Error fetching appointment details', error)
      }
    )
  }

  onSubmit (): void {
    this.httpService
      .rescheduleAppointment(this.appointment.id, this.appointment)
      .subscribe(
        response => {
          console.log('Appointment rescheduled successfully', response)
          this.router.navigate(['/receptionist-appointments'])
        },
        error => {
          console.error('Error rescheduling appointment', error)
        }
      )
  }
}
