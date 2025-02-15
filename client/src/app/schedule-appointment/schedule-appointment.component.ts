import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { DatePipe } from '@angular/common';
import { Doctor } from '../models/appointment.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule-appointment',
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.scss']
})
export class ScheduleAppointmentComponent implements OnInit {
  scheduleAppointmentForm!: FormGroup;
  doctors: Doctor[] = [];
  appointmentTime: any;

  errorMessage: string = '';
  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    private datePipe: DatePipe,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.scheduleAppointmentForm = this.fb.group({
      doctorId: ['', Validators.required],
      appointmentTime: ['', Validators.required]
    });

    this.loadAllDoctors();
  }

  scheduleAppointment(): void {
    console.log(this.scheduleAppointmentForm.value);
    
    if (this.scheduleAppointmentForm.valid) {
      this.httpService
        .ScheduleAppointment(
          this.authService.userId,
          this.scheduleAppointmentForm.value.doctorId,
          this.scheduleAppointmentForm.value.appointmentTime,
        )
        .subscribe({
          next: () => {
            this.scheduleAppointmentForm.reset();
            this.router.navigateByUrl('/patient-appointment'); // Navigate to the appointments page
          },
          error: error => {
            console.log('Error scheduling appointment:', error);
            this.errorMessage = 'Error scheduling appointment';
          }
        });
    }
  }

  loadAllDoctors(): void {
    this.httpService.getDoctors().subscribe({
      next: data => (this.doctors = data),
      error: error => {
        this.errorMessage = 'Error in fetching all doctors';
      }
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.scheduleAppointmentForm.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName} is required`;
    }
    return '';
  }
}
