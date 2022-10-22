package com.example.demo.objects.entity;


import com.example.demo.instructor.Instructor;
import com.example.demo.student.Student;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.List;

@Entity
@Table
public class Star{
    @Id
    @SequenceGenerator(
            name = "star_sequence",
            sequenceName = "star_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "star_sequence"
    )
    private Long id;

    private Long studentId;
    @ManyToOne
    @JoinColumn(name= "student")
    private Student student;

    private Long programId;
    @ManyToOne
    @JoinColumn(name = "program")
    private Program program;

    private Long universityId;
    @ManyToOne
    @JoinColumn(name = "university")
    private University university;

    public Star(){
    }
    public Star(Long studentId, Long programId,Long universityId) {
        this.studentId = studentId;
        this.programId = programId;
        this.universityId = universityId;
    }
    public Star(Long id, Long studentId, Long programId,Long universityId) {
        this.id = id;
        this.studentId = studentId;
        this.programId = programId;
        this.universityId = universityId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getStudent() {
        return student.getId();
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Long getProgramId() {
        return programId;
    }

    public void setProgramId(Long programId) {
        this.programId = programId;
    }

    public Long getProgram() {
        return program.getId();
    }

    public void setProgram(Program program) {
        this.program = program;
    }

    public Long getUniversityId() {
        return universityId;
    }

    public void setUniversityId(Long universityId) {
        this.universityId = universityId;
    }

    public Long getUniversity() {
        return university.getId();
    }

    public void setUniversity(University university) {
        this.university = university;
    }
}

