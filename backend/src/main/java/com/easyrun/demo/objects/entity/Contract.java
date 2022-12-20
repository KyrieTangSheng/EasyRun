package com.easyrun.demo.objects.entity;

import com.easyrun.demo.instructor.Instructor;
import com.easyrun.demo.student.Student;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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
    private String instructorName;
    private String instructorEmail;
    private Long instructorPhoneNumber;
    private Long institutionId;
    private String institutionName;
    @ManyToOne
    @JoinColumn(name = "institution")
    private Institution institution;

    private Integer status; //0 is accepted, 1 is rejected, 2 is in-process

    private LocalDateTime updateDateTime;
    private String content;

    public Contract(){
    }
    public Contract(Long studentId, Long instructorId, Long institutionId, Integer status, String content,
                    Student student, Instructor instructor, Institution institution) {
        this.studentId = studentId;
        this.instructorId = instructorId;
        this.institutionId = institutionId;
        this.status = status;
        this.updateDateTime = LocalDateTime.now();
        this.content = content;
        this.student = student;
        this.instructor = instructor;
        this.institution = institution;
    }

    public Contract(Long id, Long studentId, Long instructorId, Long institutionId, Integer status, String content,
                    Student student, Instructor instructor, Institution institution) {
        this.id = id;
        this.studentId = studentId;
        this.instructorId = instructorId;
        this.institutionId = institutionId;
        this.status = status;
        this.updateDateTime = LocalDateTime.now();
        this.content = content;
        this.student = student;
        this.instructor = instructor;
        this.institution = institution;
    }

    public String getInstructorEmail() {
        return instructor.getEmail();
    }

    public void setInstructorEmail(String instructorEmail) {
        this.instructorEmail = instructorEmail;
    }

    public Long getInstructorPhoneNumber() {
        return instructor.getPhoneNumber();
    }

    public void setInstructorPhoneNumber(Long instructorPhoneNumber) {
        this.instructorPhoneNumber = instructorPhoneNumber;
    }

    public String getInstructorName() {
        return instructor.getFirstName()+" "+instructor.getLastName();
    }

    public void setInstructorName(String instructorName) {
        this.instructorName = instructorName;
    }

    public String getInstitutionName() {
        return institutionName;
    }

    public void setInstitutionName(String institutionName) {
        this.institutionName = institutionName;
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

    public Instructor getInstructor() {
        return instructor;
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

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getUpdateDateTime() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = updateDateTime.format(formatter); // "1986-04-08 12:30"
        return formattedDateTime;
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
