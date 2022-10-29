package com.example.demo.objects.service.impl;

import com.example.demo.objects.entity.Institution;
import com.example.demo.objects.repo.InstitutionRepository;
import com.example.demo.objects.service.iface.InstitutionService;
import com.example.demo.student.StudentRepository;
import com.example.demo.utils.Response;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InstitutionServiceImpl implements InstitutionService {
    private final InstitutionRepository institutionRepository;

    @Autowired
    public InstitutionServiceImpl(InstitutionRepository institutionRepository){
        this.institutionRepository = institutionRepository;
    }

    @Override
    public List<Institution> getAllInstitutionsByKeyword(String keyword){
        List<Institution> institutions = this.institutionRepository.findByNameContaining(keyword);
        return institutions;
    }

    @Override
    public Optional<Institution> getInstitutionInfoById(Long institutionId){
        return institutionRepository.findById(institutionId);
    }

    @Override
    public List<Institution> getAllInstitutions(){
        return institutionRepository.findAll();
    }

    @Override
    public Optional<Institution> getInstitutionByName(String name){
        return institutionRepository.findInstitutionByName(name);
    }

}