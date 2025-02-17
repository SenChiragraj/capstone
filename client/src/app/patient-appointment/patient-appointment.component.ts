// import { Component, OnInit } from '@angular/core'
// import { HttpService } from '../../services/http.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
// import { DatePipe } from '@angular/common'
import { MatDialog } from '@angular/material/dialog'
// import { MedicalRecordsComponent } from '../medical-records/medical-records.component'

// @Component({
//   selector: 'app-patient-appointment',
//   templateUrl: './patient-appointment.component.html',
//   styleUrls: ['./patient-appointment.component.scss'],
//   providers: [DatePipe]
// })
// export class PatientAppointmentComponent implements OnInit {
//   appointmentForm!: FormGroup

  // constructor (
  //   private httpService: HttpService,
  //   private formBuilder: FormBuilder,
  //   public datePipe: DatePipe,
  //   public dialog: MatDialog
  // ) {}

//   appointments: any[] = []

//   ngOnInit (): void {
//     this.appointmentForm = this.formBuilder.group({
//       patientId: ['']
//     })
//     this.fetchAppointments()
//   }

//   fetchAppointments (): void {
//     const userIdString = localStorage.getItem('userId')
//     const userId = userIdString ? parseInt(userIdString, 10) : 0

//     //modified to sort the earlist appointment first
//     this.httpService.getAppointmentByPatient(userId).subscribe(
//       data => {
//         this.appointments = data.sort((a: any, b: any) => {
//           // Convert appointment times to Date objects for comparison
//           const dateA = new Date(a.appointmentTime).getTime();
//           const dateB = new Date(b.appointmentTime).getTime();
//           return dateA - dateB; // Sort in ascending order (earliest first)
//         })
//         console.log(this.appointments)
//       },
//       error => {
//         console.error('Error fetching appointments', error)
//       }
//     )
//   }

//   cancelAppointment (id: number) {
//     this.httpService.deleteByAppointmentId(id).subscribe({
//       next: () => {
//         console.log('Deleted Appointment')
//         this.fetchAppointments()
//       },
//       error: () => {}
//     })
//   } 

  // viewMedicalRecord (patientId: number) {
  //   this.dialog.open(MedicalRecordsComponent, {
  //     width: '600px',
  //     data: { patientId: patientId }
  //   });
  // }

//   rescheduleAppointment (appointmentId: number): void {
//     console.log('Rescheduling appointment with ID:', appointmentId)
//     // Implement your reschedule logic here
//   }
// }


import { Component, OnInit } from '@angular/core'
import { HttpService } from '../../services/http.service'
import { DatePipe } from '@angular/common'
import { MedicalRecordsComponent } from '../medical-records/medical-records.component'
import { Appointment } from '../models/appointment.model'
 
@Component({
  selector: 'app-patient-appointment',
  templateUrl: './patient-appointment.component.html',
  styleUrls: ['./patient-appointment.component.scss'],
  providers: [DatePipe]
})
export class PatientAppointmentComponent implements OnInit {
  // No need for appointmentForm if it's not used
  // appointmentForm!: FormGroup
 
  constructor (
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    public datePipe: DatePipe,
    public dialog: MatDialog
  ) {}
 
  appointments: any[] = []
  filteredAppointments: Appointment[] = [];
  searchQuery: string = '';
 
  ngOnInit(): void {
    this.fetchAppointments();
    console.log(this.appointments);
    
    this.filteredAppointments = this.appointments;

  }
 
  fetchAppointments(): void {
    const userIdString = localStorage.getItem('userId')
    const userId = userIdString ? parseInt(userIdString, 10) : 0
 
    this.httpService.getAppointmentByPatient(userId).subscribe({
      next: (response: any[]) => {
        console.log(response);
        
        this.filteredAppointments = this.appointments = response.map(appointment => {
          appointment.formattedTime = this.datePipe.transform(appointment.appointmentTime, 'dd-MM-yyyy HH:mm:ss', 'Asia/Kolkata');
          return appointment;
        });
      },
      error: error => console.error('Error loading appointments', error)
    });

  }

  filterAppointments(): void {
    if (!this.searchQuery) {
      this.filteredAppointments = this.appointments;
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredAppointments = this.appointments.filter(appointment =>
        appointment.doctor.name.toLowerCase().includes(query) ||
        appointment.doctor.specialty.toLowerCase().includes(query)
      );
    }
  }
 
  cancelAppointment(id: number) {
    this.httpService.deleteByAppointmentId(id).subscribe({
      next: () => {
        console.log('Deleted Appointment')
        this.fetchAppointments()
      },
      error: () => { }
    })
  }

  viewMedicalRecord (patientId: number) {
    this.dialog.open(MedicalRecordsComponent, {
      width: '600px',
      data: { patientId: patientId }
    });
  }
 
  rescheduleAppointment(appointmentId: number): void {
    console.log('Rescheduling appointment with ID:', appointmentId)
    // Implement your reschedule logic here
  }
}
 
 