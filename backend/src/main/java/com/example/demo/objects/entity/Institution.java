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
