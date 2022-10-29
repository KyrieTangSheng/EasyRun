package com.example.demo.objects.entity;

import com.example.demo.instructor.Instructor;
import com.example.demo.student.Student;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table
public class Contract {
    @Id
    @SequenceGenerator(
            name = "contract_sequence",
            sequenceName = "contract_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "contract_sequence"
    )
    private Long id;
    private Long studentId;
    @ManyToOne
    @JoinColumn(name= "student")
    private Student student;

    private Long instructorId;
    @ManyToOne
    @JoinColumn(name = "instructor")
    private Instructor instructor;

    private Long institutionId;
    @ManyToOne
    @JoinColumn(name = "institution")
    private Institution institution;

    private String status;
    private LocalDateTime updateDateTime;
    private String content;

    public Contract(){
    }
    public Contract(Long studentId, Long instructorId, Long institutionId, String status, String content) {
        this.studentId = studentId;
        this.instructorId = instructorId;
        this.institutionId = institutionId;
        this.status = status;
        this.updateDateTime = LocalDateTime.now();
        this.content = content;
    }

    public Contract(Long id, Long studentId, Long instructorId, Long institutionId, String status, String content) {
        this.id = id;
        this.studentId = studentId;
        this.instructorId = instructorId;
        this.institutionId = institutionId;
        this.status = status;
        this.updateDateTime = LocalDateTime.now();
        this.content = content;
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

    public Long getInstructorId() {
        return instructorId;
    }

    public void setInstructorId(Long instructorId) {
        this.instructorId = instructorId;
    }

    public Long getInstructor() {
        return instructor.getId();
    }

    public void setInstructor(Instructor instructor) {
        this.instructor = instructor;
    }

    public Long getInstitutionId() {
        return institutionId;
    }

    public void setInstitutionId(Long institutionId) {
        this.institutionId = institutionId;
    }

    public Long getInstitution() {
        return institution.getId();
    }

    public void setInstitution(Institution institution) {
        this.institution = institution;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getUpdateDateTime() {
        return updateDateTime;
    }

    public void setUpdateDateTime(LocalDateTime updateDateTime) {
        this.updateDateTime = updateDateTime;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}