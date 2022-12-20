package com.easyrun.demo.instructor.home;

import com.easyrun.demo.objects.entity.Institution;
import com.easyrun.demo.utils.Response;

public interface InstructorHomeService {
    Response getAllEnrolledStudents(Long institutionId);
    Response generateContract(String studentEmail, Long institutionId,
                              String content, Long instructorId);
    Response getInstitutionInfoById(Long institutionId);

    Response reviseInstitutionInfo(Institution institution);
}
