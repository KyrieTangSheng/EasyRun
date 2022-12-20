package com.easyrun.demo.objects.service.iface;

import com.easyrun.demo.objects.entity.Rating;

import java.util.List;
import java.util.Optional;

public interface RatingService {
    List<Rating> getRatingsByInstitutionName(String institutionName);

    Rating addNewRating(Rating rating);
    Optional<Rating> getRatingById(Long ratingId);

    Optional<Rating> getRatingsByInstitutionIdAndStudentId(Long studentId, Long institutionId);
}
