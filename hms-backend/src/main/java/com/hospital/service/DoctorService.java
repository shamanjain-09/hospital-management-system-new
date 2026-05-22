package com.hospital.service;

import com.hospital.model.Doctor;
import com.hospital.repository.DoctorRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;

    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
    }

    public Doctor createDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public Doctor updateDoctor(Long id, Doctor doctor) {
        Doctor existing = getDoctorById(id);
        existing.setName(doctor.getName());
        existing.setSpecialization(doctor.getSpecialization());
        existing.setPhone(doctor.getPhone());
        existing.setEmail(doctor.getEmail());
        return doctorRepository.save(existing);
    }

    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }
}