// medical-record-form.component.ts
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MedicalRecord } from '../models/medical-record';
import { HttpService } from '../../services/http.service';
import { User } from '../models/user';

@Component({
  selector: 'app-medical-record-form',
  templateUrl: './medical-record-form.component.html',
  styleUrls: ['./medical-record-form.component.scss']
})
export class MedicalRecordFormComponent {
  medicalRecordForm: FormGroup;
  doctorId: number;
  currentUser !: User;
  successMesssage: string = '';
  errorMesssage: string = '';

  isEditMode: boolean;
  minDateTime!:string;



  constructor(
    public dialogRef: MatDialogRef<MedicalRecordFormComponent>,
    private fb: FormBuilder, private httpService: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: { patientId: number, doctorId: number, record?: MedicalRecord  }
  ) {
    this.medicalRecordForm = this.fb.group({
      doctorId : [data.doctorId],
      date: ['', Validators.required],
      details: ['', Validators.required]
    });
    
    this.isEditMode = !!data.record;

    this.doctorId = parseInt(localStorage.getItem("userId") || '0', 10);
    this.httpService.getUserById(this.doctorId).subscribe({
      next: data => (this.currentUser = data),
      error: error => console.error('There was an error!', error)
    });

    this.setMinDateTime();
  }

  setMinDateTime(): void {
    const now = new Date();
    this.minDateTime = now.toISOString().slice(0, 16);
  }

    onSubmit(): void {
    if (this.medicalRecordForm.valid) {
      console.log('Form data:', this.medicalRecordForm.value);
      const medicalRecord = new MedicalRecord();
      medicalRecord.doctorId = this.doctorId;
      medicalRecord.date = this.medicalRecordForm.value.date;
      medicalRecord.details = this.medicalRecordForm.value.details;
      this.httpService.createMedicalRecords(this.data.patientId, this.data.doctorId, medicalRecord).subscribe({
        next: data => {
          this.successMesssage = 'Medical Record added';
        },
        error: error => {
          this.errorMesssage = 'There was an error!';
        }
      })

      console.log('Medical record data:', this.medicalRecordForm.value);
      this.dialogRef.close(this.medicalRecordForm.value);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
