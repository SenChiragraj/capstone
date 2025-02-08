package com.wecp.healthcare_appointment_management_system.entity;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Doctor extends User {
   // implement doctor entity
  
    private Set<Appointment> appointments;
    
    private Set<MedicalRecord> medicalRecords;

    private String specialty;
    private String availability;

    public Doctor(){
        super(); // Calling the constructor of the superclass (User)
    }

    // public Doctor(Long id,String username, String password, String email, String role, String specialty, String availability) {
    //     super(id,username, password, email, role); // Calling the constructor of the superclass (User)
    //     this.specialty = specialty;
    //     this.availability = availability;
    // }
       

    public Set<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(Set<Appointment> appointments) {
        this.appointments = appointments;
    }

    public Set<MedicalRecord> getMedicalRecords() {
        return medicalRecords;
    }

    public void setMedicalRecords(Set<MedicalRecord> medicalRecords) {
        this.medicalRecords = medicalRecords;
    }

    public String getSpecialty() {
        return specialty;
    }

    public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }


}
