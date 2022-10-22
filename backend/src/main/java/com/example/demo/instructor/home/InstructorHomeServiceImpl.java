package com.example.demo.instructor.home;

import com.example.demo.objects.entity.Contract;
import com.example.demo.objects.entity.Institution;
import com.example.demo.objects.service.impl.ContractServiceImpl;
import com.example.demo.objects.service.impl.InstitutionServiceImpl;
import com.example.demo.objects.service.impl.ProgramServiceImpl;
import com.example.demo.student.Student;
import com.example.demo.student.StudentRepository;
import com.example.demo.student.account.StudentAccountServiceImpl;
import com.example.demo.utils.Response;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InstructorHomeServiceImpl implements InstructorHomeService{
    private final StudentAccountServiceImpl studentAccountServiceImpl;
    private final ProgramServiceImpl programServiceImpl;
    private final ContractServiceImpl contractServiceImpl;
    private final InstitutionServiceImpl institutionServiceImpl;


    @Autowired
    public InstructorHomeServiceImpl(StudentAccountServiceImpl studentAccountServiceImpl,
                                  ProgramServiceImpl programServiceImpl,
                                  ContractServiceImpl contractServiceImpl,
                                  InstitutionServiceImpl institutionServiceImpl){
        this.studentAccountServiceImpl = studentAccountServiceImpl;
        this.programServiceImpl = programServiceImpl;
        this.contractServiceImpl = contractServiceImpl;
        this.institutionServiceImpl = institutionServiceImpl;
    }

    @Override
    public Response getAllEnrolledStudents(Long institutionId){
        List<Student> students = contractServiceImpl.getStudentsByInstitutionId(institutionId);

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
        Long studentId = optionalStudent.get().getId();
        Contract newContract = contractServiceImpl.generateNewContract(studentId, institutionId, content,instructorId);
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
}
