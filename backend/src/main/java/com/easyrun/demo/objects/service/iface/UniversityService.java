package com.easyrun.demo.objects.service.iface;

import com.easyrun.demo.objects.entity.University;

import java.util.List;

public interface UniversityService {
    University getUniversityByProgramId(Long programId);

    University getUniversityById(Long schoolId);

    List<University> getAllUniversities();

    List<University> getUniversitiesByKeyword(String schoolKeyword);

    List<University> getUniversitiesByName(String schoolName);
}
