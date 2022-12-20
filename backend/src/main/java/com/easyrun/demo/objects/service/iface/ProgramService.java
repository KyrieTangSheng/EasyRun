package com.easyrun.demo.objects.service.iface;

import com.easyrun.demo.objects.entity.Program;

import java.util.List;

public interface ProgramService {
    List<Program> getProgramsByStudentId(Long studentId);
    Program getProgramById(Long programId);

    List<Program> getAllPrograms();

    List<Program> getProgramsByKeyword(String programKeyword);
}
