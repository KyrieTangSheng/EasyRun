package com.easyrun.demo.objects.repo;

import com.easyrun.demo.objects.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RatingRepository extends JpaRepository<Rating,Long> {
    List<Rating> findByInstitutionName(String institutionName);

    Optional<Rating> findByStudentIdAndInstitutionId(Long studentId, Long institutionId);
}
