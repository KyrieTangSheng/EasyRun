package com.example.demo.objects.entity;

import com.example.demo.instructor.Instructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table
public class Institution {
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
    private String name;
    private String description;
    private String url;
    private String verificationCode;
    @OneToMany(mappedBy = "institution")
    private List<Application> applications;
    @OneToMany(mappedBy = "institution")
    private List<Instructor> instructors;
    private Float avgScore1;
    private Float avgScore2;
    private Float avgScore3;
    private Float avgScore4;
    private Float avgScore5;
    private Float avgScore6;
    private Float avgOverallScore;
    public Institution(){

    }
    public Institution(String name, String description, String url,String verificationCode) {
        this.name = name;
        this.description = description;
        this.url = url;
        this.verificationCode = verificationCode;
    }
    public Institution(Long id, String name, String description, String url,String verificationCode) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.url = url;
        this.verificationCode = verificationCode;
    }

    public Float getAvgScore1() {
        return avgScore1;
    }

    public void setAvgScore1(Float avgScore1) {
        this.avgScore1 = avgScore1;
    }

    public Float getAvgScore2() {
        return avgScore2;
    }

    public void setAvgScore2(Float avgScore2) {
        this.avgScore2 = avgScore2;
    }

    public Float getAvgScore3() {
        return avgScore3;
    }

    public void setAvgScore3(Float avgScore3) {
        this.avgScore3 = avgScore3;
    }

    public Float getAvgScore4() {
        return avgScore4;
    }

    public void setAvgScore4(Float avgScore4) {
        this.avgScore4 = avgScore4;
    }

    public Float getAvgScore5() {
        return avgScore5;
    }

    public void setAvgScore5(Float avgScore5) {
        this.avgScore5 = avgScore5;
    }

    public Float getAvgScore6() {
        return avgScore6;
    }

    public void setAvgScore6(Float avgScore6) {
        this.avgScore6 = avgScore6;
    }

    public Float getAvgOverallScore() {
        return avgOverallScore;
    }

    public void setAvgOverallScore(Float avgOverallScore) {
        this.avgOverallScore = avgOverallScore;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public List<Application> getApplications(){
        return applications;
    }
//    public List<Long> getApplications() {
//        List<Long> applicationIds = new ArrayList<>();
//        for(Application application:applications){
//            applicationIds.add(application.getId());
//        }
//        return applicationIds;
//    }
    public void setDescription(String description) {
        this.description = description;
    }

    public void setApplications(List<Application> applications) {
        this.applications = applications;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public List<Instructor> getInstructors() {
        return instructors;
    }

    public void setInstructors(List<Instructor> instructors) {
        this.instructors = instructors;
    }
    public void addInstructor(Instructor instructor){
        this.instructors.add(instructor);
    }
}
