package com.wecp.healthcare_appointment_management_system.controller;

import com.wecp.healthcare_appointment_management_system.dto.TimeDto;
import com.wecp.healthcare_appointment_management_system.entity.Appointment;
import com.wecp.healthcare_appointment_management_system.entity.Doctor;
import com.wecp.healthcare_appointment_management_system.entity.MedicalRecord;
import com.wecp.healthcare_appointment_management_system.entity.Patient;
import com.wecp.healthcare_appointment_management_system.service.AppointmentService;
import com.wecp.healthcare_appointment_management_system.service.DoctorService;
import com.wecp.healthcare_appointment_management_system.service.MedicalRecordService;
import com.wecp.healthcare_appointment_management_system.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PatientController {

    @Autowired
    UserService userService;

    @Autowired
    DoctorService doctorService;

    @Autowired
    AppointmentService appointmentService;

    @Autowired
    MedicalRecordService medicalRecordService;

    @GetMapping("/api/patient/doctors")
    public ResponseEntity<List<Doctor>> getDoctors() {
        // Get all doctors
        return new ResponseEntity<>(doctorService.getAllDoctor(), HttpStatus.OK);
    }

    @PostMapping("/api/patient/appointment")
    public ResponseEntity<?> scheduleAppointment(@RequestParam Long patientId,
                                                 @RequestParam Long doctorId,
                                                 @RequestBody TimeDto timeDto) {
        // Schedule appointment
        Patient patient = userService.findPatientById(patientId);
        Doctor doctor = doctorService.findDoctorById(doctorId);

        if (patient == null || doctor == null) {
            return new ResponseEntity<>("Invalid patient or doctor ID", HttpStatus.BAD_REQUEST);
        }

        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setAppointmentTime(timeDto.getTime());
        appointment.setStatus("Scheduled");

        appointmentService.saveAppointment(appointment);

        return new ResponseEntity<>("Appointment scheduled successfully", HttpStatus.OK);
    }

    @GetMapping("/api/patient/appointments")
    public ResponseEntity<List<Appointment>> getAppointmentsByPatientId(@RequestParam Long patientId) {
        // Get appointments by patient ID
        List<Appointment> appointments = appointmentService.findAppointmentsByPatientId(patientId);
        if (appointments == null || appointments.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

    @GetMapping("/api/patient/medicalrecords")
    public ResponseEntity<List<MedicalRecord>> viewMedicalRecords(@RequestParam Long patientId) {
        // View medical records
        List<MedicalRecord> medicalRecords = medicalRecordService.findMedicalRecordsByPatientId(patientId);
        if (medicalRecords == null || medicalRecords.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(medicalRecords, HttpStatus.OK);
    }

    @PostMapping("/api/patient/medicalrecord")
    public ResponseEntity<?> addMedicalRecord(@RequestParam Long patientId,
            @RequestBody MedicalRecord medicalRecord) {
        // Add medical record
        Patient patient = userService.findPatientById(patientId);
        if (patient == null) {
            return new ResponseEntity<>("Invalid patient ID", HttpStatus.BAD_REQUEST);
        }
        medicalRecord.setPatient(patient);
        medicalRecordService.saveMedicalRecord(medicalRecord);
        return new ResponseEntity<>("Medical record added successfully", HttpStatus.OK);
    }

    @DeleteMapping("/api/patient/medicalrecord")
    public ResponseEntity<?> deleteMedicalRecord(@RequestParam Long medicalRecordId) {
        // Delete medical record
        medicalRecordService.deleteMedicalRecord(medicalRecordId);
        return new ResponseEntity<>("Medical record deleted successfully", HttpStatus.OK);
    }

    @PutMapping("/api/patient/medicalrecord")
    public ResponseEntity<?> updateMedicalRecord(@RequestParam Long medicalRecordId,
            @RequestBody MedicalRecord medicalRecord) {
        // Update medical record
        MedicalRecord existingMedicalRecord = medicalRecordService.getMedicalRecordById(medicalRecordId);
        if (existingMedicalRecord == null) {
            return new ResponseEntity<>("Invalid medical record ID", HttpStatus.BAD_REQUEST);
        }

        medicalRecord.setId(medicalRecordId);
        medicalRecordService.saveMedicalRecord(medicalRecord);

        return new ResponseEntity<>("Medical record updated successfully", HttpStatus.OK);
    }
}
