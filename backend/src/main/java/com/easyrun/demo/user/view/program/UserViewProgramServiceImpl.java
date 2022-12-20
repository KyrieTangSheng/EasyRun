package com.easyrun.demo.user.view.program;

import com.easyrun.demo.objects.entity.Program;
import com.easyrun.demo.objects.entity.Star;
import com.easyrun.demo.objects.entity.University;
import com.easyrun.demo.objects.service.impl.StarServiceImpl;
import com.easyrun.demo.student.Student;
import com.easyrun.demo.student.account.StudentAccountServiceImpl;
import com.easyrun.demo.utils.Response;
import com.easyrun.demo.objects.service.proxy.ProgramServiceProxy;
import com.easyrun.demo.objects.service.proxy.UniversityServiceProxy;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class UserViewProgramServiceImpl implements UserViewProgramService{

    private ProgramServiceProxy programServiceProxy;
    private StarServiceImpl starServiceImpl;
    private StudentAccountServiceImpl studentAccountServiceImpl;
    private UniversityServiceProxy universityServiceProxy;
    @Autowired
    public UserViewProgramServiceImpl(ProgramServiceProxy programServiceProxy,
                                      StarServiceImpl starServiceImpl,
                                      StudentAccountServiceImpl studentAccountServiceImpl,
                                      UniversityServiceProxy universityServiceProxy){
        this.programServiceProxy = programServiceProxy;
        this.starServiceImpl = starServiceImpl;
        this.studentAccountServiceImpl = studentAccountServiceImpl;
        this.universityServiceProxy = universityServiceProxy;
    }

    @Override
    public Response getProgramById(Long programId, Long studentId){
        Program program = programServiceProxy.getProgramById(programId);
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
        University university = universityServiceProxy.getUniversityByProgramId(programId);
        Long universityId = university.getId();

        Program program = programServiceProxy.getProgramById(programId);
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
        University university = universityServiceProxy.getUniversityById(schoolId);
        List<Long> programIds = university.getPrograms();
        List<Program> programs = new ArrayList<Program>();
        for(Long programId:programIds){
            Program program = programServiceProxy.getProgramById(programId);
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
    public Response getSchoolsAndProgramsByKeyword(String schoolKeyword, String programKeyword,Long studentId){
        List<University> universities = new ArrayList<University>();
        List<Long> universityIds= new ArrayList<Long>();
        List<Program> programs = new ArrayList<Program>();
        List<Program> tempPrograms = new ArrayList<Program>();

        if (Objects.equals(schoolKeyword,"all")) {
            universities = universityServiceProxy.getAllUniversities();
        }else {
            universities = universityServiceProxy.getUniversitiesByKeyword(schoolKeyword);
        }
        for(University university:universities){
            universityIds.add(university.getId());
        }

        if(Objects.equals(programKeyword,"all")){
            tempPrograms = programServiceProxy.getAllPrograms();
        }else{
            tempPrograms = programServiceProxy.getProgramsByKeyword(programKeyword);
        }
        for(Program program:tempPrograms){
            if (universityIds.contains(program.getUniversityId())){
                programs.add(program);
            }
        }

        List<Star> stars = starServiceImpl.getStarsByStudentId(studentId);
        List<Boolean> starStatus = new ArrayList<>();
        for(Program program:programs){
            Boolean starred = false;
            Long programId = program.getId();
            for(Star star:stars){
                if(star.getProgramId() == programId){
                    starred = true;
                    break;
                }
            }
            starStatus.add(starred);
        }


        ObjectMapper mapper = new ObjectMapper();
        try{
            ObjectNode parentNode = mapper.createObjectNode();
//            String jsonUniversities= mapper.writerWithDefaultPrettyPrinter().writeValueAsString(universities);
            String jsonPrograms= mapper.writerWithDefaultPrettyPrinter().writeValueAsString(programs);
            String jsonStarStatus = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(starStatus);
//            parentNode.put("universities",jsonUniversities);
            parentNode.put("programs",jsonPrograms);
            parentNode.put("starStatus",jsonStarStatus);
            String jsonParentNode = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(parentNode);
            Response response = new Response(1,100,jsonParentNode);
            return response;
        }
        catch(Exception e){
            throw new IllegalStateException("Json Parsing Error");
        }
    }
}
