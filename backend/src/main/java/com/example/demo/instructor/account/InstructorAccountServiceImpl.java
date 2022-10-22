package com.example.demo.instructor.account;

import com.example.demo.instructor.Instructor;
import com.example.demo.instructor.InstructorRepository;
import com.example.demo.objects.entity.Institution;
import com.example.demo.objects.repo.InstitutionRepository;
import com.example.demo.utils.Response;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class InstructorAccountServiceImpl implements InstructorAccountService {
    private final InstructorRepository instructorRepository;
    private final InstitutionRepository institutionRepository;
    @Autowired
    public InstructorAccountServiceImpl(InstructorRepository instructorRepository,
                                        InstitutionRepository institutionRepository){
        this.instructorRepository = instructorRepository;
        this.institutionRepository = institutionRepository;
    }

    @Override
    public List<Instructor> getInstructors(){
        return instructorRepository.findAll();
    }

    @Override
    public Response addNewInstructor(Instructor instructor) {
        Optional<Instructor> instructorOptional = instructorRepository
                .findInstructorByEmail(instructor.getEmail());
        if (instructorOptional.isPresent()){
            Response response = new Response(0,1,null);
            return response;
        }

        //check if the institution exists
        Optional<Institution> optionalInstitution = institutionRepository.findInstitutionByName(instructor.getInstitutionName());
        if (optionalInstitution.isEmpty()){
            Response response = new Response(0,2,null);
            return response;
        }
        Institution institution = optionalInstitution.get();
        instructor.setInstitution(institution);
        instructorRepository.save(instructor);
        ObjectMapper mapper = new ObjectMapper();
        try{
            String jsonInstructor = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(instructor);
            Response response = new Response(1,100,jsonInstructor);
            return response;
        }
        catch(Exception e){
            throw new IllegalStateException("Json Parsing Error");
        }
    }


    @Override
    public void deleteInstructor(Long instructorId) {
        boolean exists = instructorRepository.existsById(instructorId);
        if (!exists){
            throw new IllegalStateException("No such instructor");
        }
        instructorRepository.deleteById(instructorId);
    }

    @Override
    public Response loginInstructor(String instructorEmail, String instructorPwd){
        Optional<Instructor> optionalInstructor = instructorRepository.
                findInstructorByEmail(instructorEmail);
        if (!optionalInstructor.isPresent()){
            Response response = new Response(0,3,null);
            return response;
        }
        Instructor instructor = optionalInstructor.get();
        if (!Objects.equals(instructor.getPwd(),instructorPwd)){
            Response response = new Response(0,2,null);
            return response;
        }

        ObjectMapper mapper = new ObjectMapper();
        try{
            String jsonInstructor = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(instructor);
            Response response = new Response(1,100,jsonInstructor);
            return response;
        }
        catch(Exception e){
            throw new IllegalStateException("Json Parsing Error");
        }
    }

    @Override
    @Transactional
    public Response updateInstructor(Long instructorId, Instructor instructor) {
        instructor.setId(instructorId);

        Instructor checkInstructor = instructorRepository.findById(instructorId).orElseThrow(
                () -> new IllegalStateException("Instructor with id "+instructorId+"doesn't exist.")
        );

        String email = instructor.getEmail();
        if(email != null &&
                email.length() > 0){
            Optional<Instructor> instructorOptional = instructorRepository.findInstructorByEmail(email);
            if (instructorOptional.isPresent()) {
                Instructor gotInstructor = instructorOptional.get();
                if (!Objects.equals(gotInstructor.getId(),instructor.getId())){
                    Response response = new Response(0,1,null);
                    return response;
                }
            }
        }
        else{
            throw new IllegalStateException("Invalid email");
        }

        //check if the institution exists
        Optional<Institution> optionalInstitution = institutionRepository.findInstitutionByName(instructor.getInstitutionName());
        if (optionalInstitution.isEmpty()){
            throw new IllegalStateException("No such institution");
        }
        Institution institution = optionalInstitution.get();
        instructor.setInstitution(institution);
        instructorRepository.save(instructor);

        ObjectMapper mapper = new ObjectMapper();
        try{
            String jsonInstructor = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(instructor);
            Response response = new Response(1,100,jsonInstructor);
            return response;
        }
        catch(Exception e){
            throw new IllegalStateException("Json Parsing Error");
        }
    }
}
