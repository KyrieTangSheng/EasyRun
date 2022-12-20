package com.easyrun.demo.objects.service.impl;

import com.easyrun.demo.instructor.Instructor;
import com.easyrun.demo.objects.service.iface.ContractService;
import com.easyrun.demo.student.Student;
import com.easyrun.demo.objects.entity.Contract;
import com.easyrun.demo.objects.entity.Institution;
import com.easyrun.demo.objects.repo.ContractRepository;
import com.easyrun.demo.observers.NewContractEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ContractServiceImpl implements ContractService {
    private ContractRepository contractRepository;
    @Autowired
    private ApplicationEventPublisher applicationEventPublisher;
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
    public void changeContractStatus(Long contractId, Integer newStatus){
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
                2, //means "in-process"
                content,
                student,
                instructor,
                institution);
        newContract.setInstructorName(instructor.getFirstName()+" "+instructor.getLastName());
        newContract.setInstitutionName(institution.getName());
        Contract savedContract = contractRepository.save(newContract);
        //Publish to observer
        applicationEventPublisher.publishEvent(new NewContractEvent(this, student,instructor,institution));
        return savedContract;
    }
}
