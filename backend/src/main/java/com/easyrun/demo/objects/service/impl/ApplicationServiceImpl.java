package com.easyrun.demo.objects.service.impl;

import com.easyrun.demo.objects.service.iface.ApplicationService;
import com.easyrun.demo.objects.entity.Application;
import com.easyrun.demo.objects.repo.ApplicationRepository;
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
