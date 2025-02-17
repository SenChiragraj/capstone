import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { Patient } from '../models/appointment.model';

@Component({
  selector: 'app-schedule-appointment',
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.scss']
})
export class ScheduleAppointmentComponent implements OnInit {
  appointmentForm!: FormGroup;
  doctors: any[] = [];
  errorMessage: string | null = null;
  minDateTime!: string;
  appointmentDateTime!: string;
  role!: string;
  patients: Patient[] = [];
  patientID!: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    private authService: AuthService
  ) { 
    this.role = this.authService.getRole;
  }

  ngOnInit(): void {
    this.appointmentForm = this.fb.group({
      doctorId: ['', Validators.required],
      time: ['', Validators.required],
      patientId: [this.role === 'RECEPTIONIST' ? '' : this.authService.userId, Validators.required]
    });

    this.loadDoctors();
    this.setMinDateTime();
    if (this.role === 'RECEPTIONIST') {
      this.loadPatients();
    }
  }

  setMinDateTime(): void {
    const now = new Date();
    this.minDateTime = now.toISOString().slice(0, 16);
  }

  loadDoctors(): void {
    this.httpService.getDoctors().subscribe({
      next: doctors => {
        // Filter out doctors whose availability is "no" or "NO"
        this.doctors = doctors.filter((doctor: { availability: string; }) => doctor.availability.toLowerCase() !== 'no');
      },
      error: error => this.errorMessage = 'Error loading doctors'
    });
  }

  loadPatients(): void {
    this.httpService.getRegisteredPatients().subscribe({
      next: res => this.patients = res,
      error: error => this.errorMessage = 'Error loading patients'
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
      appointmentData.patientId,
      appointmentData.doctorId,
      timeDto
    ).subscribe({
      next: () => {
        this.appointmentForm.reset();
        if(this.role === 'PATIENT') this.router.navigate(['/patient-appointment']);
        else 
          this.router.navigateByUrl("/")
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