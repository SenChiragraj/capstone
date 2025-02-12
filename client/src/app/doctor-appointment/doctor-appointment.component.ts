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

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    const userIdString = localStorage.getItem('userId');
      const userId = userIdString ? parseInt(userIdString, 10) : 0;
      this.httpService.getAppointmentByDoctor(userId).subscribe(data => {
        this.appointments = data;
        console.log(this.appointments);
      });
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

