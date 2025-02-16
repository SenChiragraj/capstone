

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
 
@Component({
  selector: 'app-schedule-appointment',
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.scss']
})
export class ScheduleAppointmentComponent implements OnInit {
  appointmentForm!: FormGroup;
  doctors: any[] = [];
  errorMessage: string | null = null;
  minDateTime!:string;
  appointmentDateTime!:string;
 
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    private authService: AuthService
  ) { }
 
  ngOnInit(): void {
    this.appointmentForm = this.fb.group({
      doctorId: ['', Validators.required],  
      time: ['', Validators.required]  
    });
 
    this.loadDoctors();
    this.setMinDateTime();
  }
 
  setMinDateTime(): void {
    const now = new Date();
    this.minDateTime = now.toISOString().slice(0, 16);
  }
 
 
 
  loadDoctors(): void {
    this.httpService.getDoctors().subscribe({
      next: doctors => this.doctors = doctors,
      error: error => this.errorMessage = 'Error loading doctors'
    });
  }
 
  scheduleAppointment(): void {
    if (this.appointmentForm.invalid) {
      return;
    }
 
    const appointmentData = this.appointmentForm.value;
    const timeDto = {
      time: new Date(appointmentData.time).toISOString().replace('T', ' ').substring(0, 19) // Formatting the date
    };
 
    this.httpService.ScheduleAppointment(
      this.authService.userId,
      appointmentData.doctorId,
      timeDto
    ).subscribe({
      next: () => {
        this.appointmentForm.reset();
        this.router.navigate(['/patient-appointment']);
      },
      error: error => {
        console.log('Error:', error);
        this.errorMessage = 'Error scheduling appointment';
      }
    });
  }
 
  getErrorMessage(controlName: string): string {
    const control = this.appointmentForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    return '';
  }
}