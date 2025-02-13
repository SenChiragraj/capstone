import { User } from "./user";

export class Doctor extends User {
    override id!:number
    specialty!: string;
    availability!: string;
  }