package com.example.demo.instructor.home;

import com.example.demo.instructor.home.InstructorHomeServiceImpl;
import com.example.demo.objects.entity.Contract;
import com.example.demo.objects.entity.Institution;
import com.example.demo.utils.Response;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping(path = "homepage/instructor")
@RestController
public class InstructorHomeController {

    private final InstructorHomeServiceImpl instructorHomeServiceImpl;

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

    @GetMapping(path="institutionInfo")
    @ResponseBody
    public Response viewMyInstitutionInfo(@PathVariable Institution institution){
        Long institutionId = institution.getId();
        return instructorHomeServiceImpl.getInstitutionInfoById(institutionId);
    }
}