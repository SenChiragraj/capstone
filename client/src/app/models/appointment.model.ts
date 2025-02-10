export class Appointment {
    id: number;
    patientId: number;
    doctorId: number;
    appointmentTime: Date;
    status: string;
  
    constructor(
      id: number,
      patientId: number,
      doctorId: number,
      appointmentTime: Date,
      status: string
    ) {
      this.id = id;
      this.patientId = patientId;
      this.doctorId = doctorId;
      this.appointmentTime = appointmentTime;
      this.status = status;
    }
  }
  