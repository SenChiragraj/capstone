export class User {
    id!: number;
    name!:string;
    phone!: number;
    username!: string;
    password!: string;
    email!: string;
    role!: 'PATIENT' | 'DOCTOR' | 'RECEPTIONIST';
}
