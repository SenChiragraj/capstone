import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loginForm !: FormGroup;
  errorMessage: string = '';
  toastMessage: string = '';
  toastSeverity: string = ''; // To track if it's a success or error
  bootstrap: any;


  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.httpService.Login(this.loginForm.value).subscribe({
        next: response => {
          console.log('Login Response', response);
          if (response.token) {
            this.authService.saveToken(response.token);
            this.authService.saveUserId(response.userId);
            this.authService.SetRole(response.role);
            this.router.navigate(['/home']);
          }
        },
        error: error => {
          console.log(error.error);
          
          this.errorMessage = error.error; // Set the error message
        }
      });
      console.log('Form Submitted', this.loginForm.value);
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName} is required`;
    } else if (control?.hasError('minlength')) {
      return 'Password must be at least 8 characters long';
    }
    return '';
  }

}
