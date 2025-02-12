// import { Component, OnInit } from '@angular/core'
// import { FormBuilder, FormGroup, Validators } from '@angular/forms'
// import { HttpService } from '../../services/http.service'
// import { DatePipe } from '@angular/common'

// @Component({
//   selector: 'app-receptionist-schedule-appointments',
//   templateUrl: './receptionist-schedule-appointments.component.html',
//   styleUrls: ['./receptionist-schedule-appointments.component.scss']
// })
// export class ReceptionistScheduleAppointmentsComponent implements OnInit {
//   itemForm!: FormGroup
//   responseMessage: string = ''

//   constructor (
//     private fb: FormBuilder,
//     private httpService: HttpService,
//     private datePipe: DatePipe
//   ) {}

//   ngOnInit (): void {
//     this.itemForm = this.fb.group({
//       patientId: ['', Validators.required],
//       doctorId: ['', Validators.required],
//       time: ['', Validators.required]
//     })
//   }

//   onSubmit (): void {
//     if (this.itemForm.valid) {
//       const formattedTime = this.datePipe.transform(
//         this.itemForm.value.time,
//         'yyyy-MM-ddTHH:mm:ss'
//       )
//       const appointmentData = { ...this.itemForm.value, time: formattedTime }
//       this.httpService
//         .post('/api/receptionist/appointment', appointmentData)
//         .subscribe(
//           response => {
//             console.log('Appointment scheduled successfully', response)
//           },
//           error => {
//             console.error('Error scheduling appointment', error)
//           }
//         )
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-receptionist-schedule-appointments',
  templateUrl: './receptionist-schedule-appointments.component.html',
  styleUrls: ['./receptionist-schedule-appointments.component.scss']
})
export class ReceptionistScheduleAppointmentsComponent implements OnInit {

  appointmentForm!: FormGroup;
  registeredPatients: any[] = [];
  registeredDoctors: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.appointmentForm = this.formBuilder.group({
      patientId: ['', Validators.required],
      doctorId: ['', Validators.required],
      appointmentTime: ['', Validators.required]
    });
    this.httpService.saveDummyData();
    this.loadRegisteredUsers();
  }

  loadRegisteredUsers(): void {
    const token = this.authService.getToken();
    if (token) {
      this.httpService.getRegisteredPatients(token).subscribe(data => {
        this.registeredPatients = data;
      }, error => {
        console.error('Error fetching patients', error);
      });

      this.httpService.getRegisteredDoctors(token).subscribe(data => {
        this.registeredDoctors = data;
      }, error => {
        console.error('Error fetching doctors', error);
      });
    } else {
      console.error('No auth token found');
    }
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      const formValue = this.appointmentForm.value;
      const payload = {
        patientId: formValue.patientId,
        doctorId: formValue.doctorId,
        time: formValue.appointmentTime
      };

      const token = this.authService.getToken();
      if (token) {
        const apiUrl = 'http://your-backend-url/api/receptionist/appointment'; // Replace with your backend URL
        this.httpService.scheduleAppointment(apiUrl, payload, token).subscribe(response => {
          console.log('Appointment scheduled successfully', response);
          this.router.navigate(['/receptionist-appointments']);
        }, error => {
          console.error('Error scheduling appointment', error);
        });
      } else {
        console.error('No auth token found');
      }
    }
  }
}
