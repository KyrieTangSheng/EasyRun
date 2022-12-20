package com.easyrun.demo.objects.service.impl;

import com.easyrun.demo.objects.service.iface.UniversityService;
import com.easyrun.demo.objects.entity.Program;
import com.easyrun.demo.objects.entity.University;
import com.easyrun.demo.objects.repo.UniversityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UniversityServiceImpl implements UniversityService {
    private final ProgramServiceImpl programServiceImpl;
    private final UniversityRepository universityRepository;
    @Autowired
    public UniversityServiceImpl(ProgramServiceImpl programServiceImpl,
                                 UniversityRepository universityRepository){
        this.programServiceImpl = programServiceImpl;
        this.universityRepository = universityRepository;
    }

    @Override
    public University getUniversityByProgramId(Long programId){
        Program program = programServiceImpl.getProgramById(programId);
        Long universityId = program.getUniversityId();
        University university = universityRepository.findById(universityId).get();
        return university;
    }

    @Override
    public University getUniversityById(Long schoolId){
        University university = universityRepository.findById(schoolId).get();
        return university;
    }

    @Override
    public List<University> getAllUniversities(){
        return universityRepository.findAll();
    }

    @Override
    public List<University> getUniversitiesByKeyword(String schoolKeyword) {
        return universityRepository.findByNameContaining(schoolKeyword);
    }

    @Override
    public List<University> getUniversitiesByName(String schoolName){
        return universityRepository.findByName(schoolName);
    }
}
