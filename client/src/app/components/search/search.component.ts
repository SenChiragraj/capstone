import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../models/appointment.model';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

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
      },
      error: () => {
        this.errorMessage = 'Error in getting doctors'
      }
    })
  }

}
