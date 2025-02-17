
import { HttpBackend } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { HttpService } from '../../services/http.service'
import { ThisReceiver } from '@angular/compiler'
import { throwToolbarMixedModesError } from '@angular/material/toolbar'
 
@Component({
  selector: 'app-register',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registerForm!: FormGroup
  errorMessage: string = ''
  toastMessage: string = ''
  role: string = ''
 
  constructor (
    private fb: FormBuilder,
    private router: Router,
    private httpService: HttpService
  ) {}
 
  ngOnInit (): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]{3,}$')]],
      username: ['', [Validators.required, Validators.pattern('^(?![0-9]*$)[a-zA-Z0-9]{3,}$')]],
      phone: ['', [Validators.required, Validators.pattern('^[6-9]\\d{9}$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
      role: ['', Validators.required]
    })
 
    this.registerForm.get('role')?.valueChanges.subscribe(role => {
      this.role = role
      this.updateFormControls(role)
    })
  }
 
  updateFormControls (role: string): void {
    if (role === 'DOCTOR') {
      this.registerForm.addControl(
        'specialty',
        this.fb.control('', Validators.required)
      )
      this.registerForm.addControl(
        'availability',
        this.fb.control('', Validators.required)
      )
    } else {
      this.registerForm.removeControl('specialty')
      this.registerForm.removeControl('availability')
    }
  }
 
  onSubmit (): void {
    if (this.registerForm.valid) {
      if (this.registerForm.value.role === 'DOCTOR') {
        this.httpService.registerDoctors(this.registerForm.value).subscribe({
          next: () => {
            this.router.navigate(['/login'])
          },
          error: error => {
            this.errorMessage = error.error.message
          }
        })
      } else if (this.registerForm.value.role === 'PATIENT') {
        this.httpService.registerPatient(this.registerForm.value).subscribe({
          next: () => {
            this.router.navigate(['/login'])
          },
          error: error => {
            this.errorMessage = error.error
          }
        })
      } else {
        this.httpService
          .registerReceptionist(this.registerForm.value)
          .subscribe({
            next: () => {
              this.router.navigate(['/login'])
            },
            error: error => {
              this.errorMessage = error.error.message
            }
          })
      }
      this.toastMessage = this.errorMessage
        ? 'Registration Failed '
        : 'Registration Successful'
      console.log('Form Submitted', this.registerForm.value)
    }
  }
 
  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);
 
    if (control?.hasError('required')) {
      return `${controlName} is required`;
    } else if (control?.hasError('email')) {
      return 'Not a valid email';
    } else if (control?.hasError('minlength')) {
      return `${controlName} must be at least ${control.errors?.['minlength'].requiredLength} characters long`;
    } else if (control?.hasError('pattern')) {
      if (controlName === 'phone') {
        return 'Phone number must start with 6-9 and be 10 digits long';
      } else if (controlName === 'username') {
        return 'Username must be alphanumeric and at least 3 characters long';
      } else if (controlName === 'password') {
        return 'Password must be 8+ chars with uppercase, lowercase, number, and special character';
      } else if (controlName === 'name') {
        return 'Name must be letters only, with a minimum length of 3 characters';
      }
      return 'Invalid format';
    }
    return '';
  }
 
}