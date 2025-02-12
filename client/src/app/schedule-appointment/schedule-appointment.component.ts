import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-schedule-appointment',
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.scss']
})

export class ScheduleAppointmentComponent implements OnInit {
  itemForm!: FormGroup

  constructor (
    private fb: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService,
    private datePipe: DatePipe
  ) {}

  ngOnInit (): void {
    this.itemForm = this.fb.group({
      patientId: ['', Validators.required],
      doctorId: ['', Validators.required],
      time: ['', Validators.required]
    })
  }

  scheduleAppointment (): void {
    if (this.itemForm.valid) {
      const token = this.authService.getToken()
      const formattedTime = this.datePipe.transform(
        this.itemForm.value.time,
        'yyyy-MM-ddTHH:mm:ss'
      )
      const appointmentData = { ...this.itemForm.value, time: formattedTime }
      this.httpService
        .scheduleAppointment(
          '/api/patient/appointment',
          appointmentData,
          'token'
        )
        .subscribe(
          response => {
            console.log('Appointment scheduled successfully', response)
          },
          error => {
            console.error('Error scheduling appointment', error)
          }
        )
    }
  }
}