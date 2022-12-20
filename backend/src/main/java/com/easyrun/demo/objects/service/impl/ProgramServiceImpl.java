package com.easyrun.demo.objects.service.impl;

import com.easyrun.demo.objects.service.iface.ProgramService;
import com.easyrun.demo.objects.entity.Program;
import com.easyrun.demo.objects.entity.Star;
import com.easyrun.demo.objects.repo.ProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    @Override
    public Program getProgramById(Long programId){
        Optional<Program> optionalProgram = programRepository.findById(programId);
        Program program = optionalProgram.get();
        return program;
    }

    @Override
    public List<Program> getAllPrograms(){
        return programRepository.findAll();
    }

    @Override
    public List<Program> getProgramsByKeyword(String programKeyword){
        return programRepository.findByNameContaining(programKeyword);
    }
}
