package com.example.demo.objects.service.iface;

import com.example.demo.objects.entity.Program;

import java.util.List;

public interface ProgramService {
    List<Program> getProgramsByStudentId(Long studentId);
}
