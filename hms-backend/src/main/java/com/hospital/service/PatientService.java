package com.hospital.service;

import com.hospital.model.Patient;
import com.hospital.repository.PatientRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PatientService {

    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Patient getPatientById(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
    }

    public Patient createPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    public Patient updatePatient(Long id, Patient patient) {
        Patient existing = getPatientById(id);
        existing.setName(patient.getName());
        existing.setGender(patient.getGender());
        existing.setPhone(patient.getPhone());
        existing.setEmail(patient.getEmail());
        existing.setAddress(patient.getAddress());
        existing.setDateOfBirth(patient.getDateOfBirth());
        return patientRepository.save(existing);
    }

    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }
}