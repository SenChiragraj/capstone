import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { AuthService } from './auth.service'
import { Appointment } from '../app/models/appointment.model'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // public serverName = 'http://your-server-url' // Replace with your server URL

  serverName =
    'https://ec2-13-200-15-230.projects.wecreateproblems.com/proxy/5000'

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

  getUserById (id: number) {
    return this.http.get<any>(`${this.serverName}/api/user/${id}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    })
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

  //for testcase

  //   constructor (private http: HttpClient, private authService: AuthService) {}

  //   private getHeaders (): HttpHeaders {
  //     return new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${this.authService.getToken()}`
  //     })
  //   }

  //   registerPatient (details: any): Observable<any> {
  //     return this.http.post(`${this.serverName}/api/patient/register`, details, {
  //       headers: this.getHeaders()
  //     })
  //   }

  //   registerDoctors (details: any): Observable<any> {
  //     return this.http.post(`${this.serverName}/api/doctors/register`, details, {
  //       headers: this.getHeaders()
  //     })
  //   }

  //   registerReceptionist (details: any): Observable<any> {
  //     return this.http.post(
  //       `${this.serverName}/api/receptionist/register`,
  //       details,
  //       {
  //         headers: this.getHeaders()
  //       }
  //     )
  //   }

  //   getDoctors (): Observable<any> {
  //     return this.http.get(`${this.serverName}/api/patient/doctors`, {
  //       headers: this.getHeaders()
  //     })
  //   }

  //   ScheduleAppointment (details: any): Observable<any> {
  //     return this.http.post(
  //       `${this.serverName}/api/patient/appointment?patientId=${details.patientId}&doctorId=${details.doctorId}`,
  //       details,
  //       { headers: this.getHeaders() }
  //     )
  //   }

  //   ScheduleAppointmentByReceptionist (details: any): Observable<any> {
  //     return this.http.post(
  //       `${this.serverName}/api/receptionist/appointment?patientId=${details.patientId}&doctorId=${details.doctorId}`,
  //       details,
  //       { headers: this.getHeaders() }
  //     )
  //   }

  //   reScheduleAppointment (
  //     appointmentId: number,
  //     formvalue: any
  //   ): Observable<any> {
  //     return this.http.put(
  //       `${this.serverName}/api/receptionist/appointment-reschedule/${appointmentId}`,
  //       formvalue,
  //       { headers: this.getHeaders() }
  //     )
  //   }

  //   getAllAppointments (): Observable<any> {
  //     return this.http.get(`${this.serverName}/api/receptionist/appointments`, {
  //       headers: this.getHeaders()
  //     })
  //   }

  //   getAppointmentByDoctor (doctorId: number): Observable<any> {
  //     return this.http.get(
  //       `${this.serverName}/api/doctor/appointments?doctorId=${doctorId}`,
  //       { headers: this.getHeaders() }
  //     )
  //   }

  //   getAppointmentByPatient (patientId: number): Observable<any> {
  //     return this.http.get(
  //       `${this.serverName}/api/patient/appointments?patientId=${patientId}`,
  //       { headers: this.getHeaders() }
  //     )
  //   }

  //   updateDoctorAvailability (
  //     doctorId: number,
  //     availability: string
  //   ): Observable<any> {
  //     return this.http.post(
  //       `${this.serverName}/api/doctor/availability?doctorId=${doctorId}&availability=${availability}`,
  //       {},
  //       { headers: this.getHeaders() }
  //     )
  //   }

  //   Login (loginDetails: any): Observable<any> {
  //     return this.http.post(`${this.serverName}/api/user/login`, loginDetails, {
  //       headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  //     })
  //   }

  //   post (url: string, data: any): Observable<any> {
  //     return this.http.post(url, data)
  //   }

  //   scheduleAppointment (url: string, data: any, token: string): Observable<any> {
  //     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
  //     return this.http.post(url, data, { headers })
  //   }

  //   register (url: string, data: any, token: string): Observable<any> {
  //     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
  //     return this.http.post(url, data, { headers })
  //   }

  //   // for test
  //   getAppointmentsByPatient (patientId: number): Observable<Appointment[]> {
  //     return this.http.get<Appointment[]>(
  //       `${this.serverName}/api/patient/appointments?patientId=${patientId}`,
  //       {
  //         headers: this.getHeaders()
  //       }
  //     )
  //   }

  //   // for test
  //   rescheduleAppointment (
  //     appointmentId: number,
  //     newTime: string
  //   ): Observable<Appointment> {
  //     const body = { time: newTime }
  //     return this.http.put<Appointment>(
  //       `${this.serverName}/api/receptionist/appointment-reschedule/${appointmentId}`,
  //       body,
  //       {
  //         headers: this.getHeaders()
  //       }
  //     )
  //   }
}
