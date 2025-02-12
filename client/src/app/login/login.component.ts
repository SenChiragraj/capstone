import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  // For test cases
  itemForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private httpService:HttpService
  ) { }

  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      const loginData = this.itemForm.value;
      this.httpService.Login(loginData).subscribe(
        response => {
          console.log('Login successful', response);
          this.router.navigate(['/dashboard']); // Redirect to dashboard or any other page
        },
        error => {
          console.error('Login failed', error);
        }
      );
    } else {
      console.warn('Form is invalid');
    }
  }




  // loginForm: FormGroup

  // constructor (private fb: FormBuilder) {
  //   this.loginForm = this.fb.group({
  //     usernameOrEmail: ['', [Validators.required, Validators.email]],
  //     password: ['', [Validators.required, Validators.minLength(8)]]
  //   })
  // }

  // ngOnInit (): void {}

  // onSubmit (): void {
  //   if (this.loginForm.valid) {
  //     // Handle login logic here
  //     console.log('Form Submitted', this.loginForm.value)
  //   }
  // }

  // getErrorMessage (controlName: string): string {
  //   const control = this.loginForm.get(controlName)
  //   if (control?.hasError('required')) {
  //     return `${controlName} is required`
  //   } else if (control?.hasError('email')) {
  //     return 'Not a valid email'
  //   } else if (control?.hasError('minlength')) {
  //     return 'Password must be at least 8 characters long'
  //   }
  //   return ''
  // }
}