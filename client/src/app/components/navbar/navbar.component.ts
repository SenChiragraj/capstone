import { Component, OnInit } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLoggedIn = false // Update this based on your authentication logic

  // Optional: Toggle sidenav (if needed)
  toggleSidenav (sidenav: any): void {
    sidenav.toggle()
  }
}
