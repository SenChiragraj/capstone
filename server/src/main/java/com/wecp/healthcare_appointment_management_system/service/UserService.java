package com.wecp.healthcare_appointment_management_system.service;

import com.wecp.healthcare_appointment_management_system.dto.LoginRequest;
import com.wecp.healthcare_appointment_management_system.dto.LoginResponse;
import com.wecp.healthcare_appointment_management_system.entity.Doctor;
import com.wecp.healthcare_appointment_management_system.entity.Patient;
import com.wecp.healthcare_appointment_management_system.entity.Receptionist;
import com.wecp.healthcare_appointment_management_system.entity.User;
import com.wecp.healthcare_appointment_management_system.repository.DoctorRepository;
import com.wecp.healthcare_appointment_management_system.repository.PatientRepository;
import com.wecp.healthcare_appointment_management_system.repository.ReceptionistRepository;
import com.wecp.healthcare_appointment_management_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;

@Service
public class UserService  
{
    @Autowired
    private UserRepository userRepository;
    
    
    public Patient registerPatient(Patient patient) 
    {
        // register patient
        return userRepository.save(patient);
    }

    public Doctor registerDoctor(Doctor doctor) 
    {
        return userRepository.save(doctor);
        // register doctor
    }

    public Receptionist registerReceptionist(Receptionist receptionist) 
    {
        return userRepository.save(receptionist);
       // register receptionist
    }
    
    //change the token
    public LoginResponse loginUser(LoginRequest loginRequest) 
    {
        String token="token"; 
        if(token == "token")
        {
            return new LoginResponse(null, token, token, token, token);
        }
        else
        {
            System.out.println("EXCEPTION 401");
        }
        return null;

      // login user and return jwt in LoginResponse object
        // return 401 unauthorized if authentication fail
    }
}
