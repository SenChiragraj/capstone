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
  // Optional: Toggle sidenav (if needed)

  constructor (private authService: AuthService, private router: Router) {}

  ngOnInit (): void {
    this.role = this.authService.getRole || ''
  }

  toggleSidenav (sidenav: any): void {
    sidenav.toggle()
  }

  logout () {
    this.authService.logout()
    this.router.navigateByUrl('/dashboard')
  }
}
