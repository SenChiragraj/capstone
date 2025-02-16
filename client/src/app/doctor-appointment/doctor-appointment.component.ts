import { Component, OnInit } from '@angular/core'
import { HttpService } from '../../services/http.service'
import { Appointment } from '../models/appointment.model'
import { MedicalRecord } from '../models/medical-record'
import { MedicalRecordsComponent } from '../medical-records/medical-records.component'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.scss']
})
export class DoctorAppointmentComponent implements OnInit {
  appointments: Appointment[] = []
  filteredData: any[] = []
  errorMessage: string = ''
  doctorId!: number

  constructor (private httpService: HttpService, public dialog: MatDialog) {}

  ngOnInit (): void {
    const userIdString = localStorage.getItem('userId')
    this.doctorId = userIdString ? parseInt(userIdString, 10) : 0
    this.getAppointmentsByDocId()
  }
  
  getAppointmentsByDocId(): void {
    this.httpService.getAppointmentByDoctor(this.doctorId).subscribe({
      next: data => {
        this.appointments = data.sort((a:any, b:any) => {
          // Convert appointment times to Date objects for comparison
          const dateA = new Date(a.appointmentTime).getTime();
          const dateB = new Date(b.appointmentTime).getTime();
          return dateA - dateB; // Sort in ascending order (earliest first)
        })
        this.filteredData = this.appointments
      },
      error: (error) => console.error('Error fetching appointments:', error)
    });
  }

  searchPatient(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredData = this.appointments.filter(appointment =>
      appointment.patient.name.toLowerCase().includes(searchTerm) ||
      appointment.patient.id.toString().includes(searchTerm)
    );
  }

    viewMedicalRecord (patientId: number) {
      this.dialog.open(MedicalRecordsComponent, {
        width: '600px',
        data: { patientId: patientId }
      });
    }
}
