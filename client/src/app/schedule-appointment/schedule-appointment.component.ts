import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HttpService } from '../../services/http.service'
import { AuthService } from '../../services/auth.service'
import { DatePipe } from '@angular/common'
import { Doctor } from '../models/appointment.model'

@Component({
  selector: 'app-schedule-appointment',
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.scss']
})
export class ScheduleAppointmentComponent implements OnInit {
  scheduleAppointmentForm!: FormGroup
  doctors: Doctor[] = []

  constructor (
    private fb: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService,
    private datePipe: DatePipe
  ) {}

  ngOnInit (): void {
    this.scheduleAppointmentForm = this.fb.group({
      doctorID: ['', Validators.required],
      appointmentDate: ['', Validators.required]
    })
  }

  scheduleAppointment (): void {
    if (this.scheduleAppointmentForm.valid) {
      const token = this.authService.getToken()
      const formattedTime = this.datePipe.transform(
        this.scheduleAppointmentForm.value.time,
        'yyyy-MM-ddTHH:mm:ss'
      )
      const appointmentData = {
        ...this.scheduleAppointmentForm.value,
        time: formattedTime
      }
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

  getErrorMessage (controlName: string): string {
    const control = this.scheduleAppointmentForm.get(controlName)
    if (control?.hasError('required')) {
      return `${controlName} is required`
    }
    return ''
  }
}
