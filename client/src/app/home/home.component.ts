import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'
import { User } from '../models/user'
import { HttpService } from '../../services/http.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser!: User
  errorMessage: string = ''
  role: string

  constructor (
    private router: Router,
    private authService: AuthService,
    private httpService: HttpService
  ) {
    this.role = authService.getRole
  }

  ngOnInit (): void {
    if (!this.authService.getLoginStatus) {
      this.router.navigateByUrl('/dashboard')
    }

    this.httpService.getUserById(this.authService.userId).subscribe({
      next: data => (this.currentUser = data),
      error: error => (this.errorMessage = error)
    })

    console.log(this.currentUser)
  }

  bookAppointment (): void {
    this.router.navigate(['/schedule-appointment']) 
  }

  showAllAppointments (): void {
    if (this.role === 'DOCTOR') {
      this.router.navigateByUrl('/doctor-appointment')
    } else if (this.role === 'RECEPTIONIST') {
      this.router.navigateByUrl('/receptionist-appointments')
    } else {
      this.router.navigate(['/patient-appointment']) 
    }
  }

  manageAvailability():void{
  if (this.role === 'DOCTOR') {
    this.router.navigateByUrl('/doctor-availability');
  }
}

}
