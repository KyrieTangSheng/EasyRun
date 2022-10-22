package com.example.demo.objects.entity;

import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
public class University{
    @Id
    @SequenceGenerator(
            name = "university_sequence",
            sequenceName = "university_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "university_sequence"
    )
    private Long id;
    private String name;

    @OneToMany(mappedBy="university")
    @Cascade(org.hibernate.annotations.CascadeType.DELETE)
    private List<Star> stars;

    @OneToMany(mappedBy = "university")
    @Cascade(org.hibernate.annotations.CascadeType.DELETE)
    private List<Program> programs;

    public University(){
    }

    public University(String name, List<Program> programs) {
        this.name = name;
        this.programs = programs;
    }

    public University(Long id, String name, List<Program> programs) {
        this.id = id;
        this.name = name;
        this.programs = programs;
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


    public List<Long> getPrograms() {
        List<Long> programIds = new ArrayList<Long>();
        for(Program program:programs){
            programIds.add(program.getId());
        }
        return programIds;
    }

    public void setPrograms(List<Program> programs) {
        this.programs = programs;
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

