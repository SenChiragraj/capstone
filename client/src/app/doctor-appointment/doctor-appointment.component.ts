import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.scss']
})
export class DoctorAppointmentComponent implements OnInit {
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
  appointmentList: Appointment[] = [];

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments() {
    const userIdString = localStorage.getItem('userId');
    const userId = userIdString ? parseInt(userIdString, 10) : 0;
    this.httpService.getAppointmentByDoctor(userId).subscribe(data => {
      this.appointmentList = data;
      console.log(this.appointmentList);
    });
  }
}




  // For testing
  // appointments: Appointment[] = [
  //   { id: 1, patientId: 1, doctorId: 1, appointmentTime: new Date('2025-02-10T09:00:00'), status: 'Confirmed' },
  //   { id: 2, patientId: 2, doctorId: 2, appointmentTime: new Date('2025-02-10T10:30:00'), status: 'Pending' },
  //   { id: 3, patientId: 3, doctorId: 3, appointmentTime: new Date('2025-02-10T11:00:00'), status: 'Cancelled' },
  //   { id: 4, patientId: 4, doctorId: 1, appointmentTime: new Date('2025-02-11T09:30:00'), status: 'Confirmed' },
  //   { id: 5, patientId: 5, doctorId: 2, appointmentTime: new Date('2025-02-11T10:00:00'), status: 'Pending' }
  // ]; 