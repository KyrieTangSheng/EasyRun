package com.example.demo.user.view.program;

import com.example.demo.objects.entity.Program;
import com.example.demo.objects.entity.Star;
import com.example.demo.objects.entity.University;
import com.example.demo.objects.service.impl.ProgramServiceImpl;
import com.example.demo.objects.service.impl.StarServiceImpl;
import com.example.demo.objects.service.impl.UniversityServiceImpl;
import com.example.demo.student.Student;
import com.example.demo.student.account.StudentAccountServiceImpl;
import com.example.demo.user.view.institution.UserViewInstitutionServiceImpl;
import com.example.demo.utils.Response;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class UserViewProgramServiceImpl implements UserViewProgramService{

    private ProgramServiceImpl programServiceImpl;
    private StarServiceImpl starServiceImpl;
    private UniversityServiceImpl universityServiceImpl;
    private StudentAccountServiceImpl studentAccountServiceImpl;
    @Autowired
    public UserViewProgramServiceImpl(ProgramServiceImpl programServiceImpl,
                                      StarServiceImpl starServiceImpl,
                                      StudentAccountServiceImpl studentAccountServiceImpl,
                                      UniversityServiceImpl universityServiceImpl){
        this.programServiceImpl = programServiceImpl;
        this.starServiceImpl = starServiceImpl;
        this.studentAccountServiceImpl = studentAccountServiceImpl;
        this.universityServiceImpl = universityServiceImpl;
    }

    @Override
    public Response getProgramById(Long programId,Long studentId){
        Program program = programServiceImpl.getProgramById(programId);
        Boolean starred = starServiceImpl.alreadyStarred(studentId,programId);

        ObjectMapper mapper = new ObjectMapper();
        try{
            ObjectNode parentNode = mapper.createObjectNode();
            String jsonProgram= mapper.writerWithDefaultPrettyPrinter().writeValueAsString(program);
            parentNode.put("program",jsonProgram);
            parentNode.put("starred",starred);

            String jsonParentNode = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(parentNode);
            Response response = new Response(1,100,jsonParentNode);
            return response;
        }
        catch(Exception e){
            throw new IllegalStateException("Json Parsing Error");
        }
    }

    @Override
    public Response starProgram(Long programId,Long studentId){
        University university = universityServiceImpl.getUniversityByProgramId(programId);
        Long universityId = university.getId();

        Program program = programServiceImpl.getProgramById(programId);
        Student student = studentAccountServiceImpl.getStudentInfoById(studentId).get();

        Star newStar = new Star(
                studentId,
                programId,
                universityId
        );
        newStar.setProgram(program);
        newStar.setStudent(student);
        newStar.setUniversity(university);

        Star star = starServiceImpl.addNewStar(newStar);
        ObjectMapper mapper = new ObjectMapper();
        try{
            String jsonStar= mapper.writerWithDefaultPrettyPrinter().writeValueAsString(star);
            Response response = new Response(1,100,jsonStar);
            return response;
        }
        catch(Exception e){
            throw new IllegalStateException("Json Parsing Error");
        }
    }

    @Override
    public Response cancelStarProgram(Long programId,Long studentId){
        starServiceImpl.deleteStar(programId,studentId);
        Response response = new Response(1,100,null);
        return response;
    }

    @Override
    public Response getSpecificSchoolInfo(Long schoolId){
        University university = universityServiceImpl.getUniversityById(schoolId);
        List<Long> programIds = university.getPrograms();
        List<Program> programs = new ArrayList<Program>();
        for(Long programId:programIds){
            Program program = programServiceImpl.getProgramById(programId);
            programs.add(program);
        }

        ObjectMapper mapper = new ObjectMapper();
        try{
            ObjectNode parentNode = mapper.createObjectNode();
            String jsonUniversity= mapper.writerWithDefaultPrettyPrinter().writeValueAsString(university);
            String jsonPrograms= mapper.writerWithDefaultPrettyPrinter().writeValueAsString(programs);
            parentNode.put("university",jsonUniversity);
            parentNode.put("programs",jsonPrograms);
            String jsonParentNode = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(parentNode);
            Response response = new Response(1,100,jsonParentNode);
            return response;
        }
        catch(Exception e){
            throw new IllegalStateException("Json Parsing Error");
        }
    }

    @Override
    public Response getSchoolsAndProgramsByKeyword(String schoolKeyword, String programKeyword){
        List<University> universities = new ArrayList<University>();
        List<Program> programs = new ArrayList<Program>();
        if (Objects.equals(schoolKeyword,"all")) {
            universities = universityServiceImpl.getAllUniversities();
        }else {
            universities = universityServiceImpl.getUniversitiesByKeyword(schoolKeyword);
        }

        if(Objects.equals(programKeyword,"all")){
            programs = programServiceImpl.getAllPrograms();
        }else{
            programs = programServiceImpl.getProgramsByKeyword(programKeyword);
        }

        ObjectMapper mapper = new ObjectMapper();
        try{
            ObjectNode parentNode = mapper.createObjectNode();
            String jsonUniversities= mapper.writerWithDefaultPrettyPrinter().writeValueAsString(universities);
            String jsonPrograms= mapper.writerWithDefaultPrettyPrinter().writeValueAsString(programs);
            parentNode.put("universities",jsonUniversities);
            parentNode.put("programs",jsonPrograms);
            String jsonParentNode = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(parentNode);
            Response response = new Response(1,100,jsonParentNode);
            return response;
        }
        catch(Exception e){
            throw new IllegalStateException("Json Parsing Error");
        }
    }
}
