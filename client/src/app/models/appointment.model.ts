import { Doctor } from "./doctor";
import { Patient } from "./patient";

export class Appointment {
  id!: number;
  patient!: Patient;
  doctor!: Doctor;
  appointmentTime!: Date;
  status!: string;
}