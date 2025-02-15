// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-medical-record-dialog',
//   templateUrl: './medical-record-dialog.component.html',
//   styleUrls: ['./medical-record-dialog.component.scss']
// })
// export class MedicalRecordDialogComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }


import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-medical-record-dialog',
  templateUrl: './medical-record-dialog.component.html',
  styleUrls: ['./medical-record-dialog.component.scss']
})
export class MedicalRecordDialogComponent {

  @Input() data: { details: string; date: Date } = { details: '', date: new Date() };
    @Output() close = new EventEmitter<void>();
    @Output() save = new EventEmitter<{ details: string; date: Date }>();

  // constructor(
  //   public dialogRef: MatDialogRef<MedicalRecordDialogComponent>,
  //   @Inject(MAT_DIALOG_DATA) public data: { details: string; date: Date }
  // ) {}

  onCancel(): void {
    this.close.emit();
  }
  onSave():void{
    this.save.emit(this.data);

  }
}