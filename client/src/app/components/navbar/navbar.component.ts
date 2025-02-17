import { Component, OnInit } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { AuthService } from '../../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  role!: string
  isLoginOrRegistrationRoute : boolean = false;
  // Optional: Toggle sidenav (if needed)

  constructor (private authService: AuthService, private router: Router) {}

  ngOnInit (): void {
    this.role = this.authService.getRole || '';

    this.router.events.subscribe((event) => {      
          if (this.router.url === '/login' || this.router.url === '/registration') {
            this.isLoginOrRegistrationRoute = true;
          } else {
            this.isLoginOrRegistrationRoute = false;
          }
        });
  }

  toggleSidenav (sidenav: any): void {
    sidenav.toggle()
  }

  logout () {
    this.authService.logout()
    this.router.navigateByUrl('/dashboard')
  }
}
