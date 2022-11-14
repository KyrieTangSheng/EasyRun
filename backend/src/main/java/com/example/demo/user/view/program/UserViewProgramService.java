package com.example.demo.user.view.program;

import com.example.demo.utils.Response;

public interface UserViewProgramService {
    Response getProgramById(Long programId,Long studentId);
    Response starProgram(Long programId,Long studentId);
    Response cancelStarProgram(Long programId,Long studentId);

    Response getSpecificSchoolInfo(Long schoolId);

    Response getSchoolsAndProgramsByKeyword(String schoolKeyword, String programKeyword,Long studentId);
}
