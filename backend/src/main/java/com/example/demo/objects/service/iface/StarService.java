package com.example.demo.objects.service.iface;

import com.example.demo.objects.entity.Star;
import com.example.demo.utils.Response;

import java.util.List;

public interface StarService {
    List<Star> getStarsByStudentId(Long studentId);
}
