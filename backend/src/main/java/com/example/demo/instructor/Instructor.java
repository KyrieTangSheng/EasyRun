package com.example.demo.instructor;

import com.example.demo.objects.entity.Institution;

import javax.persistence.*;

@Entity
@Table
public class Instructor {
    @Id
    @SequenceGenerator(
            name = "instructor_sequence",
            sequenceName = "instructor_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "instructor_sequence"
    )
    private Long id;
    private String email;
    private String institutionName;
    @ManyToOne(optional=false,fetch = FetchType.LAZY)
    @JoinColumn(name="institution_id",nullable = true)
    private Institution institution;
//    private String institutionName; //FK
    private String firstName;
    private String lastName;
    private Long phoneNumber;
    private String educationExperience;
    private String pwd;

    public Instructor(){

    }
    public Instructor(String email, String institutionName,String firstName,String lastName, Long phoneNumber, String educationExperience, String pwd) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.educationExperience = educationExperience;
        this.pwd = pwd;
        this.institutionName = institutionName;
    }

    public Instructor(Long id, String email, String institutionName,String firstName, String lastName, Long phoneNumber, String educationExperience, String pwd) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.educationExperience = educationExperience;
        this.pwd = pwd;
        this.institutionName = institutionName;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

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

    public String getInstitutionName() {
        return institutionName;
    }

    public void setInstitutionName(String institutionName) {
        this.institutionName = institutionName;
    }

    public Long getInstitution(){return institution.getId();}
    public void setInstitution(Institution institution){
        this.institution = institution;
//        this.institution.addInstructor(this);
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

    public Long getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(Long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEducationExperience() {
        return educationExperience;
    }

    public void setEducationExperience(String educationExperience) {
        this.educationExperience = educationExperience;
    }
}
