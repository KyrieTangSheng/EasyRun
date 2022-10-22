package com.example.demo.objects.repo;

import com.example.demo.objects.entity.Program;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface ProgramRepository extends JpaRepository<Program,Long> {
    Optional<Program> findById(Long programId);
}
