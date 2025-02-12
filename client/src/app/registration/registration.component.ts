// import { Component, OnInit } from '@angular/core'
// import { FormBuilder, FormGroup, Validators } from '@angular/forms'

// @Component({
//   selector: 'app-register',
//   templateUrl: './registration.component.html',
//   styleUrls: ['./registration.component.scss']
// })
// export class RegistrationComponent implements OnInit {
//   registerForm: FormGroup

//   constructor (private fb: FormBuilder) {
//     this.registerForm = this.fb.group({
//       name: ['', Validators.required],
//       username: ['', Validators.required],
//       phone: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(8)]],
//       role: ['', Validators.required]
//     })
//   }

//   ngOnInit (): void {}

//   onSubmit (): void {
//     if (this.registerForm.valid) {
//       // Handle registration logic here
//       console.log('Form Submitted', this.registerForm.value)
//     }
//   }

//   getErrorMessage (controlName: string): string {
//     const control = this.registerForm.get(controlName)
//     if (control?.hasError('required')) {
//       return `${controlName} is required`
//     } else if (control?.hasError('email')) {
//       return 'Not a valid email'
//     } else if (control?.hasError('minlength')) {
//       return 'Password must be at least 8 characters long'
//     }
//     return ''
//   }
// }

import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HttpService } from '../../services/http.service'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  itemForm!: FormGroup

  constructor (
    private fb: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService
  ) {}

  ngOnInit (): void {
    this.itemForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: [null, Validators.required],
      username: ['', Validators.required],
      specialty: [''],
      availability: ['']
    })

    this.onRoleChange()
  }

  onRoleChange (): void {
    this.itemForm.get('role')?.valueChanges.subscribe(role => {
      const specialtyControl = this.itemForm.get('specialty')
      const availabilityControl = this.itemForm.get('availability')

      if (role === 'DOCTOR') {
        specialtyControl?.setValidators([Validators.required])
        availabilityControl?.setValidators([Validators.required])
      } else {
        specialtyControl?.clearValidators()
        availabilityControl?.clearValidators()
      }

      specialtyControl?.updateValueAndValidity()
      availabilityControl?.updateValueAndValidity()
    })
  }

  register (): void {
    if (this.itemForm.valid) {
      const token = this.authService.getToken()
      this.httpService
        .register('/api/register', this.itemForm.value, 'token')
        .subscribe(
          response => {
            console.log('Registration successful', response)
          },
          error => {
            console.error('Error during registration', error)
          }
        )
    }
  }
}
