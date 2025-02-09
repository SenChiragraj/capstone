package com.wecp.healthcare_appointment_management_system.controller;


import com.wecp.healthcare_appointment_management_system.dto.TimeDto;
import com.wecp.healthcare_appointment_management_system.entity.Appointment;
import com.wecp.healthcare_appointment_management_system.entity.Receptionist;
import com.wecp.healthcare_appointment_management_system.service.AppointmentService;
import com.wecp.healthcare_appointment_management_system.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ReceptionistController {

    @Autowired
    UserService userService;

    @PostMapping("/api/receptionist/register")
    public ResponseEntity<?> registerReceptionist(@RequestBody Receptionist receptionist) {
        // register receptionist
        return new ResponseEntity<>(userService.registerReceptionist(receptionist), HttpStatus.CREATED);
    }


    // @GetMapping("/api/receptionist/appointments")
    // public List<Appointment> getAppointments() {
    //   // get all appointments
    // }

    // @PostMapping("/api/receptionist/appointment")
    // public ResponseEntity<Appointment> scheduleAppointment(@RequestParam Long patientId,
    //                                                        @RequestParam Long doctorId,
    //                                                        @RequestBody TimeDto timeDto) {
    //     // schedule appointment
    // }

    // @PutMapping("/api/receptionist/appointment-reschedule/{appointmentId}")
    // public ResponseEntity<Appointment> rescheduleAppointment(@PathVariable Long appointmentId,
    //                                                          @RequestBody TimeDto timeDto) {
    //     // reschedule appointment
    // }
}
