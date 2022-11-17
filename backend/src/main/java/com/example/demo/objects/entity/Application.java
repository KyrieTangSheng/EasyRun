package com.example.demo.objects.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table
public class Application {
    @Id
    @SequenceGenerator(
            name = "application_sequence",
            sequenceName = "application_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "application_sequence"
    )
    private Long id;

    private Long programId;
    @ManyToOne
    @JoinColumn(name="program",nullable=true)
    private Program program;
    @ManyToOne
    @JoinColumn(name="institution",nullable=true)
    private Institution institution;
    private String instructorName;
    private String institutionName;
    private Boolean status;
    private String underGradSchool;
    private Float overallGPA;
    private Float majorGPA;
    private String major;
    private Integer toeflScore;
    private Integer greScore;
    private String researchExp;
    private String internExp;
    private String universityName;
    private String programName;
    public Application(){

    }
    public Application(Long programId, String instructorName, String institutionName, Boolean status, String underGradSchool, Float overallGPA, Float majorGPA, String major, Integer toeflScore, Integer greScore, String researchExp, String internExp) {
        this.programId = programId;
        this.instructorName = instructorName;
        this.institutionName = institutionName;
        this.status = status;
        this.underGradSchool = underGradSchool;
        this.overallGPA = overallGPA;
        this.majorGPA = majorGPA;
        this.major = major;
        this.toeflScore = toeflScore;
        this.greScore = greScore;
        this.researchExp = researchExp;
        this.internExp = internExp;
    }

    public Application(Long id, Long programId, String instructorName, String institutionName, Boolean status, String underGradSchool, Float overallGPA, Float majorGPA, String major, Integer toeflScore, Integer greScore, String researchExp, String internExp) {
        this.id = id;
        this.programId = programId;
        this.instructorName = instructorName;
        this.institutionName = institutionName;
        this.status = status;
        this.underGradSchool = underGradSchool;
        this.overallGPA = overallGPA;
        this.majorGPA = majorGPA;
        this.major = major;
        this.toeflScore = toeflScore;
        this.greScore = greScore;
        this.researchExp = researchExp;
        this.internExp = internExp;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getInstitution() {
        if(Objects.isNull(institution)){
            return -1L;
        } else{
            return institution.getId();
        }
    }
    public void setInstitution(Institution institution) {
        this.institution = institution;
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
    public String getUniversityName(){return program.getUniversityName();}
    public String getProgramName(){return program.getName();}
    public void setProgram(Program program) {
        this.program = program;
    }

    public String getInstructorName() {
        return instructorName;
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

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
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

    public Integer getToeflScore() {
        return toeflScore;
    }

    public void setToeflScore(Integer toeflScore) {
        this.toeflScore = toeflScore;
    }

    public Integer getGreScore() {
        return greScore;
    }

    public void setGreScore(Integer greScore) {
        this.greScore = greScore;
    }

    public String getResearchExp() {
        return researchExp;
    }

    public void setResearchExp(String researchExp) {
        this.researchExp = researchExp;
    }

    public String getInternExp() {
        return internExp;
    }

    public void setInternExp(String internExp) {
        this.internExp = internExp;
    }
}
