import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.scss']
})
export class DashbaordComponent implements OnInit {
  avator = '../../assets/avatar.png'
  doctors = [
    {
      name: 'Dr. Anil Kumar',
      specialty: 'Cardiologist',
      image: 'assets/doctor1.jpg'
    },
    {
      name: 'Dr. Priya Sharma',
      specialty: 'Dermatologist',
      image: 'assets/doctor2.jpg'
    },
    {
      name: 'Dr. Rajesh Mehta',
      specialty: 'Orthopedic',
      image: 'assets/doctor3.jpg'
    },
    {
      name: 'Dr. Priya Sharma',
      specialty: 'Dermatologist',
      image: 'assets/doctor2.jpg'
    },
    {
      name: 'Dr. Rajesh Mehta',
      specialty: 'Orthopedic',
      image: 'assets/doctor3.jpg'
    }
  ]

  patients = [
    { name: 'John Doe' },
    { name: 'Jane Smith' },
    { name: 'James Brown' },
    { name: 'Emily Johnson' },
    { name: 'Michael Clark' },
    { name: 'Sarah Davis' },
    { name: 'David Martinez' },
    { name: 'Laura Garcia' }
  ]
  constructor (private router: Router, private authService: AuthService) {}

  ngOnInit (): void {
    console.log(this.authService.getLoginStatus)

    if (!this.authService.getLoginStatus) {
      this.router.navigateByUrl('/login')
    }
  }

  bookAppointment (): void {
    this.router.navigate(['/book-appointment']) // Adjust the route as needed
  }

  showAllAppointments (): void {
    this.router.navigate(['/all-appointments']) // Adjust the route as needed
  }
}
