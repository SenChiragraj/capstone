package com.wecp.healthcare_appointment_management_system.service;

import com.wecp.healthcare_appointment_management_system.entity.MedicalRecord;
import com.wecp.healthcare_appointment_management_system.entity.Patient;
import com.wecp.healthcare_appointment_management_system.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


// public class MedicalRecordService {

// }
@Service
public class MedicalRecordService {

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    @Autowired
    private PatientRepository patientRepository;

    // public MedicalRecord saveMedicalRecord(MedicalRecord medicalRecord) {
    //     return medicalRecordRepository.save(medicalRecord);
    // }

    // public MedicalRecord getMedicalRecordById(Long medicalRecordId) {
    //     return medicalRecordRepository.findById(medicalRecordId).orElse(null);
    // }

    // public List<MedicalRecord> getAllMedicalRecords() {
    //     return medicalRecordRepository.findAll();
    // }

    // public void deleteMedicalRecord(Long medicalRecordId) {
    //   medicalRecordRepository.deleteById(medicalRecordId);
    // }

    public List<MedicalRecord> getMedicalRecordsByPatientId (Long patientId) {
        Patient patient=patientRepository.findById(patientId).orElseThrow(() -> new IllegalArgumentException("Invalid patient ID"));
        return medicalRecordRepository.findByPatientId(patientId);
    }
}