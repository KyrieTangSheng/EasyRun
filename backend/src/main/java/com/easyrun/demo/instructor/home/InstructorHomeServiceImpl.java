package com.easyrun.demo.instructor.home;

import com.easyrun.demo.instructor.Instructor;
import com.easyrun.demo.instructor.InstructorRepository;
import com.easyrun.demo.objects.entity.Contract;
import com.easyrun.demo.objects.entity.Institution;
import com.easyrun.demo.objects.service.iface.ContractService;
import com.easyrun.demo.objects.service.iface.InstitutionService;
import com.easyrun.demo.objects.service.iface.ProgramService;
import com.easyrun.demo.student.Student;
import com.easyrun.demo.student.account.StudentAccountService;
import com.easyrun.demo.utils.Response;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class InstructorHomeServiceImpl implements InstructorHomeService{
    private final StudentAccountService studentAccountServiceImpl;
    private final ProgramService programServiceImpl;
    private final ContractService contractServiceImpl;
    private final InstitutionService institutionServiceImpl;
    private final InstructorRepository instructorRepository;


    @Autowired
    public InstructorHomeServiceImpl(StudentAccountService studentAccountServiceImpl,
                                  ProgramService programServiceImpl,
                                  ContractService contractServiceImpl,
                                  InstitutionService institutionServiceImpl,
                                     InstructorRepository instructorRepository){
        this.studentAccountServiceImpl = studentAccountServiceImpl;
        this.programServiceImpl = programServiceImpl;
        this.contractServiceImpl = contractServiceImpl;
        this.institutionServiceImpl = institutionServiceImpl;
        this.instructorRepository = instructorRepository;
    }

    @Override
    public Response getAllEnrolledStudents(Long institutionId){
        List<Contract> contracts = contractServiceImpl.getContractsByInstitutionId(institutionId);
        List<Student> students = new ArrayList<Student>();
        for(Contract contract:contracts){
            if (Objects.equals(contract.getStatus(),0)){
                students.add(studentAccountServiceImpl.getStudentInfoById(contract.getStudentId()).get());
            }
        }

        ObjectMapper mapper = new ObjectMapper();
        try{
            String jsonStudents = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(students);
            Response response = new Response(1,100,jsonStudents);
            return response;
        }
        catch(Exception e){
            throw new IllegalStateException("Json Parsing Error");
        }
    }

    @Override
    public Response generateContract(String studentEmail, Long institutionId,
                                     String content, Long instructorId){
        Optional<Student> optionalStudent = studentAccountServiceImpl.getStudentInfoByEmail(studentEmail);
        if(optionalStudent.isEmpty()){
            Response response = new Response(0,3,null);
            return response;
        }
        Student student = optionalStudent.get();

        Institution institution = institutionServiceImpl.getInstitutionInfoById(institutionId).get();
        Instructor instructor = instructorRepository.findById(instructorId).get();
        Contract newContract = contractServiceImpl.generateNewContract(student.getId(), institutionId, content,instructorId
        ,student,instructor,institution);

        ObjectMapper mapper = new ObjectMapper();
        try{
            String jsonContract = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(newContract);
            Response response = new Response(1,100,jsonContract);
            return response;
        }
        catch(Exception e){
            throw new IllegalStateException("Json Parsing Error");
        }
    }

    @Override
    public Response getInstitutionInfoById(Long institutionId){
        Institution institution = institutionServiceImpl.getInstitutionInfoById(institutionId).get();

        ObjectMapper mapper = new ObjectMapper();
        try{
            String jsonInstitution = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(institution);
            Response response = new Response(1,100,jsonInstitution);
            return response;
        }
        catch(Exception e){
            throw new IllegalStateException("Json Parsing Error");
        }
    }

    @Override
    public Response reviseInstitutionInfo(Institution institution){
        String verificationCode = institution.getVerificationCode();
        Long institutionId = institution.getId();
        String correctCode = institutionServiceImpl.getInstitutionInfoById(institutionId).get().getVerificationCode();
        if(!Objects.equals(correctCode,verificationCode)){
            Response response = new Response(0,1,"Incorrect Verification Code");
            return response;
        }
        institution.setInstructors(institutionServiceImpl.getInstitutionInfoById(institutionId).get().getInstructors());
        Institution revisedInstitution = institutionServiceImpl.updateInstitutionInfo(institution);
        ObjectMapper mapper = new ObjectMapper();
        try{
            String jsonInstitution = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(revisedInstitution);
            Response response = new Response(1,100,jsonInstitution);
            return response;
        }
        catch(Exception e){
            throw new IllegalStateException("Json Parsing Error");
        }
    }
}
