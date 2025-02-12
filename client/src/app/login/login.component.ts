import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { HttpService } from '../../services/http.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup

  constructor (private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      usernameOrEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  ngOnInit (): void {}

  onSubmit (): void {
    if (this.loginForm.valid) {
      // Handle login logic here
      console.log('Form Submitted', this.loginForm.value)
    }
  }

  getErrorMessage (controlName: string): string {
    const control = this.loginForm.get(controlName)
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
