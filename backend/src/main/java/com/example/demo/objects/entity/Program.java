package com.example.demo.objects.entity;

import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
public class Program{
    @Id
    @SequenceGenerator(
            name = "program_sequence",
            sequenceName = "program_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "program_sequence"
    )
    private Long id;
    private String name;
    private Long universityId;
    private String url;

    @OneToMany(mappedBy = "program")
    @Cascade(org.hibernate.annotations.CascadeType.DELETE)
    private List<Star> stars;

    @ManyToOne
    @JoinColumn(name="university",nullable=true)
    private University university;

    public Program(){

    }
    public Program(String name, Long universityId, String url, University university) {
        this.name = name;
        this.universityId = universityId;
        this.url = url;
        this.university = university;
    }

    public Program(Long id, String name, Long universityId, String url, University university) {
        this.id = id;
        this.name = name;
        this.universityId = universityId;
        this.url = url;
        this.university = university;
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

    public Long getUniversityId() {
        return universityId;
    }

    public void setUniversityId(Long universityId) {
        this.universityId = universityId;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Long getUniversity() {
        return university.getId();
    }

    public void setUniversity(University university) {
        this.university = university;
    }

    public List<Long> getStars() {
        List<Long> starIds = new ArrayList<Long>();
        for(Star star:stars){
            starIds.add(star.getId());
        }
        return starIds;
    }

    public void setStars(List<Star> stars) {
        this.stars = stars;
    }
}

