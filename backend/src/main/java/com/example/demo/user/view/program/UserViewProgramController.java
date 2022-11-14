package com.example.demo.user.view.program;

import com.example.demo.objects.entity.Star;
import com.example.demo.objects.service.impl.ProgramServiceImpl;
import com.example.demo.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(path= "programs")
public class UserViewProgramController {

    private final UserViewProgramServiceImpl userViewProgramServiceImpl;
    private final ProgramServiceImpl programServiceImpl;
    @Autowired
    public UserViewProgramController(UserViewProgramServiceImpl userViewProgramServiceImpl,
                                     ProgramServiceImpl programServiceImpl){
        this.userViewProgramServiceImpl = userViewProgramServiceImpl;
        this.programServiceImpl = programServiceImpl;
    }

    @GetMapping(path="{schoolKeyword}/{programKeyword}/{studentId}")
    @ResponseBody
    public Response getSchoolsAndProgramsByKeyword(@PathVariable String schoolKeyword,
                                                   @PathVariable String programKeyword,
                                                   @PathVariable Long studentId){
        return userViewProgramServiceImpl.getSchoolsAndProgramsByKeyword(schoolKeyword,programKeyword,studentId);
    }

    @GetMapping(path="specificProgram/{programId}/{studentId}")
    @ResponseBody
    public Response getSpecificProgram(@PathVariable Long programId,
                                       @PathVariable Long studentId){
        return userViewProgramServiceImpl.getProgramById(programId,studentId);
    }

    @PostMapping(path="specificProgram")
    public Response starProgram(@RequestBody Star star){
        Long programId = star.getProgramId();
        Long studentId = star.getStudentId();
        return userViewProgramServiceImpl.starProgram(programId,studentId);
    }

    @PostMapping(path="specificProgram/cancel")
    public Response cancelStarringProgram(@RequestBody Star star){
        Long programId = star.getProgramId();
        Long studentId = star.getStudentId();
        return userViewProgramServiceImpl.cancelStarProgram(programId,studentId);
    }

    @GetMapping(path="specificSchool/{schoolId}")
    @ResponseBody
    public Response getSpecificSchool(@PathVariable Long schoolId){
        return userViewProgramServiceImpl.getSpecificSchoolInfo(schoolId);
    }

}
