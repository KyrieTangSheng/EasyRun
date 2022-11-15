package com.example.demo.objects.service.impl;

import com.example.demo.instructor.Instructor;
import com.example.demo.objects.entity.Contract;
import com.example.demo.objects.entity.Institution;
import com.example.demo.objects.repo.ContractRepository;
import com.example.demo.objects.service.iface.ContractService;
import com.example.demo.student.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ContractServiceImpl implements ContractService {
    private ContractRepository contractRepository;

    @Autowired
    public ContractServiceImpl(ContractRepository contractRepository){
        this.contractRepository = contractRepository;
    }

    @Override
    public List<Contract> getContractsByStudentId(Long studentId){
        List<Contract> contracts = contractRepository.findByStudentId(studentId);
        return contracts;
    }

    @Override
    @Transactional
    public void changeContractStatus(Long contractId, String newStatus){
        Optional<Contract> optionalContract = contractRepository.findById(contractId);
        Contract contract = optionalContract.get();
        contract.setStatus(newStatus);
        contract.setUpdateDateTime(LocalDateTime.now());
        contractRepository.save(contract);
    }

    @Override
    public List<Contract> getContractsByInstitutionId(Long institutionId){
        return contractRepository.findAllByInstitutionId(institutionId);
    }

    @Override
    public Contract generateNewContract(Long studentId, Long institutionId,
                                        String content, Long instructorId,
                                        Student student, Instructor instructor, Institution institution){
        Contract newContract= new Contract(
                studentId,
                instructorId,
                institutionId,
                "inProcess",
                content,
                student,
                instructor,
                institution);
        newContract.setInstructorName(instructor.getFirstName()+" "+instructor.getLastName());
        newContract.setInstitutionName(institution.getName());
        return contractRepository.save(newContract);
    }
}
