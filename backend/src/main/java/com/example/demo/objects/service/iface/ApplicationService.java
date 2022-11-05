package com.example.demo.objects.service.iface;

import com.example.demo.objects.entity.Application;
import org.springframework.stereotype.Repository;


public interface ApplicationService {
    Application addNewApplicationResult(Application application);
}
