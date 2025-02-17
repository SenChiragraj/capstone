import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../models/appointment.model';
import { HttpService } from '../../../services/http.service';
 
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  filteredDoctors: Doctor[] = [];
 
  constructor(private httpService : HttpService) { }
 
  ngOnInit(): void {
 
    this.toLoadDoctors()
  }
 
  errorMessage : string = '';
 
  doctors: Doctor[] = []
  toLoadDoctors () {
    this.httpService.getDoctors().subscribe({
      next: data => {
        this.doctors = data
        this.filteredDoctors = this.doctors     //modified for the filetered data
      },
      error: () => {
        this.errorMessage = 'Error in getting doctors'
      }
    })
  }
 
  //modified for search
  searchDoc(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    console.log(searchTerm)
    this.filteredDoctors = this.doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(searchTerm) ||
      doctor.specialty.toLowerCase().includes(searchTerm)
    );
  }
 
}
