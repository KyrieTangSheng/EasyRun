package com.example.demo.objects.service.iface;

import com.example.demo.objects.entity.University;

import java.util.List;

public interface UniversityService {
    University getUniversityByProgramId(Long programId);

    University getUniversityById(Long schoolId);

    List<University> getAllUniversities();

    List<University> getUniversitiesByKeyword(String schoolKeyword);
}
