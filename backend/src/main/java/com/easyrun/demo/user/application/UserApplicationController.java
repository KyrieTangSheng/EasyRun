package com.easyrun.demo.user.application;

import com.easyrun.demo.objects.entity.Application;
import com.easyrun.demo.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping(path="applicationResult")
@RestController
@CrossOrigin
public class UserApplicationController {
    private final UserApplicationServiceImpl userApplicationServiceImpl;

    @Autowired
    public UserApplicationController(UserApplicationServiceImpl userApplicationServiceImpl){
        this.userApplicationServiceImpl = userApplicationServiceImpl;
    }

    @GetMapping(path="program/{schoolKeyword}")
    @ResponseBody
    public Response getUniversitiesByKeyword(@PathVariable String schoolKeyword){
        return  userApplicationServiceImpl.getUniversitiesByKeyword(schoolKeyword);
    }
    @GetMapping(path="program/{schoolName}/{programKeyword}")
    @ResponseBody
    public Response getProgramsByKeyword(@PathVariable String schoolName,
                                         @PathVariable String programKeyword){
        return userApplicationServiceImpl.getProgramsByKeyword(schoolName,programKeyword);
    }

    @PostMapping(path="program")
    public void confirmProgram(){
        ///
    }

    @GetMapping(path="personalInfo")
    @ResponseBody
    public Response getAllInstitutions(){
        return userApplicationServiceImpl.getAllInstitutions();
    }

    @PostMapping(path="personalInfo")
    public Response uploadApplication(@RequestBody Application application){
        return userApplicationServiceImpl.uploadApplicationResult(application);
    }
}
