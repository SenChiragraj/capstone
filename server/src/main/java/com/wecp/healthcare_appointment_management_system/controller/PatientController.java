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
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;


public class PatientController {

    @Autowired
    UserService userService;

    @PostMapping("/api/patient/register")
    public ResponseEntity<?> registerPatient(@RequestBody Patient patient) {
        // register patient
        return new ResponseEntity<>(userService.registerPatient(patient), HttpStatus.OK);
    }

    // @GetMapping("/api/patient/get")

    // @GetMapping("/api/patient/doctors")
    // public ResponseEntity<List<Doctor>> getDoctors() {
    //     // get all doctors
    //     return new ResponseEntity<>()
    // }

    // @PostMapping("/api/patient/appointment")
    // public ResponseEntity<?> scheduleAppointment(@RequestParam Long patientId,
    //                                              @RequestParam Long doctorId,
    //                                              @RequestBody TimeDto timeDto) {
    //   // schedule appointment
    // }

    // @GetMapping("/api/patient/appointments")
    // public ResponseEntity<List<Appointment>> getAppointmentsByPatientId(@RequestParam Long patientId) {
    //     // get appointments by patient id
    // }

    // @GetMapping("/api/patient/medicalrecords")
    // public ResponseEntity<List<MedicalRecord>> viewMedicalRecords(@RequestParam Long patientId) {
    //     // view medical records
    // }
}
