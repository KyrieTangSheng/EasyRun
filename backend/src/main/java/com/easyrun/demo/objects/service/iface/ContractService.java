package com.easyrun.demo.objects.service.iface;

import com.easyrun.demo.instructor.Instructor;
import com.easyrun.demo.student.Student;
import com.easyrun.demo.objects.entity.Contract;
import com.easyrun.demo.objects.entity.Institution;

import java.util.List;

public interface ContractService {
    List<Contract> getContractsByStudentId(Long studentId);
    void changeContractStatus(Long contractId,Integer newStatus);
    List<Contract> getContractsByInstitutionId(Long institutionId);
    Contract generateNewContract(Long studentId, Long institutionId,
                                 String content, Long instructorId,
                                 Student student, Instructor instructor, Institution institution);
}
