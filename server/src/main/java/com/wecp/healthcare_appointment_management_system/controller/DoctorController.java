package com.wecp.healthcare_appointment_management_system.controller;

import com.wecp.healthcare_appointment_management_system.entity.Appointment;
import com.wecp.healthcare_appointment_management_system.entity.Doctor;
import com.wecp.healthcare_appointment_management_system.entity.MedicalRecord;
import com.wecp.healthcare_appointment_management_system.entity.Patient;
import com.wecp.healthcare_appointment_management_system.service.AppointmentService;
import com.wecp.healthcare_appointment_management_system.service.DoctorService;
import com.wecp.healthcare_appointment_management_system.service.MedicalRecordService;
import com.wecp.healthcare_appointment_management_system.service.PatientService;
import com.wecp.healthcare_appointment_management_system.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private UserService uService;

    @Autowired
    private PatientService patientService;

    @Autowired
    private MedicalRecordService medicalRecordService;

    // @PostMapping("/api/doctor/register")
    // public ResponseEntity<Doctor> registerDoctor(@RequestBody Doctor doctor) {
    //     // register doctor
    //     return new ResponseEntity<>(uService.registerDoctor(doctor), HttpStatus.CREATED);
    // }


    @GetMapping("/api/doctor/appointments")
    public ResponseEntity<List<Appointment>> viewAppointments(@RequestParam Long doctorId) {
        // view appointments
        List<Appointment> appointments= doctorService.viewAppointments(doctorId);
        return new ResponseEntity<>(appointments,HttpStatus.OK);


    }

    @PostMapping("/api/doctor/availability")
    public ResponseEntity<Doctor> manageAvailability(@RequestParam Long doctorId, @RequestParam String availability) {
        // manage availablity
        Doctor updatedDoctor = doctorService.manageAvailability(doctorId, availability);
        return new ResponseEntity<>(updatedDoctor, HttpStatus.OK);

    }

@GetMapping("/api/doctor/patients-with-appointments")
    public ResponseEntity<List<Patient>> getPatientsWithAppointments(@RequestParam("doctorId") Long doctorId) {
        List<Patient> patients = patientService.findPatientsByDoctorId(doctorId);
        return ResponseEntity.ok(patients);
    }

    @PostMapping("/api/doctor/create-medical-record")
    public ResponseEntity<Void> createMedicalRecord(@RequestBody MedicalRecord medicalRecord) {
        medicalRecordService.saveMedicalRecord(medicalRecord);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/api/doctor/update-medical-record")
    public ResponseEntity<Void> updateMedicalRecord(@RequestBody MedicalRecord medicalRecord) {
        medicalRecordService.updateMedicalRecord(medicalRecord);
        return ResponseEntity.ok().build();
    }
    
    @DeleteMapping("/delete-medical-record/{id}")
        public ResponseEntity<Void> deleteMedicalRecord(@PathVariable Long id) {
        medicalRecordService.deleteMedicalRecord(id);
        return ResponseEntity.ok().build();
    }

}
