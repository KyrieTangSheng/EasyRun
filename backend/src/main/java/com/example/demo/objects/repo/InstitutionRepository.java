package com.example.demo.objects.repo;

import com.example.demo.objects.entity.Institution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InstitutionRepository extends JpaRepository<Institution,Long>{
    //@Query("SELECT s FROM Institution s WHERE s.name = ?1")
    Optional<Institution> findInstitutionByName(String name);
    Optional<Institution> findInstitutionById(Long id);
    List<Institution> findByNameContaining(String nameKeyword);
}
