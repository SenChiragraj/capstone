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

  fetchAppointments(): void {
    this.httpService.getAllAppointmentsForAppointments().subscribe(data => {
      this.appointments = data;
      console.log(this.appointments);
    }, error => {
      console.error('Error fetching appointments', error);
    });
  }

  // fetchAppointments (): void {
  //   // Dummy data for testing
  //   this.appointments = [
  //     {
  //       id: 1,
  //       appointmentTime: new Date(),
  //       status: 'Scheduled',
  //       doctor: { username: 'doc1', email: 'doc1@example.com' },
  //       patient: { username: 'patient1', email: 'patient1@example.com' }
  //     },
  //     {
  //       id: 2,
  //       appointmentTime: new Date(),
  //       status: 'Completed',
  //       doctor: { username: 'doc2', email: 'doc2@example.com' },
  //       patient: { username: 'patient2', email: 'patient2@example.com' }
  //     }
  //   ]
  //   console.log(this.appointments)
  // }

  // rescheduleAppointment (appointmentId: number): void {
  //   this.router.navigate(['/receptionist-schedule-appointments'], {
  //     queryParams: { appointmentId }
  //   })
  // }

   rescheduleAppointment(appointmentId: number): void {
      this.router.navigate(['/receptionist-schedule-appointments', appointmentId]);
    }

}
