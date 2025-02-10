import { Component, OnInit } from '@angular/core'
import { HttpService } from '../../services/http.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-patient-appointment',
  templateUrl: './patient-appointment.component.html',
  styleUrls: ['./patient-appointment.component.scss']
})
export class PatientAppointmentComponent implements OnInit {

  appointmentForm!: FormGroup;
  appointments: any[] = [];

  constructor(
    private httpService: HttpService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.appointmentForm = this.formBuilder.group({
      patientId: ['']
    });
    this.fetchAppointments();
  }

  fetchAppointments(): void {
    const userIdString = localStorage.getItem('userId');
    const userId = userIdString ? parseInt(userIdString, 10) : 0;

    this.httpService.getAppointmentsByPatient(userId).subscribe(data => {
      this.appointments = data;
      console.log(this.appointments);
    }, error => {
      console.error('Error fetching appointments', error);
    });
  }

  rescheduleAppointment(appointmentId: number): void {
    console.log('Rescheduling appointment with ID:', appointmentId);
    // Implement your reschedule logic here
  }








  // appointmentList: any = []
  // constructor (public httpService: HttpService) {}

  // ngOnInit (): void {
  //   this.getAppointments()
  // }
  // getAppointments () {
  //   const userIdString = localStorage.getItem('userId')

  //   // Parse userId to an integer, if it exists
  //   const userId = userIdString ? parseInt(userIdString, 10) : 0
  //   this.httpService.getAppointmentByPatient(userId).subscribe(data => {
  //     this.appointmentList = data
  //     console.log(this.appointmentList)
  //   })
  // }
}
