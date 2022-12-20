package com.easyrun.demo.user.view.institution;

import com.easyrun.demo.objects.entity.Comment;
import com.easyrun.demo.objects.entity.Rating;
import com.easyrun.demo.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;


@CrossOrigin
@RestController
@RequestMapping(path= "institutions")
public class UserViewInstitutionController {

    private final UserViewInstitutionServiceImpl userViewInstitutionServiceImpl;

    @Autowired
    public UserViewInstitutionController(UserViewInstitutionServiceImpl userViewInstitutionServiceImpl){
        this.userViewInstitutionServiceImpl = userViewInstitutionServiceImpl;
    }

    @GetMapping(path="{institutionName}")
    @ResponseBody
    public Response getInstitutionsByKeyword(@PathVariable String institutionName){
        String testStr = "all";
        if(Objects.equals(institutionName,testStr)){
            return userViewInstitutionServiceImpl.getAllInstitutions();
        }
        else{
            return userViewInstitutionServiceImpl.getInstitutionsByKeyword(institutionName);
        }
    }

    @GetMapping(path="specificInstitution/{institutionName}/{studentId}")
    @ResponseBody
    public Response getSpecificInstitutionInfo(@PathVariable String institutionName,
                                               @PathVariable Long studentId){
        return userViewInstitutionServiceImpl.getSpecificInstitutionInfo(institutionName,studentId);
    }

    @PostMapping(path="specificInstitution/rating")
    public Response rateInstitution(@RequestBody Rating rating){
        return userViewInstitutionServiceImpl.rateInstitution(rating);
    }

    @PostMapping(path="specificInstitution/comment")
    public Response commentOnRating(@RequestBody Comment comment){
        return userViewInstitutionServiceImpl.commentRating(comment);
    }

    @GetMapping(path="specificInstitution/team/{institutionName}")
    @ResponseBody
    public Response viewInstitutionTeamMembers(@PathVariable String institutionName){
        return userViewInstitutionServiceImpl.getInstitutionMembers(institutionName);
    }
}

