import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HttpService } from '../../services/http.service'
import { AuthService } from '../../services/auth.service'
import { DatePipe } from '@angular/common'
import { Doctor } from '../models/appointment.model'
import { Router } from '@angular/router'
 
@Component({
  selector: 'app-schedule-appointment',
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.scss']
})
export class ScheduleAppointmentComponent implements OnInit {
  scheduleAppointmentForm!: FormGroup
  doctors: Doctor[] = []
  appointmentTime: any
 
  errorMessage: string = ''
  constructor (
    private httpService: HttpService,
    private authService: AuthService,
    private datePipe: DatePipe,
    private router: Router,
    private fb: FormBuilder
  ) {}
 
  ngOnInit (): void {
    this.scheduleAppointmentForm = this.fb.group({
      doctorId: ['', Validators.required],
      appointmentDate: ['', Validators.required]
    })
 
    this.loadAllDoctors()
  }
 
  scheduleAppointment (): void {
    if (this.scheduleAppointmentForm.valid) {
      const token = this.authService.getToken()
 
      //modified from 42 to 50
      const selectedDate: Date = new Date(this.scheduleAppointmentForm.value.appointmentDate);
      const formattedDate: string = selectedDate.toISOString();  // Correct ISO format
 
      const appointmentData = {
        ...this.scheduleAppointmentForm.value,
        appointmentTime: formattedDate  // Ensure correct key is used
      };
 
      console.log("Sending appointment data:", appointmentData); // Debugging
 
 
      this.httpService.ScheduleAppointment(
          this.authService.userId,
          appointmentData.doctorId,
          appointmentData
        )
        .subscribe({
          next: () => {
            console.log('Raw response:')
            // Check if response is JSON
            this.scheduleAppointmentForm.reset()
            this.router.navigateByUrl('/home')
          },
          error: error => {
            console.log('Error:', error)
            this.errorMessage = 'Error scheduling appointment'
          }
        })
    }
  }
 
  loadAllDoctors (): void {
    this.httpService.getDoctors().subscribe({
      next: data => (this.doctors = data),
      error: error => {
        this.errorMessage = 'Error in fetching all doctors'
      }
    })
  }
 
  getErrorMessage (controlName: string): string {
    const control = this.scheduleAppointmentForm.get(controlName)
    if (control?.hasError('required')) {
      return `${controlName} is required`
    }
    return ''
  }
}
