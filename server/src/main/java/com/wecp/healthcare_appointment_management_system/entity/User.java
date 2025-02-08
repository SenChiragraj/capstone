package com.wecp.healthcare_appointment_management_system.entity;

import javax.persistence.*;
import java.util.Set;


@Table(name = "users") // do not change table name
@Entity
public class User {
    // implement user entity
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
}
