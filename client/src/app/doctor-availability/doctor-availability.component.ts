import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HttpService } from '../../services/http.service'

@Component({
  selector: 'app-doctor-availability',
  templateUrl: './doctor-availability.component.html',
  styleUrls: ['./doctor-availability.component.scss']
})
export class DoctorAvailabilityComponent implements OnInit {
  availabilityForm: FormGroup;

  constructor(private fb: FormBuilder, private httpService: HttpService) {
    this.availabilityForm = this.fb.group({
      availability: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.availabilityForm.valid) {
      const availability = this.availabilityForm.get('availability')?.value;
      const userIdString = localStorage.getItem('userId');
      const userId = userIdString ? parseInt(userIdString, 10) : 0;
      this.httpService.updateDoctorAvailability(userId, availability).subscribe(
        () => {
          alert('Availability updated successfully!');
        },
        error => {
          alert('Failed to update availability.');
        }
      );
    }
  }
}