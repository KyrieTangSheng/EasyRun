package com.easyrun.demo.objects.repo;

import com.easyrun.demo.objects.entity.Program;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface ProgramRepository extends JpaRepository<Program,Long> {
    Optional<Program> findById(Long programId);
    List<Program> findByNameContaining(String programKeyword);
}
