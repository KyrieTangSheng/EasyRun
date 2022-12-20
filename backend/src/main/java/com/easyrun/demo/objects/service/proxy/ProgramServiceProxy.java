package com.easyrun.demo.objects.service.proxy;

import com.easyrun.demo.objects.entity.Program;
import com.easyrun.demo.objects.service.iface.ProgramService;
import com.easyrun.demo.objects.service.impl.ProgramServiceImpl;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProgramServiceProxy implements ProgramService {
    private ProgramServiceImpl programServiceImpl;
    private List<Program> programs;
    public ProgramServiceProxy(ProgramServiceImpl programServiceImpl){
        this.programServiceImpl = programServiceImpl;
        this.programs = new ArrayList<Program>();
    }

    @Override
    public List<Program> getProgramsByStudentId(Long studentId){
        return programServiceImpl.getProgramsByStudentId(studentId);
    }
    @Override
    public Program getProgramById(Long programId){
        return programServiceImpl.getProgramById(programId);
    }
    @Override
    public List<Program> getAllPrograms(){
        if (programs.isEmpty()){
            System.out.println("Didn't use proxy when getting all programs");
            programs = programServiceImpl.getAllPrograms();
        }else{
            System.out.println("Used proxy when getting all programs");
        }
        return programs;
    }
    @Override
    public List<Program> getProgramsByKeyword(String programKeyword){
        return programServiceImpl.getProgramsByKeyword(programKeyword);
    }
}
