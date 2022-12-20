package com.easyrun.demo.objects.service.impl;

import com.easyrun.demo.objects.entity.Rating;
import com.easyrun.demo.objects.repo.RatingRepository;
import com.easyrun.demo.objects.service.iface.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RatingServiceImpl implements RatingService {
    private final RatingRepository ratingRepository;

    @Autowired
    public RatingServiceImpl(RatingRepository ratingRepository){
        this.ratingRepository = ratingRepository;
    }

    @Override
    public List<Rating> getRatingsByInstitutionName(String institutionName){
        return ratingRepository.findByInstitutionName(institutionName);
    }

    @Override
    public Rating addNewRating(Rating rating){
        return ratingRepository.save(rating);
    }

    @Override
    public Optional<Rating> getRatingById(Long ratingId){
        return ratingRepository.findById(ratingId);
    }

    @Override
    public Optional<Rating> getRatingsByInstitutionIdAndStudentId(Long studentId, Long institutionId){
        return ratingRepository.findByStudentIdAndInstitutionId(studentId,institutionId);
    }
}
