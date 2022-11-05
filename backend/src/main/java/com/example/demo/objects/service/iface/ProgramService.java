package com.example.demo.objects.service.iface;

import com.example.demo.objects.entity.Program;

import java.util.List;

public interface ProgramService {
    List<Program> getProgramsByStudentId(Long studentId);
    Program getProgramById(Long programId);

    List<Program> getAllPrograms();

    List<Program> getProgramsByKeyword(String programKeyword);
}
