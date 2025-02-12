package com.wecp.healthcare_appointment_management_system.controller;


import com.wecp.healthcare_appointment_management_system.dto.LoginRequest;
import com.wecp.healthcare_appointment_management_system.dto.LoginResponse;
import com.wecp.healthcare_appointment_management_system.entity.Doctor;
import com.wecp.healthcare_appointment_management_system.entity.Patient;
import com.wecp.healthcare_appointment_management_system.entity.Receptionist;
import com.wecp.healthcare_appointment_management_system.entity.User;
import com.wecp.healthcare_appointment_management_system.jwt.JwtUtil;
import com.wecp.healthcare_appointment_management_system.service.AppointmentService;
import com.wecp.healthcare_appointment_management_system.service.DoctorService;
import com.wecp.healthcare_appointment_management_system.service.MedicalRecordService;
import com.wecp.healthcare_appointment_management_system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class RegisterAndLoginController {

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private MedicalRecordService medicalRecordService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;


    @PostMapping("/api/patient/register")
    public ResponseEntity<Patient> registerPatient(@RequestBody Patient patient) {
        // register patient    
         return new ResponseEntity<Patient>(userService.registerPatient(patient), HttpStatus.CREATED);
        

    }

    @PostMapping("/api/doctors/register")
    public ResponseEntity<Doctor> registerDoctor(@RequestBody Doctor doctor) {
        // register doctor
                return new ResponseEntity<Doctor>(userService.registerDoctor(doctor), HttpStatus.CREATED);
        
    }

    @PostMapping("/api/receptionist/register")
    public ResponseEntity<Receptionist> registerReceptionist(@RequestBody Receptionist receptionist) {
       // register receptionist
              return new ResponseEntity<>(userService.registerReceptionist(receptionist), HttpStatus.CREATED);
       
    }

    // @PostMapping("/api/user/login")
    // public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest loginRequest) {
    //   // login user and return jwt in LoginResponse object
    //     // return 401 unauthorized if authentication fail
    //     try{
    //                 authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
    //             }catch(AuthenticationException e){
    //                 throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Invalid username or password",e);
    //             }
        
    //             final UserDetails userDetails=userService.loadUserByUsername((loginRequest.getUsername()));
    //             final String token=jwtUtil.generateToken(userDetails.getUsername());
        
    //             User user=userService.getUserByUsername(loginRequest.getUsername());
        
    //             return ResponseEntity.ok(new LoginResponse(user.getId(), token, user.getUsername(),user.getEmail(), user.getRole()));
    // }


    @PostMapping("/api/user/login")
         public ResponseEntity loginUser(@RequestBody LoginRequest loginRequest) {
                try{
                    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
                } catch(AuthenticationException e) {
                     throw new ResponseStatusException(HttpStatus.UNAUTHORIZED , "Invalid username or password" ,e);
                }
                final UserDetails userDetails = userService.loadUserByUsername(loginRequest.getUsername());
                User foundUser = userService.getUserByUsername(loginRequest.getUsername());
                final String token = jwtUtil.generateToken(loginRequest.getUsername());
                String role = foundUser.getRole();
                Long userId = foundUser.getId();
                String username=foundUser.getUsername();
                String email=foundUser.getEmail();
                System.out.println("User Roles: " + role);
                return ResponseEntity.ok(new LoginResponse(userId, token, username, email, role));
            }

    


}
