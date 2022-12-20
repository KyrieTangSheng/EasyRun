package com.easyrun.demo.instructor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InstructorRepository extends JpaRepository<Instructor, Long> {

    //@Query("SELECT s FROM Instructor s WHERE s.email = ?1")
    Optional<Instructor> findInstructorByEmail(String email);
    List<Instructor> findAllByInstitutionName(String institutionName);

    Optional<Instructor> findInstructorByUserName(String userName);
}
