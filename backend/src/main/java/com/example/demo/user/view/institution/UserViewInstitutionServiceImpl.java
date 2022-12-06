package com.example.demo.user.view.institution;


import com.example.demo.instructor.Instructor;
import com.example.demo.instructor.account.InstructorAccountServiceImpl;
import com.example.demo.objects.entity.Comment;
import com.example.demo.objects.entity.Contract;
import com.example.demo.objects.entity.Institution;
import com.example.demo.objects.entity.Rating;
import com.example.demo.objects.service.iface.InstitutionService;
import com.example.demo.objects.service.impl.CommentServiceImpl;
import com.example.demo.objects.service.impl.ContractServiceImpl;
import com.example.demo.objects.service.impl.InstitutionServiceImpl;
import com.example.demo.objects.service.impl.RatingServiceImpl;
import com.example.demo.student.Student;
import com.example.demo.student.account.StudentAccountServiceImpl;
import com.example.demo.utils.Response;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserViewInstitutionServiceImpl implements UserViewInstitutionService {

    private final InstitutionServiceImpl institutionServiceImpl;
    private final ContractServiceImpl contractServiceImpl;
    private final RatingServiceImpl ratingServiceImpl;
    private final CommentServiceImpl commentServiceImpl;
    private final StudentAccountServiceImpl studentAccountServiceImpl;
    private final InstructorAccountServiceImpl instructorAccountServiceImpl;
    @Autowired
    public UserViewInstitutionServiceImpl (InstitutionServiceImpl institutionServiceImpl,
                                           ContractServiceImpl contractServiceImpl,
                                           RatingServiceImpl ratingServiceImpl,
                                           CommentServiceImpl commentServiceImpl,
                                           StudentAccountServiceImpl studentAccountServiceImpl,
                                           InstructorAccountServiceImpl instructorAccountServiceImpl){
        this.institutionServiceImpl = institutionServiceImpl;
        this.contractServiceImpl = contractServiceImpl;
        this.ratingServiceImpl = ratingServiceImpl;
        this.commentServiceImpl = commentServiceImpl;
        this.studentAccountServiceImpl = studentAccountServiceImpl;
        this.instructorAccountServiceImpl = instructorAccountServiceImpl;
    }

    @Override
    public Response getAllInstitutions(){
        List<Institution> institutions = institutionServiceImpl.getAllInstitutions();

        List<Rating> ratings;
        Integer ratingCount;
        Float score1,score2,score3,score4,score5,score6,overallScore;
        for(Institution institution:institutions){
            ratings = ratingServiceImpl.getRatingsByInstitutionName(institution.getName());
            if (ratings.isEmpty()){
                continue;
            }
            ratingCount = ratings.size();
            score1 = 0F;
            score2 = 0F;
            score3 = 0F;
            score4 = 0F;
            score5 = 0F;
            score6 = 0F;
            overallScore = 0F;
            for(Rating rating:ratings){
                score1 += rating.getCriteria1Rating()/ratingCount;
                score2 += rating.getCriteria2Rating()/ratingCount;
                score3 += rating.getCriteria3Rating()/ratingCount;
                score4 += rating.getCriteria4Rating()/ratingCount;
                score5 += rating.getCriteria5Rating()/ratingCount;
                score6 += rating.getCriteria6Rating()/ratingCount;
                overallScore += rating.getOverallRating()/ratingCount;
            }
            institution.setAvgScore1(score1);
            institution.setAvgScore2(score2);
            institution.setAvgScore3(score3);
            institution.setAvgScore4(score4);
            institution.setAvgScore5(score5);
            institution.setAvgScore6(score6);
            institution.setAvgOverallScore(overallScore);
        }

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
    public Response getInstitutionsByKeyword(String keyword){
        List<Institution> institutions = institutionServiceImpl.getAllInstitutionsByKeyword(keyword);

        List<Rating> ratings;
        Integer ratingCount;
        Float score1,score2,score3,score4,score5,score6,overallScore;
        for(Institution institution:institutions){
            ratings = ratingServiceImpl.getRatingsByInstitutionName(institution.getName());
            if (ratings.isEmpty()){
                continue;
            }
            ratingCount = ratings.size();
            score1 = 0F;
            score2 = 0F;
            score3 = 0F;
            score4 = 0F;
            score5 = 0F;
            score6 = 0F;
            overallScore = 0F;
            for(Rating rating:ratings){
                score1 += rating.getCriteria1Rating()/ratingCount;
                score2 += rating.getCriteria2Rating();
                score3 += rating.getCriteria3Rating();
                score4 += rating.getCriteria4Rating();
                score5 += rating.getCriteria5Rating();
                score6 += rating.getCriteria6Rating();
                overallScore += rating.getOverallRating();
            }
            institution.setAvgScore1(score1);
            institution.setAvgScore2(score2);
            institution.setAvgScore3(score3);
            institution.setAvgScore4(score4);
            institution.setAvgScore5(score5);
            institution.setAvgScore6(score6);
            institution.setAvgOverallScore(overallScore);
        }

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
    public Response getSpecificInstitutionInfo(String institutionName, Long studentId){

        Optional<Institution> optionalInstitution = institutionServiceImpl.getInstitutionByName(institutionName);
        if (optionalInstitution.isEmpty()){
            Response response = new Response(0,1,null);
            return response;
        }
        Institution institution = optionalInstitution.get();
        Long institutionId = institution.getId();

        Boolean ratable = false;
        //if user is logged-in student
        if (studentId != 0) {
            List<Contract> contractsByStudentId = contractServiceImpl.getContractsByStudentId(studentId);
            for (Contract contract : contractsByStudentId) {
                if (contract.getInstitutionId() == institutionId) {
                    ratable = true;
                    break;
                }
            }
        }

        List<Rating> ratings = ratingServiceImpl.getRatingsByInstitutionName(institutionName);

        List<Comment> comments = new ArrayList<Comment>();
        for(Rating rating:ratings){
            List<Comment> commentsByRatingId = commentServiceImpl.getCommentsByRatingId(rating.getId());
            comments.addAll(commentsByRatingId);
        }

        ObjectMapper mapper = new ObjectMapper();
        try{
            ObjectNode parentNode = mapper.createObjectNode();

            String jsonInstitution= mapper.writerWithDefaultPrettyPrinter().writeValueAsString(institution);
            String jsonRatings = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(ratings);
            String jsonComments = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(comments);
            parentNode.put("institution",jsonInstitution);
            parentNode.put("ratable",ratable);
            parentNode.put("ratings",jsonRatings);
            parentNode.put("comments",jsonComments);

            String jsonParentNode = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(parentNode);
            Response response = new Response(1,100,jsonParentNode);
            return response;
        }
        catch(Exception e){
            throw new IllegalStateException("Json Parsing Error");
        }
    }

    @Override
    public Response rateInstitution(Rating rating){

        Long studentId = rating.getStudentId();
        Optional<Student> optionalStudent = studentAccountServiceImpl.getStudentInfoById(studentId);
        Student student = optionalStudent.get();
        rating.setStudent(student);
        String studentUserName = student.getUserName();
        rating.setStudentUserName(studentUserName);

        Long institutionId = rating.getInstitutionId();
        Optional<Institution> optionalInstitution = institutionServiceImpl.getInstitutionInfoById(institutionId);
        Institution institution = optionalInstitution.get();
        rating.setInstitution(institution);
        String institutionName = institution.getName();
        rating.setInstitutionName(institutionName);

        rating.setDateTime(LocalDateTime.now());

        //Check if the student has already rated the institution
        Optional<Rating> optionalRating = ratingServiceImpl.getRatingsByInstitutionIdAndStudentId(studentId,institutionId);

        if (optionalRating.isPresent()){
            if(optionalRating.get().getId() != rating.getId()){
            Response response = new Response(0,0,"Already rated");
            return response;
            }
        }
        Rating savedRating = ratingServiceImpl.addNewRating(rating);

        ObjectMapper mapper = new ObjectMapper();
        try{
            String jsonSavedRating= mapper.writerWithDefaultPrettyPrinter().writeValueAsString(savedRating);
            Response response = new Response(1,100,jsonSavedRating);
            return response;
        }
        catch(Exception e){
            throw new IllegalStateException("Json Parsing Error");
        }
    }

    @Override
    public Response commentRating(Comment comment){
        Long studentId = comment.getStudentId();
        Optional<Student> optionalStudent = studentAccountServiceImpl.getStudentInfoById(studentId);
        Student student = optionalStudent.get();
        comment.setStudent(student);
        String studentUserName = student.getUserName();
        comment.setStudentUserName(studentUserName);

        Long ratingId = comment.getRatingId();
        Optional<Rating> optionalRating = ratingServiceImpl.getRatingById(ratingId);
        Rating rating = optionalRating.get();
        comment.setRating(rating);

        Long parentId = comment.getParentId();
        if (parentId != null) {
            Optional<Comment> optionalParentComment = commentServiceImpl.getCommentById(parentId);
            if (optionalParentComment.isPresent()){
                Comment parentComment = optionalParentComment.get();
                comment.setParentComment(parentComment);
                parentComment.addChildComment(comment);
            }
        }

        comment.setDateTime(LocalDateTime.now());
        Comment savedComment = commentServiceImpl.addNewComment(comment);
        System.out.println(savedComment.getChildComments());
        ObjectMapper mapper = new ObjectMapper();
        try{
            String jsonSavedComment= mapper.writerWithDefaultPrettyPrinter().writeValueAsString(savedComment);
            Response response = new Response(1,100,jsonSavedComment);
            return response;
        }
        catch(Exception e){
            throw new IllegalStateException("Json Parsing Error");
        }
    }

    @Override
    public Response getInstitutionMembers(String institutionName) {
        List<Instructor> instructors = instructorAccountServiceImpl.getInstructorsByInstitutionName(institutionName);

        ObjectMapper mapper = new ObjectMapper();
        try{
            String jsonInstructors= mapper.writerWithDefaultPrettyPrinter().writeValueAsString(instructors);
            Response response = new Response(1,100,jsonInstructors);
            return response;
        }
        catch(Exception e){
            throw new IllegalStateException("Json Parsing Error");
        }
    }
}
