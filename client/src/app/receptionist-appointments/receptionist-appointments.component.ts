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
  filteredAppointments: any[] = []

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
        this.appointments = data.sort((a: any, b: any) => {     //modified to sort the appointments in earlist order
          // Convert appointment times to Date objects for comparison
          const dateA = new Date(a.appointmentTime).getTime();
          const dateB = new Date(b.appointmentTime).getTime();
          return dateA - dateB; // Sort in ascending order (earliest first)
        })
        this.filteredAppointments = this.appointments
        console.log(this.appointments)
      },
      error => {
        console.error('Error fetching appointments', error)
      }
    )
  }


  //modified to filter the appointments
  searchAppointment(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredAppointments = this.appointments.filter(appointment =>
      appointment.doctor.name.toLowerCase().includes(searchTerm) ||
      appointment.patient.name.toLowerCase().includes(searchTerm)
    );
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

  rescheduleAppointment (appointmentId: number): void {
    this.router.navigate(['/receptionist-schedule-appointments', appointmentId])
  }
}
