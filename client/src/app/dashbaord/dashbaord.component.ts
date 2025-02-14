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

  // Filter variables can be added later for implementation
  selectedSpecialty: string = ''
  selectedGender: string = ''
  selectedLanguage: string = ''
  selectedSortBy: string = ''

  ngOnInit (): void {
    console.log(this.authService.getLoginStatus)
    if (this.authService.getLoginStatus) {
      this.router.navigateByUrl('/home')
    }
    this.toLoadDoctors()
  }

  bookAppointment (): void {
    if (this.authService.getLoginStatus)
      this.router.navigate(['/schedule-appointment'])
    this.router.navigateByUrl('/login') // Adjust the route as needed
  }

  // toLoadPatientDashboard () {
  //   this.toLoadDoctors()
  // }

  // toLoadReceptionistDashboard () {
  //   this.toLoadAppointment()
  // }

  // toLoadDoctorDashboard () {
  //   this.toLoadAppointment()
  // }

  // toLoadUserById () {
  //   const id = this.authService.userId
  //   if (id == 0) {
  //     this.router.navigateByUrl('/login')
  //   }
  //   this.httpServie.getUserById(id).subscribe({
  //     next: data => (this.currentUser = data),
  //     error: err =>
  //       (this.errorMessage = 'Error in getting user details, ' + err)
  //   })
  //   console.log(this.currentUser)
  // }

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

  // toLoadAppointment () {
  //   this.httpServie.getAllAppointments(this.currentUser.id).subscribe({
  //     next: () => {
  //       this.httpServie.getAllAppointments(this.currentUser.id).subscribe({
  //         next: data => (this.appointments = data),
  //         error: error => (this.errorMessage = error)
  //       })
  //     }
  //   })
  // }
}
