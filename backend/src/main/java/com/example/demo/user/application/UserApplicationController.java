package com.example.demo.user.application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping(path="uploadApplicationResult")
@RestController
public class UserApplicationController {
    private final UserApplicationServiceImpl userApplicationServiceImpl;
    @Autowired
    public UserApplicationController(UserApplicationServiceImpl userApplicationServiceImpl){
        this.userApplicationServiceImpl = userApplicationServiceImpl;
    }

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
