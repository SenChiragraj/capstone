import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.scss']
})
export class DashbaordComponent implements OnInit {
  avator = "../../assets/avatar.png";
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
    }
  ]

  constructor (private router: Router) {}

  ngOnInit (): void {}

  bookAppointment (): void {
    this.router.navigate(['/book-appointment']) // Adjust the route as needed
  }

  showAllAppointments (): void {
    this.router.navigate(['/all-appointments']) // Adjust the route as needed
  }
}
