package com.example.demo.objects.entity;

import com.example.demo.student.Student;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Table
public class Rating {
    @Id
    @SequenceGenerator(
            name = "rating_sequence",
            sequenceName = "rating_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "rating_sequence"
    )
    private Long id;
    private Long institutionId;
    private String institutionName;
    @ManyToOne
    @JoinColumn(name="institution",nullable = true)
    private Institution institution;
    private Long studentId;
    @ManyToOne
    @JoinColumn(name="student",nullable = true)
    private Student student;
    private String studentUserName;
    private Integer overallRating;
    private Integer criteria1Rating;
    private Integer criteria2Rating;
    private Integer criteria3Rating;
    private Integer criteria4Rating;
    private Integer criteria5Rating;
    private Integer criteria6Rating;
    private String review;
    private LocalDateTime dateTime;

    public Rating(){
    }

    public Rating(Long institutionId, String institutionName, Institution institution, Long studentId, Student student, String studentUserName, Integer overallRating, Integer criteria1Rating, Integer criteria2Rating, Integer criteria3Rating, Integer criteria4Rating, Integer criteria5Rating, Integer criteria6Rating, String review) {
        this.institutionId = institutionId;
        this.institutionName = institutionName;
        this.institution = institution;
        this.studentId = studentId;
        this.student = student;
        this.studentUserName = studentUserName;
        this.overallRating = overallRating;
        this.criteria1Rating = criteria1Rating;
        this.criteria2Rating = criteria2Rating;
        this.criteria3Rating = criteria3Rating;
        this.criteria4Rating = criteria4Rating;
        this.criteria5Rating = criteria5Rating;
        this.criteria6Rating = criteria6Rating;
        this.review = review;
        this.dateTime = LocalDateTime.now();
    }
    public Rating(Long id, Long institutionId, String institutionName, Institution institution, Long studentId, Student student, String studentUserName, Integer overallRating, Integer criteria1Rating, Integer criteria2Rating, Integer criteria3Rating, Integer criteria4Rating, Integer criteria5Rating, Integer criteria6Rating, String review) {
        this.id = id;
        this.institutionId = institutionId;
        this.institutionName = institutionName;
        this.institution = institution;
        this.studentId = studentId;
        this.student = student;
        this.studentUserName = studentUserName;
        this.overallRating = overallRating;
        this.criteria1Rating = criteria1Rating;
        this.criteria2Rating = criteria2Rating;
        this.criteria3Rating = criteria3Rating;
        this.criteria4Rating = criteria4Rating;
        this.criteria5Rating = criteria5Rating;
        this.criteria6Rating = criteria6Rating;
        this.review = review;
        this.dateTime = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getInstitutionId() {
        return institutionId;
    }

    public void setInstitutionId(Long institutionId) {
        this.institutionId = institutionId;
    }

    public String getInstitutionName() {
        return institutionName;
    }

    public void setInstitutionName(String institutionName) {
        this.institutionName = institutionName;
    }

    public Long getInstitution() {
        return institution.getId();
    }

    public void setInstitution(Institution institution) {
        this.institution = institution;
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

    public String getStudentUserName() {
        return studentUserName;
    }

    public void setStudentUserName(String studentUserName) {
        this.studentUserName = studentUserName;
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

    public String getDateTime() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = dateTime.format(formatter); // "1986-04-08 12:30"
        return formattedDateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }
}
