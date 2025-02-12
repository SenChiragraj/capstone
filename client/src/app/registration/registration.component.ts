import { HttpBackend } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { HttpService } from '../../services/http.service'

@Component({
  selector: 'app-register',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup
  errorMessage: string = ''

  constructor (
    private fb: FormBuilder,
    private router: Router,
    private httpService: HttpService
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['', Validators.required]
    })
  }

  ngOnInit (): void {}

  onSubmit (): void {
    if (this.registerForm.valid) {
      this.httpService
        .post(
          `/api/${this.registerForm.value.role}/register`,
          this.registerForm.value
        )
        .subscribe({
          next: () => {
            this.router.navigate(['/login'])
          },
          error: error => {
            this.errorMessage = error.error.message
          }
        })
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
