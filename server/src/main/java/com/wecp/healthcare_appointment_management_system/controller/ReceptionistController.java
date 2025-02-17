package com.wecp.healthcare_appointment_management_system.controller;

import com.wecp.healthcare_appointment_management_system.dto.TimeDto;
import com.wecp.healthcare_appointment_management_system.entity.Appointment;
import com.wecp.healthcare_appointment_management_system.entity.Doctor;
import com.wecp.healthcare_appointment_management_system.entity.Patient;
import com.wecp.healthcare_appointment_management_system.service.AppointmentService;
import com.wecp.healthcare_appointment_management_system.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReceptionistController {

    @Autowired
    private UserService userService;

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping("/api/receptionist/appointments")
    public List<Appointment> getAppointments() {
        // Get all appointments
        return appointmentService.findAllAppointments();
    }

    @PostMapping("/api/receptionist/appointment")
    public ResponseEntity<Appointment> scheduleAppointment(@RequestParam Long patientId,
                                                           @RequestParam Long doctorId,
                                                           @RequestBody TimeDto timeDto) {
        // Retrieve patient and doctor entities
        Patient patient = userService.findPatientById(patientId);
        Doctor doctor = userService.findDoctorById(doctorId);

        if (patient == null || doctor == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // Create a new appointment
        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setAppointmentTime(timeDto.getTime());
        appointment.setStatus("Scheduled");

        // Save the appointment
        appointmentService.saveAppointment(appointment);

        return new ResponseEntity<>(appointment, HttpStatus.CREATED);
    }

    @PutMapping("/api/receptionist/appointment-reschedule/{appointmentId}")
    public ResponseEntity<Appointment> rescheduleAppointment(@PathVariable Long appointmentId,
                                                             @RequestBody TimeDto timeDto) {
        // Find the existing appointment
        Appointment appointment = appointmentService.findAppointmentById(appointmentId);

        if (appointment == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // Update the appointment time
        appointment.setAppointmentTime(timeDto.getTime());

        // Save the updated appointment
        appointmentService.saveAppointment(appointment);

        return new ResponseEntity<>(appointment, HttpStatus.OK);
    }

    
    @GetMapping("/api/receptionist/appointments/{appointmentId}")
        public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long appointmentId) {
            Appointment appointment = appointmentService.getAppointmentById(appointmentId);
            return ResponseEntity.ok(appointment);
        }
    
        @PutMapping("/api/receptionist/appointment/{appointmentId}")
        public ResponseEntity<Appointment> updateAppointment(
                @PathVariable Long appointmentId,
                @RequestBody Appointment appointmentDetails) {
                    System.out.println("Appointment Time in R Controller : "+appointmentDetails.getAppointmentTime());
            Appointment updatedAppointment = appointmentService.updateAppointment(appointmentId, appointmentDetails);
            return ResponseEntity.ok(updatedAppointment);
        }


}
