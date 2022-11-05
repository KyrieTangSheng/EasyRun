package com.example.demo.objects.service.iface;

import com.example.demo.objects.entity.Program;
import com.example.demo.objects.entity.Star;
import com.example.demo.objects.entity.University;
import com.example.demo.student.Student;
import com.example.demo.utils.Response;

import java.util.List;

public interface StarService {
    List<Star> getStarsByStudentId(Long studentId);

    Star addNewStar(Star star);
    Boolean alreadyStarred(Long studentId,Long programId);

    void deleteStar(Long programId, Long studentId);
}
