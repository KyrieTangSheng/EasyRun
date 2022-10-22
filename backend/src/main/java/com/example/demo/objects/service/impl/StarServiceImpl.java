package com.example.demo.objects.service.impl;

import com.example.demo.objects.entity.Program;
import com.example.demo.objects.entity.Star;
import com.example.demo.objects.repo.InstitutionRepository;
import com.example.demo.objects.repo.StarRepository;
import com.example.demo.objects.service.iface.StarService;
import com.example.demo.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StarServiceImpl implements StarService {

    private final StarRepository starRepository;
    @Autowired
    public StarServiceImpl(StarRepository starRepository){
        this.starRepository = starRepository;
    }

    @Override
    public List<Star> getStarsByStudentId(Long studentId){
        List<Star> stars = this.starRepository.findByStudentId(studentId);
        return stars;
    }
}
