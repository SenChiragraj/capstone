import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpService } from '../../services/http.service';
import { User } from '../models/user';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MedicalRecordFormComponent } from '../medical-record-form/medical-record-form.component';
import { MedicalRecord } from '../models/appointment.model';
import { MedicalRecordEditComponent } from '../medical-record-edit/medical-record-edit.component';

@Component({
  selector: 'app-medical-records',
  templateUrl: './medical-records.component.html',
  styleUrls: ['./medical-records.component.scss']
})
export class MedicalRecordsComponent implements OnInit {

  medicalRecords: any[] = [];
  errorMessage: string = '';
  // currentUser!: User  
  role: string
  displayedColumns: string[] = ['date', 'details', 'actions'];
  
  


  constructor(
    private router: Router,
    private authService: AuthService,
    public dialogRef: MatDialogRef<MedicalRecordsComponent>,
    public dialogRef2: MatDialogRef<MedicalRecordEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { patientId: number },
    // @Inject(MAT_DIALOG_DATA) public data: { patientId: number },
    private httpService: HttpService,
    public dialog: MatDialog
    

  ) {
    this.role = authService.getRole
  }

  ngOnInit (): void {
      
    // if (!this.authService.getLoginStatus) {
    //   this.router.navigateByUrl('/dashboard')
    // }

    // this.httpService.getUserById(this.authService.userId).subscribe({
    //   next: data => (this.currentUser = data),
    //   error: error => (this.errorMessage = error)
    // })

    // console.log(this.currentUser)
    this.loadMedicalRecords();
  }

  loadMedicalRecords(): void {
    this.httpService.getMedicalRecords(this.data.patientId).subscribe({
      next: data => {
        this.medicalRecords = data;
      },
      error: error => {
        this.errorMessage = 'Error fetching medical records';
      }
    });
  }

  openNewMedicalRecordForm(): void {
    const dialogRef = this.dialog.open(MedicalRecordFormComponent, {
      width: '600px',
      data: { patientId: this.data.patientId, doctorId: this.authService.userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Medical record saved:', result);
        this.medicalRecords.push(result);
        this.medicalRecords = [...this.medicalRecords]; // Trigger change detection
      } 
    });
  }

  

  editMedicalRecord(record: MedicalRecord): void {
    
    console.log(record);
    
    const dialogRef2 = this.dialog.open(MedicalRecordFormComponent, {
      width: '600px',
      data: { patientId: record.patient.id, doctorId: record.doctor.id, record: record }
    });

    dialogRef2.afterClosed().subscribe(result => {
      if (result) {
        console.log('Medical record updated:', result);
        const index = this.medicalRecords.findIndex(r => r.id === record.id);
        if (index !== -1) {
          this.medicalRecords[index] = result;
          this.medicalRecords = [...this.medicalRecords]; // Trigger change detection
        }
      }
    });
  }

  deleteMedicalRecord(recordId: number): void {
    // Logic to delete medical record
    console.log('Delete medical record ID:', recordId);
  }

  close(): void {
    this.dialogRef.close();
  }

}
