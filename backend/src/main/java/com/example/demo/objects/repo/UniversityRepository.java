package com.example.demo.objects.repo;

import com.example.demo.objects.entity.University;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UniversityRepository extends JpaRepository<University,Long> {

    List<University> findByNameContaining(String nameKeyword);

    List<University> findByName(String schoolName);
}