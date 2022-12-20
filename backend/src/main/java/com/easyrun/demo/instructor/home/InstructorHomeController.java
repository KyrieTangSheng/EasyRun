package com.easyrun.demo.instructor.home;

import com.easyrun.demo.objects.entity.Institution;
import com.easyrun.demo.utils.Response;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RequestMapping(path = "homepage/instructor")
@RestController
public class InstructorHomeController {

    private final InstructorHomeService instructorHomeServiceImpl;

    @Autowired
    public InstructorHomeController(InstructorHomeServiceImpl instructorHomeServiceImpl){
        this.instructorHomeServiceImpl = instructorHomeServiceImpl;
    }

    @GetMapping(path="enrolledStudents/{institutionId}")
    @ResponseBody
    public Response viewEnrolledStudent(@PathVariable Long institutionId){
        return instructorHomeServiceImpl.getAllEnrolledStudents(institutionId);
    }

    @PostMapping(path="contract")
    public Response prepareContract(@RequestBody ObjectNode objectNode){
        String studentEmail = objectNode.get("studentEmail").asText();
        Long institutionId = objectNode.get("institutionId").asLong();
        String content = objectNode.get("content").asText();
        Long instructorId = objectNode.get("instructorId").asLong();
        return instructorHomeServiceImpl.generateContract(studentEmail,institutionId, content,instructorId);
    }

    @GetMapping(path="institutionInfo/{institutionId}")
    @ResponseBody
    public Response viewMyInstitutionInfo(@PathVariable Long institutionId){
        return instructorHomeServiceImpl.getInstitutionInfoById(institutionId);
    }

    @PostMapping(path="institutionInfo")
    public Response reviseInstitutionInfo(@RequestBody Institution institution){
        return instructorHomeServiceImpl.reviseInstitutionInfo(institution);
    }
}