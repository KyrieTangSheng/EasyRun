package com.example.demo.instructor.account;
import com.example.demo.instructor.Instructor;
import com.example.demo.objects.entity.Institution;
import com.example.demo.objects.service.iface.InstitutionService;
import com.example.demo.objects.service.impl.InstitutionServiceImpl;
import com.example.demo.utils.Response;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RequestMapping(path = "account/instructor")
@RestController
public class InstructorAccountController {

    private final InstructorAccountServiceImpl instructorAccountServiceImpl;
    private final InstitutionServiceImpl institutionServiceImpl;
    @Autowired
    public InstructorAccountController(InstructorAccountServiceImpl instructorAccountServiceImpl,
                                       InstitutionServiceImpl institutionServiceImpl){
        this.instructorAccountServiceImpl = instructorAccountServiceImpl;
        this.institutionServiceImpl = institutionServiceImpl;
    }

//    @GetMapping(path="get_all")
//    public List<Instructor> getInstructors(){
//        return instructorAccountServiceImpl.getInstructors();
//    }

    @GetMapping(path="register")
    @ResponseBody
    public Response getAllInstitutionsInRegister(){
        List<Institution> institutions = institutionServiceImpl.getAllInstitutions();

        ObjectMapper mapper = new ObjectMapper();
        try{
            String jsonInstitutions = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(institutions);
            Response response = new Response(1,100,jsonInstitutions);
            return response;
        }
        catch(Exception e){
            throw new IllegalStateException("Json Parsing Error");
        }
    }

    @PostMapping(path="register")
    public Response registerNewInstructor(@RequestBody Instructor instructor){
        return instructorAccountServiceImpl.addNewInstructor(instructor);
    }

    @PostMapping(path = "login")
    public Response loginInstructor(@RequestBody Instructor tempInstructor){
        String instructorEmail = tempInstructor.getEmail();
        String instructorPwd = tempInstructor.getPwd();
        return instructorAccountServiceImpl.loginInstructor(instructorEmail,instructorPwd);
    }

//    @DeleteMapping(path = "delete/{instructorId}")
//    public void deleteInstructor(@PathVariable("instructorId") Long instructorId){
//        instructorAccountServiceImpl.deleteInstructor(instructorId);
//    }

    @PutMapping(path = "profile")
    public Response updateInstructor(@RequestBody Instructor instructor){
        Long instructorId = instructor.getId();
        return instructorAccountServiceImpl.updateInstructor(instructorId,instructor);
    }

    @GetMapping(path = "profile")
    public Response getAllInstitutionsInProfile(){
        String keyword = "";
        List<Institution> institutions = institutionServiceImpl.getAllInstitutionsByKeyword(keyword);
        ObjectMapper mapper = new ObjectMapper();
        try{
            String jsonInstitutions = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(institutions);
            Response response = new Response(1,100,jsonInstitutions);
            return response;
        }
        catch(Exception e){
            throw new IllegalStateException("Json Parsing Error");
        }
    }

}

