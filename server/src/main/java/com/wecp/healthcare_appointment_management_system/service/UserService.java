package com.wecp.healthcare_appointment_management_system.service;

import com.wecp.healthcare_appointment_management_system.dto.LoginRequest;
import com.wecp.healthcare_appointment_management_system.dto.LoginResponse;
import com.wecp.healthcare_appointment_management_system.entity.Doctor;
import com.wecp.healthcare_appointment_management_system.entity.Patient;
import com.wecp.healthcare_appointment_management_system.entity.Receptionist;
import com.wecp.healthcare_appointment_management_system.entity.User;
import com.wecp.healthcare_appointment_management_system.exception.UsernameNotFoundException;
import com.wecp.healthcare_appointment_management_system.exception.InvalidCredentialsException;
import com.wecp.healthcare_appointment_management_system.jwt.JwtUtil;
import com.wecp.healthcare_appointment_management_system.repository.DoctorRepository;
import com.wecp.healthcare_appointment_management_system.repository.PatientRepository;
import com.wecp.healthcare_appointment_management_system.repository.ReceptionistRepository;
import com.wecp.healthcare_appointment_management_system.repository.UserRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private ReceptionistRepository receptionistRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    public boolean isUsernameTaken(String username){
        return userRepository.findByUsername(username)!=null;
    }

    public Patient registerPatient(Patient patient) {
        if(isUsernameTaken(patient.getUsername())) throw new RuntimeException("Username already taken");
        patient.setPassword(passwordEncoder.encode(patient.getPassword())); // Encode password
        return patientRepository.save(patient);
    }

    public Doctor registerDoctor(Doctor doctor) {
        if(isUsernameTaken(doctor.getUsername())) throw new RuntimeException("Username already taken");
        doctor.setPassword(passwordEncoder.encode(doctor.getPassword())); // Encode password
        return doctorRepository.save(doctor);
    }

    public Receptionist registerReceptionist(Receptionist receptionist) {
        if(isUsernameTaken(receptionist.getUsername())) throw new RuntimeException("USername already taken");
        receptionist.setPassword(passwordEncoder.encode(receptionist.getPassword())); // Encode password
        return receptionistRepository.save(receptionist);
    }

    public LoginResponse loginUser(LoginRequest loginRequest) {
        logger.info("Login attempt for user: {}", loginRequest.getUsername());
        User user = userRepository.findByUsername(loginRequest.getUsername());
        if (user == null) {
            logger.error("Username not found: {}", loginRequest.getUsername());
            throw new UsernameNotFoundException("Username not found!!");
        }

        if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            // Generate a token
            String token = jwtUtil.generateToken(user.getUsername());

            // Return user details along with the token
            logger.info("User logged in successfully: {}", user.getUsername());
            return new LoginResponse(user.getId(), token, user.getUsername(), user.getEmail(), user.getRole());
        } else {
            logger.warn("Invalid credentials for user: {}", loginRequest.getUsername());
            throw new InvalidCredentialsException("Invalid credentials");
        }
    }

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public List<Receptionist> getAllReceptionists() {
        return receptionistRepository.findAll();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                new ArrayList<>());
    }

    public Patient findPatientById(Long patientId) {
        return patientRepository.findById(patientId).orElse(null);
    }

    public Doctor findDoctorById(Long doctorId) {
        return doctorRepository.findById(doctorId).orElse(null);
    }

    public User findUserByDetails(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}
