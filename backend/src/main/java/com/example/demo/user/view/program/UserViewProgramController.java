package com.example.demo.user.view.program;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RequestMapping(path= "viewPrograms")
public class UserViewProgramController {

    private final UserViewProgramServiceImpl userViewProgramServiceImpl;

    @Autowired
    public UserViewProgramController(UserViewProgramServiceImpl userViewProgramServiceImpl){
        this.userViewProgramServiceImpl = userViewProgramServiceImpl;
    }

    @GetMapping
    public void getProgramByKeyword(){
        ///
    }

    @GetMapping(path="viewSpecificProgram/{programId}")
    public void getSpecificProgram(){
        ///
    }

    @PostMapping(path="viewSpecificProgram/{programId}")
    public void starProgram(){
        ///
    }

    @DeleteMapping(path="viewSpecificProgram/{programId}")
    public void cancelStarringProgram(){
        ///
    }

    @GetMapping(path="viewSpecificSchool")
    public void getSpecificSchool(){
        ///
    }

}
