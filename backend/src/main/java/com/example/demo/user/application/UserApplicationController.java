package com.example.demo.user.application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping(path="uploadApplicationResult")
@RestController
@CrossOrigin
public class UserApplicationController {
//    private final UserApplicationServiceImpl userApplicationServiceImpl;
//    @Autowired
//    public UserApplicationController(UserApplicationServiceImpl userApplicationServiceImpl){
//        this.userApplicationServiceImpl = userApplicationServiceImpl;
//    }

    @GetMapping(path="chooseProgram")
    public void getProgramsByKeyWord(){
        ///
    }

    @PostMapping(path="chooseProgram")
    public void confirmProgram(){
        ///
    }

    @GetMapping(path="uploadPersonalInfo")
    public void getStudentPersonalInfo(){
        ///
    }

    @PostMapping(path="uploadPersonalInfo")
    public void uploadApplication(){
        ///
    }
}
