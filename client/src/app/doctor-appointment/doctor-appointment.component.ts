import { Component, OnInit } from '@angular/core'
import { HttpService } from '../../services/http.service'
import { Appointment } from '../models/appointment.model';
import { Doctor } from '../models/doctor';
import { MedicalRecord } from '../models/medical-record';

@Component({
  selector: 'app-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.scss']
})
export class DoctorAppointmentComponent implements OnInit {
  
  appointments: Appointment[] = [];
  errorMessage: string = '';
  doctorId!: number;

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    const userIdString = localStorage.getItem('userId')
    this.doctorId = userIdString ? parseInt(userIdString, 10) : 0
    const doctorName = Doctor.name;
  }
  getAppointmentsByDocId(): void
  {
    this.httpService.getAppointmentsByDoctor(this.doctorId).subscribe(
      (data) => this.appointments = data,
      (error) => console.error('Error fetching appointments:', error)
    );
  }
}

  // appointmentList: Appointment[] = [];

  // constructor(private httpService: HttpService) { }

  // ngOnInit(): void {
  //   this.getAppointments();
  // }

  // getAppointments() {
  //   const userIdString = localStorage.getItem('userId');
  //   const userId = userIdString ? parseInt(userIdString, 10) : 0;
  //   this.httpService.getAppointmentByDoctor(userId).subscribe(data => {
  //     this.appointmentList = data;
  //     console.log(this.appointmentList);
  //   });
  // }


  //for testcase
//   appointmentList: Appointment[] = [];

//   constructor(private httpService: HttpService) { }

//   ngOnInit(): void {
//     this.getAppointments();
//   }

//   getAppointments() {
//     const userIdString = localStorage.getItem('userId');
//     const userId = userIdString ? parseInt(userIdString, 10) : 0;
//     this.httpService.getAppointmentByDoctor(userId).subscribe(data => {
//       this.appointmentList = data;
//       console.log(this.appointmentList);
//     });
//   }
// }

