import { ApplicationInitStatus, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoginComponent } from './login/login.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RegistrationComponent } from './registration/registration.component'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { HttpService } from '../services/http.service'
import { DashbaordComponent } from './dashbaord/dashbaord.component'
import { PatientAppointmentComponent } from './patient-appointment/patient-appointment.component'

import { ScheduleAppointmentComponent } from './schedule-appointment/schedule-appointment.component'

import { DoctorAppointmentComponent } from './doctor-appointment/doctor-appointment.component'
import { DoctorAvailabilityComponent } from './doctor-availability/doctor-availability.component'
import { ReceptionistAppointmentsComponent } from './receptionist-appointments/receptionist-appointments.component'
import { ReceptionistScheduleAppointmentsComponent } from './receptionist-schedule-appointments/receptionist-schedule-appointments.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatRadioModule } from '@angular/material/radio'
import { RouterModule } from '@angular/router'
import { MatOptionModule } from '@angular/material/core'
import { NavbarComponent } from './components/navbar/navbar.component'
import { FooterComponent } from './components/footer/footer.component'
import { SkeletonComponent } from './components/skeleton/skeleton.component'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu'
import { DatePipe } from '@angular/common'
import { MatSelectModule } from '@angular/material/select'
import { ContactComponent } from './contact/contact.component'
import { FeedbackComponent } from './feedback/feedback.component'
import { HomeComponent } from './home/home.component'
import { ErrorComponent } from './error/error.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { SearchComponent } from './components/search/search.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    DashbaordComponent,
    PatientAppointmentComponent,
    ScheduleAppointmentComponent,
    DoctorAvailabilityComponent,
    DoctorAppointmentComponent,
    ReceptionistAppointmentsComponent,
    ReceptionistScheduleAppointmentsComponent,
    NavbarComponent,
    FooterComponent,
    SkeletonComponent,
    ContactComponent,
    FeedbackComponent,
    HomeComponent,
    ErrorComponent,
    AboutComponent,
    ServicesComponent,
    SearchComponent,
    TestimonialsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatButtonToggleModule,
    MatCardModule, // Add MatCardModule to imports
    MatRadioModule,
    MatOptionModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule
  ],
  providers: [HttpService, HttpClientModule, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
