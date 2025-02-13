import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HttpService } from '../../services/http.service'
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-receptionist-schedule-appointments',
  templateUrl: './receptionist-schedule-appointments.component.html',
  styleUrls: ['./receptionist-schedule-appointments.component.scss']
})
export class ReceptionistScheduleAppointmentsComponent implements OnInit {
  itemForm!: FormGroup
  responseMessage: string = ''

  constructor (
    private fb: FormBuilder,
    private httpService: HttpService,
    private datePipe: DatePipe
  ) {}

  ngOnInit (): void {
    this.itemForm = this.fb.group({
      patientId: ['', Validators.required],
      doctorId: ['', Validators.required],
      time: ['', Validators.required]
    })
  }

  onSubmit (): void {
    if (this.itemForm.valid) {
      const formattedTime = this.datePipe.transform(
        this.itemForm.value.time,
        'yyyy-MM-ddTHH:mm:ss'
      )
      const appointmentData = { ...this.itemForm.value, time: formattedTime }
      this.httpService
        .ScheduleAppointmentByReceptionist(appointmentData)
        .subscribe(
          response => {
            console.log('Appointment scheduled successfully', response)
          },
          error => {
            console.error('Error scheduling appointment', error)
          }
        )
    }
  }
}
