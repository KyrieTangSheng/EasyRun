package com.example.demo.objects.entity;

import com.example.demo.student.Student;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table
public class Rating {
    @Id
    @SequenceGenerator(
            name = "institution_sequence",
            sequenceName = "institution_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "institution_sequence"
    )
    private Long id;
    private String institutionName;
    private String studentEmail;
    private String studentName;
    private Integer overallRating;
    private Integer criteria1Rating;
    private Integer criteria2Rating;
    private Integer criteria3Rating;
    private Integer criteria4Rating;
    private Integer criteria5Rating;
    private Integer criteria6Rating;
    private String review;
    private LocalDateTime dateTime;

    @ManyToOne(optional=false,fetch = FetchType.LAZY)
    @JoinColumn(name="student_id",nullable = true)
    private Student student;
    @ManyToOne(optional=false,fetch = FetchType.LAZY)
    @JoinColumn(name="institution_id",nullable = true)
    private Institution institution;

    public Rating(){

    }
    public Rating(Long id, String institutionName, String studentEmail, String studentName, Integer overallRating, Integer criteria1Rating, Integer criteria2Rating, Integer criteria3Rating, Integer criteria4Rating, Integer criteria5Rating, Integer criteria6Rating, String review, String dateTimeString) {
        this.id = id;
        this.institutionName = institutionName;
        this.studentEmail = studentEmail;
        this.studentName = studentName;
        this.overallRating = overallRating;
        this.criteria1Rating = criteria1Rating;
        this.criteria2Rating = criteria2Rating;
        this.criteria3Rating = criteria3Rating;
        this.criteria4Rating = criteria4Rating;
        this.criteria5Rating = criteria5Rating;
        this.criteria6Rating = criteria6Rating;
        this.review = review;
        LocalDateTime dateTime = LocalDateTime.parse(dateTimeString); //"2018-05-05T11:50:55"
        this.dateTime = dateTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInstitutionName() {
        return institutionName;
    }

    public void setInstitutionName(String institutionName) {
        this.institutionName = institutionName;
    }

    public String getStudentEmail() {
        return studentEmail;
    }

    public void setStudentEmail(String studentEmail) {
        this.studentEmail = studentEmail;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public Integer getOverallRating() {
        return overallRating;
    }

    public void setOverallRating(Integer overallRating) {
        this.overallRating = overallRating;
    }

    public Integer getCriteria1Rating() {
        return criteria1Rating;
    }

    public void setCriteria1Rating(Integer criteria1Rating) {
        this.criteria1Rating = criteria1Rating;
    }

    public Integer getCriteria2Rating() {
        return criteria2Rating;
    }

    public void setCriteria2Rating(Integer criteria2Rating) {
        this.criteria2Rating = criteria2Rating;
    }

    public Integer getCriteria3Rating() {
        return criteria3Rating;
    }

    public void setCriteria3Rating(Integer criteria3Rating) {
        this.criteria3Rating = criteria3Rating;
    }

    public Integer getCriteria4Rating() {
        return criteria4Rating;
    }

    public void setCriteria4Rating(Integer criteria4Rating) {
        this.criteria4Rating = criteria4Rating;
    }

    public Integer getCriteria5Rating() {
        return criteria5Rating;
    }

    public void setCriteria5Rating(Integer criteria5Rating) {
        this.criteria5Rating = criteria5Rating;
    }

    public Integer getCriteria6Rating() {
        return criteria6Rating;
    }

    public void setCriteria6Rating(Integer criteria6Rating) {
        this.criteria6Rating = criteria6Rating;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public Long getStudent() {
        return student.getId();
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Long getInstitution() {
        return institution.getId();
    }

    public void setInstitution(Institution institution) {
        this.institution = institution;
    }
}
