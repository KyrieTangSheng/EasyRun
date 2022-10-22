package com.example.demo.objects.repo;

import com.example.demo.objects.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating,Long> {
    List<Rating> findByInstitutionName(String institutionName);
}
