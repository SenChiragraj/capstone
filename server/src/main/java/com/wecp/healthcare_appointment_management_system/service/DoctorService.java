package com.wecp.healthcare_appointment_management_system.service;


import com.wecp.healthcare_appointment_management_system.entity.Appointment;
import com.wecp.healthcare_appointment_management_system.entity.Doctor;
import com.wecp.healthcare_appointment_management_system.exception.DoctorNotFoundException;
import com.wecp.healthcare_appointment_management_system.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DoctorService  {

    @Autowired
    private DoctorRepository doctorRepository;

    public List<Doctor> getAllDoctor() {
        return doctorRepository.findAll();
    }

    public List<Appointment> viewAppointments(Long doctorId){
        Doctor doctor = doctorRepository.findById(doctorId).orElseThrow(() -> new DoctorNotFoundException("Doctor not found with id: "+doctorId));
        return new ArrayList<>(doctor.getAppointments());
    }

    public Doctor manageAvailability(Long doctorId, String availability) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new DoctorNotFoundException("Doctor not found with id: " + doctorId));
        doctor.setAvailability(availability);
        return doctorRepository.save(doctor);
    }

    public Doctor findDoctorById(Long doctorId) {
        return doctorRepository.findById(doctorId).orElse(null);
    }







}
