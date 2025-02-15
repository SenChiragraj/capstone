import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from '../../services/http.service';
import { MedicalRecordDialogComponent } from '../medical-record-dialog/medical-record-dialog.component';

@Component({
  selector: 'app-doctor-manage-medical-records',
  templateUrl: './doctor-manage-medical-records.component.html',
  styleUrls: ['./doctor-manage-medical-records.component.scss']
})
export class DoctorManageMedicalRecordsComponent implements OnInit {
  patients: any[] = [];
  doctorId!: number;

  constructor(private httpService: HttpService, public dialog: MatDialog) {}

  ngOnInit(): void {
    const userIdString = localStorage.getItem('userId');
    this.doctorId = userIdString ? parseInt(userIdString, 10) : 0;
    this.fetchPatients();
  }

  fetchPatients(): void {
    if (this.doctorId) {
      this.httpService.get(`/api/doctor/patients-with-appointments?doctorId=${this.doctorId}`).subscribe((data: any) => {
        this.patients = data;
      });
    } else {
      console.error('Doctor ID is not loaded correctly.');
    }
  }

  createMedicalRecord(patientId: number): void {
    const dialogRef = this.dialog.open(MedicalRecordDialogComponent, {
      width: '300px',
      data: { details: '', date: new Date() }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newRecord = {
          patientId: patientId,
          details: result.details,
          date: result.date
        };

        this.httpService.post('/api/doctor/create-medical-record', newRecord).subscribe(() => {
          this.fetchPatients();
        });
      }
    });
  }

  updateMedicalRecord(recordId: number, updatedDetails: string): void {
    const updatedRecord = {
      id: recordId,
      details: updatedDetails,
      date: new Date()
    };

    this.httpService.put('/api/doctor/update-medical-record', updatedRecord).subscribe(() => {
      this.fetchPatients();
    });
  }
}



// import { Component, OnInit } from '@angular/core';
// import { HttpService } from '../../services/http.service';

// @Component({
//   selector: 'app-doctor-manage-medical-records',
//   templateUrl: './doctor-manage-medical-records.component.html',
//   styleUrls: ['./doctor-manage-medical-records.component.scss']
// })
// export class DoctorManageMedicalRecordsComponent implements OnInit {
//   patients: any[] = [];
//   doctorId!: number;
//   isDialogOpen = false;
//   dialogData = { details: '', date: new Date() };
//   selectedPatientId!: number;
//   selectedRecordId?: number;

//   constructor(private httpService: HttpService) {}

//   ngOnInit(): void {
//     const userIdString = localStorage.getItem('userId');
//     this.doctorId = userIdString ? parseInt(userIdString, 10) : 0;
//     this.fetchPatients();
//   }

//   fetchPatients(): void {
//     if (this.doctorId) {
//       this.httpService.get(`/api/doctor/patients-with-appointments?doctorId=${this.doctorId}`).subscribe((data: any) => {
//         this.patients = data;
//       });
//     } else {
//       console.error('Doctor ID is not loaded correctly.');
//     }
//   }

//   openCreateMedicalRecordDialog(patientId: number): void {
//     this.selectedPatientId = patientId;
//     this.selectedRecordId = undefined;
//     this.dialogData = { details: '', date: new Date() };
//     this.isDialogOpen = true;
//   }

//   openUpdateMedicalRecordDialog(record: any): void {
//     this.selectedRecordId = record.id;
//     this.selectedPatientId = record.patientId;
//     this.dialogData = { details: record.details, date: new Date(record.date) };
//     this.isDialogOpen = true;
//   }

//   closeDialog(): void {
//     this.isDialogOpen = false;
//   }

//   onSaveMedicalRecord(): void {
//     if (this.selectedRecordId) {
//       this.updateMedicalRecord(this.selectedRecordId, this.dialogData);
//     } else {
//       this.createMedicalRecord(this.selectedPatientId, this.dialogData);
//     }
//   }

//   createMedicalRecord(patientId: number, recordData: { details: string; date: Date }): void {
//     const newRecord = {
//       patientId: patientId,
//       details: recordData.details,
//       date: recordData.date
//     };

//     this.httpService.post('/api/doctor/create-medical-record', newRecord).subscribe(() => {
//       this.fetchPatients();
//       this.closeDialog();
//     });
//   }

//   updateMedicalRecord(recordId: number, updatedData: { details: string; date: Date }): void {
//     const updatedRecord = {
//       id: recordId,
//       details: updatedData.details,
//       date: updatedData.date
//     };

//     this.httpService.put('/api/doctor/update-medical-record', updatedRecord).subscribe(() => {
//       this.fetchPatients();
//       this.closeDialog();
//     });
//   }

//   deleteMedicalRecord(recordId: number): void {
//     this.httpService.delete(`/api/doctor/delete-medical-record/${recordId}`).subscribe(() => {
//       this.fetchPatients();
//     });
//   }
// }

