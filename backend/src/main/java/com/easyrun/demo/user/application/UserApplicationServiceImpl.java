package com.easyrun.demo.user.application;

import com.easyrun.demo.objects.entity.Application;
import com.easyrun.demo.objects.entity.Institution;
import com.easyrun.demo.objects.entity.Program;
import com.easyrun.demo.objects.entity.University;
import com.easyrun.demo.objects.service.impl.ApplicationServiceImpl;
import com.easyrun.demo.objects.service.impl.InstitutionServiceImpl;
import com.easyrun.demo.objects.service.impl.ProgramServiceImpl;
import com.easyrun.demo.objects.service.impl.UniversityServiceImpl;
import com.easyrun.demo.utils.Response;
import com.easyrun.demo.user.view.program.UserViewProgramServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserApplicationServiceImpl implements UserApplicationService{
    private final UserViewProgramServiceImpl userViewProgramServiceImpl;
    private UniversityServiceImpl universityServiceImpl;
    private ProgramServiceImpl programServiceImpl;
    private InstitutionServiceImpl institutionServiceImpl;
    private ApplicationServiceImpl applicationServiceImpl;
    @Autowired
    public UserApplicationServiceImpl(UserViewProgramServiceImpl userViewProgramServiceImpl,
                                      UniversityServiceImpl universityServiceImpl,
                                      ProgramServiceImpl programServiceImpl,
                                      InstitutionServiceImpl institutionServiceImpl,
                                      ApplicationServiceImpl applicationServiceImpl){
        this.userViewProgramServiceImpl = userViewProgramServiceImpl;
        this.universityServiceImpl = universityServiceImpl;
        this.programServiceImpl = programServiceImpl;
        this.institutionServiceImpl = institutionServiceImpl;
        this.applicationServiceImpl = applicationServiceImpl;
    }

    @Override
    public Response getProgramsByKeyword(String schoolName, String programKeyword) {
        List<University> universities = new ArrayList<University>();
        List<Long> universityIds= new ArrayList<Long>();
        List<Program> programs = new ArrayList<Program>();
        List<Program> tempPrograms = new ArrayList<Program>();

        universities = universityServiceImpl.getUniversitiesByName(schoolName);
        for(University university:universities){
            universityIds.add(university.getId());
        }

        if(Objects.equals(programKeyword,"all")){
            tempPrograms = programServiceImpl.getAllPrograms();
        }else{
            tempPrograms = programServiceImpl.getProgramsByKeyword(programKeyword);
        }
        for(Program program:tempPrograms){
            if (universityIds.contains(program.getUniversityId())){
                programs.add(program);
            }
        }

        ObjectMapper mapper = new ObjectMapper();
        try{
            String jsonPrograms= mapper.writerWithDefaultPrettyPrinter().writeValueAsString(programs);
            Response response = new Response(1,100,jsonPrograms);
            return response;
        }
        catch(Exception e){
            throw new IllegalStateException("Json Parsing Error");
        }
    }

    @Override
    public Response getAllInstitutions() {
        List<Institution> institutions = institutionServiceImpl.getAllInstitutions();

        ObjectMapper mapper = new ObjectMapper();
        try{
            String jsonInstitutions= mapper.writerWithDefaultPrettyPrinter().writeValueAsString(institutions);
            Response response = new Response(1,100,jsonInstitutions);
            return response;
        }
        catch(Exception e){
            throw new IllegalStateException("Json Parsing Error");
        }
    }

    @Override
//    @Transactional
    public Response uploadApplicationResult(Application application){

        Program program = programServiceImpl.getProgramById(application.getProgramId());
        application.setProgram(program);
        Optional<Institution> optionalInstitution = institutionServiceImpl.getInstitutionByName(application.getInstitutionName());

        if (optionalInstitution.isPresent()){
            application.setInstitution(optionalInstitution.get());
        }

        Application newApplication = applicationServiceImpl.addNewApplicationResult(application);

        ObjectMapper mapper = new ObjectMapper();
        try{
            String jsonApplication= mapper.writerWithDefaultPrettyPrinter().writeValueAsString(application);
            Response response = new Response(1,100,jsonApplication);
            return response;
        }
        catch(Exception e){
            throw new IllegalStateException("Json Parsing Error");
        }
    }

    @Override
    public Response getUniversitiesByKeyword(String schoolKeyword){
        List<University> universities = new ArrayList<>();
        if (Objects.equals("all",schoolKeyword)){
            universities = universityServiceImpl.getAllUniversities();
        }else{
            universities = universityServiceImpl.getUniversitiesByKeyword(schoolKeyword);
        }
        ObjectMapper mapper = new ObjectMapper();
        try{
            String jsonUniversities= mapper.writerWithDefaultPrettyPrinter().writeValueAsString(universities);
            Response response = new Response(1,100,jsonUniversities);
            return response;
        }
        catch(Exception e){
            throw new IllegalStateException("Json Parsing Error");
        }

    }
}
