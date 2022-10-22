package com.example.demo.instructor.home;

import com.example.demo.utils.Response;

public interface InstructorHomeService {
    Response getAllEnrolledStudents(Long institutionId);
    Response generateContract(String studentEmail, Long institutionId,
                              String content, Long instructorId);
    Response getInstitutionInfoById(Long institutionId);

}
