package com.example.demo.objects.service.impl;

import com.example.demo.objects.entity.Program;
import com.example.demo.objects.entity.Star;
import com.example.demo.objects.repo.ProgramRepository;
import com.example.demo.objects.service.iface.ProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProgramServiceImpl implements ProgramService {
    private final ProgramRepository programRepository;
    private final StarServiceImpl starServiceImpl;
    
    @Autowired
    public ProgramServiceImpl(ProgramRepository programRepository,
                              StarServiceImpl starServiceImpl){
        this.programRepository = programRepository;
        this.starServiceImpl = starServiceImpl;
    }

    @Override
    public List<Program> getProgramsByStudentId(Long studentId){
        List<Star> stars = this.starServiceImpl.getStarsByStudentId(studentId);
        List<Program> programs = new ArrayList<Program>();
        for(Star star:stars){
            Long programId = star.getProgramId();
            Program program = programRepository.findById(programId).get();
            programs.add(program);
        }
        return programs;
    }
}
