package com.wecp.healthcare_appointment_management_system.exception;

import org.h2.schema.UserAggregate;

public class UsernameAlreadyExists extends RuntimeException {
    
    public UsernameAlreadyExists(String message) {
        super(message);
    }
}
