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

    private Integer rank;

    public University(){
    }

    public University(String name,Integer rank) {
        this.rank = rank;
        this.name = name;
    }

    public University(Long id, String name, Integer rank) {
        this.rank = rank;
        this.id = id;
        this.name = name;
    }

    public Integer getRank() {
        return rank;
    }

    public void setRank(Integer rank) {
        this.rank = rank;
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
    public void addProgram(Program program){
        this.programs.add(program);
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

