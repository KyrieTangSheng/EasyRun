package com.example.demo.objects.repo;

import com.example.demo.objects.entity.Contract;
import com.example.demo.student.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContractRepository extends JpaRepository<Contract,Long> {
    List<Contract> findByStudentId(Long studentId);

    Optional<Contract> findById(Long contractId);
    List<Student> findAllByInstitutionId(Long institutionId);
}
