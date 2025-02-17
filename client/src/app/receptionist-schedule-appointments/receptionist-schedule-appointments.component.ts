


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from '../models/appointment.model';
import { HttpService } from '../../services/http.service';
@Component({
  selector: 'app-receptionist-schedule-appointments',
  templateUrl: './receptionist-schedule-appointments.component.html',
  styleUrls: ['./receptionist-schedule-appointments.component.scss']
})

export class ReceptionistScheduleAppointmentsComponent implements OnInit {
  appointment!: Appointment;
  minDateTime!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    const appointmentId = +this.route.snapshot.paramMap.get('appointmentId')!;
    this.getAppointmentById(appointmentId);
    this.setMinDateTime();
  }

  setMinDateTime(): void {
    const now = new Date();
    this.minDateTime = now.toISOString().slice(0, 16);
  }

  getAppointmentById(appointmentId: number): void {
    this.httpService.getAppointmentById(appointmentId).subscribe(
      (data: Appointment) => {
        this.appointment = data;
      },
      (error) => {
        console.error('Error fetching appointment details', error);
      }
    );
  }

  onSubmit(): void {
    console.log("After submit clicked inside component : " + this.appointment.appointmentTime);
    
    this.httpService.updateAppointment(this.appointment).subscribe(
      () => {
        console.log('Appointment rescheduled successfully');
        this.router.navigate(['/receptionist-appointments']);
      },
      (error: any) => {
        console.error('Error rescheduling appointment', error);
      }
    );
  }
}
