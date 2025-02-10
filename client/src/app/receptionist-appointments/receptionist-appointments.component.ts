import { Component, OnInit } from '@angular/core'
import { HttpService } from '../../services/http.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-receptionist-appointments',
  templateUrl: './receptionist-appointments.component.html',
  styleUrls: ['./receptionist-appointments.component.scss'],
  providers: [DatePipe]
})
export class ReceptionistAppointmentsComponent {

  itemForm!: FormGroup;
  appointments: any[] = [];

  constructor(
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      id: ['', Validators.required],
      time: ['', Validators.required]
    });
    this.fetchAppointments();
  }

  fetchAppointments(): void {
    this.httpService.getAllAppointments().subscribe(data => {
      this.appointments = data;
      console.log(this.appointments);
    }, error => {
      console.error('Error fetching appointments', error);
    });
  }

  rescheduleAppointment(appointmentId: number): void {
    const newTime = prompt('Enter new appointment time (YYYY-MM-DD HH:mm):', '');
    if (newTime) {
      this.httpService.rescheduleAppointment(appointmentId, newTime).subscribe(response => {
        console.log('Appointment rescheduled', response);
        this.fetchAppointments(); // Refresh the appointments list
      }, error => {
        console.error('Error rescheduling appointment', error);
      });
    }
  }
} 
