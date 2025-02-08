package com.wecp.healthcare_appointment_management_system.exception;

public class DoctorNotFoundException extends RuntimeException {
    
    public DoctorNotFoundException(String message) {
        super(message);
    }
}
