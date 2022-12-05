package com.example.demo.objects.service.iface;

import com.example.demo.instructor.Instructor;
import com.example.demo.objects.entity.Contract;
import com.example.demo.objects.entity.Institution;
import com.example.demo.student.Student;

import java.util.List;

public interface ContractService {
    List<Contract> getContractsByStudentId(Long studentId);
    void changeContractStatus(Long contractId,Integer newStatus);
    List<Contract> getContractsByInstitutionId(Long institutionId);
    Contract generateNewContract(Long studentId, Long institutionId,
                                 String content, Long instructorId,
                                 Student student, Instructor instructor, Institution institution);
}
