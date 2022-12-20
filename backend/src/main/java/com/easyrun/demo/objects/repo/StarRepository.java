package com.easyrun.demo.objects.repo;

import com.easyrun.demo.objects.entity.Star;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StarRepository extends JpaRepository<Star,Long> {
    List<Star> findByStudentId(Long studentId);
    List<Star> findByStudentIdAndProgramId(Long studentId, Long programId);
    void deleteByStudentIdAndProgramId(Long studentId, Long programId);
}
