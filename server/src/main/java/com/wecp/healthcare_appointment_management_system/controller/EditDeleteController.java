package com.wecp.healthcare_appointment_management_system.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wecp.healthcare_appointment_management_system.service.AppointmentService;
import com.wecp.healthcare_appointment_management_system.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api")
public class EditDeleteController {

    @Autowired
    UserService userService;

    @Autowired
    AppointmentService appointmentService;

    @GetMapping("/all/patient")
    public ResponseEntity<?> getAllPatients() {
        return new ResponseEntity<>(userService.getAllPatients(), HttpStatus.OK);
    }
    @GetMapping("/all/doctors")
    public ResponseEntity<?> getAllDoctors() {
        return new ResponseEntity<>(userService.getAllDoctors(), HttpStatus.OK);
    }
    @GetMapping("/all/receptionist")
    public ResponseEntity<?> getAll() {
        return new ResponseEntity<>(userService.getAllReceptionists(), HttpStatus.OK);
    }

    @DeleteMapping("/delete/appointment/{id}")
    public ResponseEntity<?> deleteAppointment (@PathVariable Long id) {
        appointmentService.deleteByAppointmentId(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // @DeleteMapping("/all/patient/{id}")
    // public ResponseEntity<?> deletePatient(@PathVariable Long id) {
    //     userService.deletePatient(id);
    //     return new ResponseEntity<>( HttpStatus.OK);
    // }
    // @DeleteMapping("/all/doctors/{id}")
    // public ResponseEntity<?> deleteDoctors(@PathVariable Long id) {
    //     userService.deleteDoctor(id);
    //     return new ResponseEntity<>( HttpStatus.OK);
    // }
    // @DeleteMapping("/all/receptionist/{id}")
    // public ResponseEntity<?> deleteReceptionist(@PathVariable Long id) {
    //     userService.deleteReceptionist(id);
    //     return new ResponseEntity<>(HttpStatus.OK);
    // }


    
}
