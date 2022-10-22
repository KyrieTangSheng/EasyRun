package com.example.demo.instructor.account;

import com.example.demo.instructor.Instructor;
import com.example.demo.utils.Response;

import java.util.List;

public interface InstructorAccountService {

    List<Instructor> getInstructors();

    Response addNewInstructor(Instructor instructor);

    void deleteInstructor(Long instructorId);

    Response loginInstructor(String instructorEmail,String instructorPwd);

    Response updateInstructor(Long instructorId, Instructor instructor);

    List<Instructor> getInstructorsByInstitutionName(String institutionName);
}
