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
      name: ['', Validators.required],
      username: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
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
            this.errorMessage = error.error.message
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

  getErrorMessage (controlName: string): string {
    const control = this.registerForm.get(controlName)
    if (control?.hasError('required')) {
      return `${controlName} is required`
    } else if (control?.hasError('email')) {
      return 'Not a valid email'
    } else if (control?.hasError('minlength')) {
      return 'Password must be at least 8 characters long'
    }
    return ''
  }
}
