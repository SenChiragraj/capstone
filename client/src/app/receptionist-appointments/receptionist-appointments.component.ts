import { Component, OnInit } from '@angular/core'
import { DatePipe } from '@angular/common'
import { Router } from '@angular/router'
import { HttpService } from '../../services/http.service'

@Component({
  selector: 'app-receptionist-appointments',
  templateUrl: './receptionist-appointments.component.html',
  styleUrls: ['./receptionist-appointments.component.scss'],
  providers: [DatePipe]
})
export class ReceptionistAppointmentsComponent implements OnInit {
  appointments: any[] = []

  constructor (
    private httpService: HttpService,
    public datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit (): void {
    this.fetchAppointments()
  }  


fetchAppointments (): void {
    this.httpService.getAllAppointmentsForAppointments().subscribe(
      data => {
        this.appointments = data.map(appointment => {
          appointment.formattedTime = this.datePipe.transform(appointment.appointmentTime, 'dd-MM-yyyy HH:mm:ss', 'Asia/Kolkata')
          console.log(appointment.formattedTime);
          

          return appointment
        })
        console.log(this.appointments)
      },
      error => {
        console.error('Error fetching appointments', error)
      }
    )
  }





 

  rescheduleAppointment (appointmentId: number): void {
    this.router.navigate(['/receptionist-schedule-appointments', appointmentId])
  }
}
