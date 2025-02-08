import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  footerSections = [
    {
      title: 'About Us',
      items: ['Our Story', 'Careers', 'Contact Us']
    },
    {
      title: 'Services',
      items: ['Health Check-ups', 'Consultations', 'Emergency Services']
    },
    {
      title: 'Resources',
      items: ['Blog', 'FAQs', 'Patient Portal']
    },
    {
      title: 'Legal',
      items: ['Privacy Policy', 'Terms of Service']
    }
  ]
}
