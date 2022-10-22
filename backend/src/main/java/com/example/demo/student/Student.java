package com.example.demo.student;

import com.fasterxml.jackson.annotation.JsonFormat;
import net.bytebuddy.asm.Advice;

import javax.annotation.processing.Generated;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.Date;


@Entity
@Table
public class Student {
    @Id
    @SequenceGenerator(
            name = "student_sequence",
            sequenceName = "student_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "student_sequence"
    )
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String userName;
    private String underGradSchool;
    private Float overallGPA;
    private Float majorGPA;
    private String major;
    private Long greScore;
    private Long toeflScore;
    private String researchExperience;
    private String internshipExperience;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date dob;
    private String pwd;
    @Transient
    private Integer age;

    public Student(){

    }
    public Student(String email, String firstName, String lastName, String userName, String underGradSchool, Float overallGPA, Float majorGPA, String major, Long greScore, Long toeflScore, String researchExperience, String internshipExperience, Date dob, String pwd) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.underGradSchool = underGradSchool;
        this.overallGPA = overallGPA;
        this.majorGPA = majorGPA;
        this.major = major;
        this.greScore = greScore;
        this.toeflScore = toeflScore;
        this.researchExperience = researchExperience;
        this.internshipExperience = internshipExperience;
        this.dob = dob;
        this.pwd = pwd;
    }

    public Student(Long id, String email, String firstName, String lastName, String userName, String underGradSchool, Float overallGPA, Float majorGPA, String major, Long greScore, Long toeflScore, String researchExperience, String internshipExperience, Date dob, String pwd) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.underGradSchool = underGradSchool;
        this.overallGPA = overallGPA;
        this.majorGPA = majorGPA;
        this.major = major;
        this.greScore = greScore;
        this.toeflScore = toeflScore;
        this.researchExperience = researchExperience;
        this.internshipExperience = internshipExperience;
        this.dob = dob;
        this.pwd = pwd;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUnderGradSchool() {
        return underGradSchool;
    }

    public void setUnderGradSchool(String underGradSchool) {
        this.underGradSchool = underGradSchool;
    }

    public Float getOverallGPA() {
        return overallGPA;
    }

    public void setOverallGPA(Float overallGPA) {
        this.overallGPA = overallGPA;
    }

    public Float getMajorGPA() {
        return majorGPA;
    }

    public void setMajorGPA(Float majorGPA) {
        this.majorGPA = majorGPA;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public Long getGreScore() {
        return greScore;
    }

    public void setGreScore(Long greScore) {
        this.greScore = greScore;
    }

    public Long getToeflScore() {
        return toeflScore;
    }

    public void setToeflScore(Long toeflScore) {
        this.toeflScore = toeflScore;
    }

    public String getResearchExperience() {
        return researchExperience;
    }

    public void setResearchExperience(String researchExperience) {
        this.researchExperience = researchExperience;
    }

    public String getInternshipExperience() {
        return internshipExperience;
    }

    public void setInternshipExperience(String internshipExperience) {
        this.internshipExperience = internshipExperience;
    }

    public String getPwd(){return pwd; }

    public void setPwd(String pwd){this.pwd = pwd;}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getAge() {
        LocalDate localDob = this.dob.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();;
        return Period.between(localDob, LocalDate.now()).getYears();
    }

    public void setAge(Integer age) {
        this.age = age;
    }




    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", userName='" + userName + '\'' +
                ", age=" + age +
                '}';
    }
}
