import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.scss']
})
export class DashbaordComponent implements OnInit {
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

  constructor () {}

  ngOnInit (): void {}
}
