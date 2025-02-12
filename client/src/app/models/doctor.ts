import { Appointment } from "./appointment.model";
import { MedicalRecord } from "./medical-record";
import { User } from "./user";

export class Doctor extends User {
    appointments!: Set<Appointment>;
    medicalRecords!: Set<MedicalRecord>;
    specialty!: string;
    availability!: string;
  }