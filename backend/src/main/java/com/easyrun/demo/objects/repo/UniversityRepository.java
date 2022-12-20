package com.easyrun.demo.objects.repo;

import com.easyrun.demo.objects.entity.University;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UniversityRepository extends JpaRepository<University,Long> {

    List<University> findByNameContaining(String nameKeyword);

    List<University> findByName(String schoolName);
}