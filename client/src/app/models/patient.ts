import { Appointment } from "./appointment.model";
import { MedicalRecord } from "./medical-record";
import { User } from "./user";

export class Patient extends User {
  override id!: number
  }