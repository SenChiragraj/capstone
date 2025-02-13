import { Component, OnInit } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { AuthService } from '../../services/auth.service'
import { HttpService } from '../../services/http.service'
import { Appointment, Doctor } from '../models/appointment.model'
import { User } from '../models/user'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.scss']
})
export class DashbaordComponent implements OnInit {
  avator = '../../assets/avatar.png'
  role: string = ''
  errorMessage: string = ''
  doctors: Doctor[] = []
  appointments: Appointment[] = []
  currentUser!: User

  constructor (
    private router: Router,
    private authService: AuthService,
    private httpServie: HttpService
  ) {}

  ngOnInit (): void {
    console.log(this.authService.getLoginStatus)

    if (!this.authService.getLoginStatus) {
      this.router.navigateByUrl('/login')
    } else this.role = this.authService.getRole

    if (this.role === 'PATIENT') {
      this.toLoadPatientDashboard()
    } else if (this.role === 'DOCTOR') {
      this.toLoadDoctorDashboard()
    } else {
      this.toLoadReceptionistDashboard()
    }
  }

  bookAppointment (): void {
    this.router.navigate(['/book-appointment']) // Adjust the route as needed
  }

  showAllAppointments (): void {
    this.router.navigate(['/all-appointments']) // Adjust the route as needed
  }

  toLoadPatientDashboard () {
    this.toLoadDoctors()
  }

  toLoadReceptionistDashboard () {
    this.toLoadAppointment()
  }

  toLoadDoctorDashboard () {
    this.toLoadAppointment()
  }

  toLoadUserById () {
    const id = this.authService.userId
    if (id == 0) {
      this.router.navigateByUrl('/login')
    }
    this.httpServie.getUserById(id).subscribe({
      next: data => (this.currentUser = data),
      error: err =>
        (this.errorMessage = 'Error in getting user details, ' + err)
    })
    console.log(this.currentUser)
  }

  toLoadDoctors () {
    this.httpServie.getDoctors().subscribe({
      next: data => {
        this.doctors = data
      },
      error: () => {
        this.errorMessage = 'Error in getting doctors'
      }
    })
  }

  toLoadAppointment () {
    this.httpServie.getAllAppointments().subscribe({
      next: () => {
        this.httpServie.getAllAppointments().subscribe({
          next: data => (this.appointments = data),
          error: error => (this.errorMessage = error)
        })
      }
    })
  }
}
