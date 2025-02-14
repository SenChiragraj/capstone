import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { RegistrationComponent } from './registration/registration.component'
import { AppComponent } from './app.component'
import { DashbaordComponent } from './dashbaord/dashbaord.component'
import { PatientAppointmentComponent } from './patient-appointment/patient-appointment.component'
import { ScheduleAppointmentComponent } from './schedule-appointment/schedule-appointment.component'
import { DoctorAppointmentComponent } from './doctor-appointment/doctor-appointment.component'
import { DoctorAvailabilityComponent } from './doctor-availability/doctor-availability.component'
import { ReceptionistAppointmentsComponent } from './receptionist-appointments/receptionist-appointments.component'
import { ReceptionistScheduleAppointmentsComponent } from './receptionist-schedule-appointments/receptionist-schedule-appointments.component'
import { HomeComponent } from './home/home.component'
import { FeedbackComponent } from './feedback/feedback.component'
import { ContactComponent } from './contact/contact.component'
import { ErrorComponent } from './error/error.component'
import { DoctorManageMedicalRecordsComponent } from './doctor-manage-medical-records/doctor-manage-medical-records.component'

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashbaordComponent },
  { path: 'patient-appointment', component: PatientAppointmentComponent },
  { path: 'schedule-appointment', component: ScheduleAppointmentComponent },
  { path: 'doctor-appointment', component: DoctorAppointmentComponent },
  { path: 'doctor-availability', component: DoctorAvailabilityComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'feedback', component: FeedbackComponent },

  {
    path: 'receptionist-appointments',
    component: ReceptionistAppointmentsComponent
  },
  {
    path: 'receptionist-schedule-appointments/:appointmentId',
    component: ReceptionistScheduleAppointmentsComponent
  },
  {path:'doctor-manage-medical-records',component:DoctorManageMedicalRecordsComponent},

  { path: '**', component: ErrorComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
