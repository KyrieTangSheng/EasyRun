package com.example.demo.user.application;

import com.example.demo.objects.entity.Application;
import com.example.demo.utils.Response;
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

    @GetMapping(path="program/{schoolKeyword}/{programKeyword}")
    @ResponseBody
    public Response getProgramsByKeyWord(@PathVariable String schoolKeyword,
                                         @PathVariable String programKeyword){
        return userApplicationServiceImpl.getProgramsByKeyword(schoolKeyword,programKeyword);
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
