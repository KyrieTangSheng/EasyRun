package com.example.demo.student.home;

import com.example.demo.objects.entity.Contract;
import com.example.demo.student.account.StudentAccountServiceImpl;
import com.example.demo.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RequestMapping(path = "homepage/student")
@RestController
public class StudentHomeController {

    private final StudentHomeServiceImpl studentHomeServiceImpl;

    @Autowired
    public StudentHomeController(StudentHomeServiceImpl studentHomeServiceImpl){
        this.studentHomeServiceImpl = studentHomeServiceImpl;
    }

    @GetMapping(path="stars/{studentId}")
    @ResponseBody
    public Response viewStarredPrograms(@PathVariable Long studentId){
        return studentHomeServiceImpl.viewStarredPrograms(studentId);
    }

    @GetMapping(path="viewContract/{studentId}")
    @ResponseBody
    public Response viewMyContract(@PathVariable Long studentId){
        return studentHomeServiceImpl.viewContracts(studentId);
    }

    @PostMapping(path="viewContract")
    public Response changeContractStatus(@RequestBody Contract contract){
        Long contractId = contract.getId();
        Integer newStatus = contract.getStatus();
        Long studentId = contract.getStudentId();
        return studentHomeServiceImpl.changeContractStatus(contractId,newStatus,studentId);
    }




}
