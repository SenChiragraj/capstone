import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public serverName = 'http://your-server-url' // Replace with your server URL

  constructor (private http: HttpClient, private authService: AuthService) {}

  private getHeaders (): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    })
  }

  registerPatient (details: any): Observable<any> {
    return this.http.post<any>(
      `${this.serverName}/api/patient/register`,
      details,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    )
  }

  registerDoctors (details: any): Observable<any> {
    return this.http.post<any>(
      `${this.serverName}/api/doctors/register`,
      details,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    )
  }

  registerReceptionist (details: any): Observable<any> {
    return this.http.post<any>(
      `${this.serverName}/api/receptionist/register`,
      details,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    )
  }

  getDoctors (): Observable<any> {
    return this.http.get<any>(`${this.serverName}/api/patient/doctors`, {
      headers: this.getHeaders()
    })
  }

  ScheduleAppointment (details: any): Observable<any> {
    const { patientId, doctorId } = details
    return this.http.post<any>(
      `${this.serverName}/api/patient/appointment?patientId=${patientId}&doctorId=${doctorId}`,
      details,
      {
        headers: this.getHeaders()
      }
    )
  }

  ScheduleAppointmentByReceptionist (details: any): Observable<any> {
    const { patientId, doctorId } = details
    return this.http.post<any>(
      `${this.serverName}/api/receptionist/appointment?patientId=${patientId}&doctorId=${doctorId}`,
      details,
      {
        headers: this.getHeaders()
      }
    )
  }

  reScheduleAppointment (
    appointmentId: number,
    formvalue: any
  ): Observable<any> {
    return this.http.put<any>(
      `${this.serverName}/api/receptionist/appointment-reschedule/${appointmentId}`,
      formvalue,
      {
        headers: this.getHeaders()
      }
    )
  }

  getAllAppointments (): Observable<any> {
    return this.http.get<any>(
      `${this.serverName}/api/receptionist/appointments`,
      {
        headers: this.getHeaders()
      }
    )
  }

  getAppointmentByDoctor (doctorId: number): Observable<any> {
    return this.http.get<any>(
      `${this.serverName}/api/doctor/appointments?doctorId=${doctorId}`,
      {
        headers: this.getHeaders()
      }
    )
  }

  getAppointmentByPatient (patientId: number): Observable<any> {
    return this.http.get<any>(
      `${this.serverName}/api/patient/appointments?patientId=${patientId}`,
      {
        headers: this.getHeaders()
      }
    )
  }

  updateDoctorAvailability (
    doctorId: number,
    availability: string
  ): Observable<any> {
    return this.http.post<any>(
      `${this.serverName}/api/doctor/availability?doctorId=${doctorId}&availability=${availability}`,
      {},
      {
        headers: this.getHeaders()
      }
    )
  }

  Login (loginDetails: any): Observable<any> {
    return this.http.post<any>(
      `${this.serverName}/api/user/login`,
      loginDetails,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    )
  }
}
