package com.example.demo.objects.service.impl;

import com.example.demo.objects.entity.Application;
import com.example.demo.objects.repo.ApplicationRepository;
import com.example.demo.objects.service.iface.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ApplicationServiceImpl implements ApplicationService {
    private ApplicationRepository applicationRepository;
    @Autowired
    public ApplicationServiceImpl(ApplicationRepository applicationRepository){
        this.applicationRepository = applicationRepository;
    }

    @Override
    public Application addNewApplicationResult(Application application) {
        return applicationRepository.save(application);
    }
}
