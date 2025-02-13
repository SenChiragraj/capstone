package com.wecp.healthcare_appointment_management_system.repository;

import com.wecp.healthcare_appointment_management_system.entity.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {

    // JPQL Query to find medical records by patient ID
    @Query("SELECT mr FROM MedicalRecord mr WHERE mr.patient.id = :patientId")
    List<MedicalRecord> findByPatientId(Long patientId);
}
