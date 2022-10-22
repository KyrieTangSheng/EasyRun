package com.example.demo.objects.service.iface;

import com.example.demo.objects.entity.Contract;
import com.example.demo.student.Student;

import java.util.List;

public interface ContractService {
    List<Contract> getContractsByStudentId(Long studentId);
    void changeContractStatus(Long contractId,String newStatus);
    List<Student> getStudentsByInstitutionId(Long institutionId);
    Contract generateNewContract(Long studentId, Long institutionId,
                                 String content, Long instructorId);
}
