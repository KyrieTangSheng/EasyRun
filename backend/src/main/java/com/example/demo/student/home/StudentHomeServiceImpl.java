package com.example.demo.student.home;

import com.example.demo.objects.entity.Contract;
import com.example.demo.objects.entity.Program;
import com.example.demo.objects.entity.Rating;
import com.example.demo.objects.service.impl.ContractServiceImpl;
import com.example.demo.objects.service.impl.InstitutionServiceImpl;
import com.example.demo.objects.service.impl.ProgramServiceImpl;
import com.example.demo.objects.service.impl.RatingServiceImpl;
import com.example.demo.student.Student;
import com.example.demo.student.StudentRepository;
import com.example.demo.utils.Response;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StudentHomeServiceImpl implements StudentHomeService{
    private final StudentRepository studentRepository;
    private final ProgramServiceImpl programServiceImpl;
    private final ContractServiceImpl contractServiceImpl;
    private final InstitutionServiceImpl institutionServiceImpl;
    private final RatingServiceImpl ratingServiceImpl;

    @Autowired
    public StudentHomeServiceImpl(StudentRepository studentRepository,
                                  ProgramServiceImpl programServiceImpl,
                                  ContractServiceImpl contractServiceImpl,
                                  InstitutionServiceImpl institutionServiceImpl,
                                  RatingServiceImpl ratingServiceImpl){
        this.studentRepository = studentRepository;
        this.programServiceImpl = programServiceImpl;
        this.contractServiceImpl = contractServiceImpl;
        this.institutionServiceImpl = institutionServiceImpl;
        this.ratingServiceImpl = ratingServiceImpl;
    }

    @Override
    public Response viewStarredPrograms(Long studentId){
        List<Program> programs =programServiceImpl.getProgramsByStudentId(studentId);

        List<Boolean> starStatus = new ArrayList<>();
        for(Program program:programs){
            starStatus.add(true);
        }


        ObjectMapper mapper = new ObjectMapper();
        try{
            ObjectNode parentNode = mapper.createObjectNode();
            String jsonPrograms = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(programs);
            String jsonStarStatus = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(starStatus);
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

    @Override
    public Response viewContracts(Long studentId){
        List<Contract> contracts = contractServiceImpl.getContractsByStudentId(studentId);
        List<Object> ratings = new ArrayList<>();
        for(Contract contract:contracts){
            Long institutionId = contract.getInstitutionId();
            Optional<Rating> optionalRating = ratingServiceImpl.
                    getRatingsByInstitutionIdAndStudentId(studentId,institutionId);
            if (optionalRating.isPresent()){
                ratings.add(optionalRating.get());
            }else{
                ratings.add(-1);
            }
        }

        ObjectMapper mapper = new ObjectMapper();
        try{
            ObjectNode parentNode = mapper.createObjectNode();
            String jsonContracts = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(contracts);
            String jsonRatings= mapper.writerWithDefaultPrettyPrinter().writeValueAsString(ratings);
            parentNode.put("contracts",jsonContracts);
            parentNode.put("ratings",jsonRatings);
            String jsonParentNode = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(parentNode);
            Response response = new Response(1,100,jsonParentNode);
            return response;
        }
        catch(Exception e){
            throw new IllegalStateException("Json Parsing Error");
        }
    }

    @Override
    public Response changeContractStatus(Long contractId,Integer newStatus,Long studentId){
        contractServiceImpl.changeContractStatus(contractId, newStatus);
        return viewContracts(studentId);
    }


}
