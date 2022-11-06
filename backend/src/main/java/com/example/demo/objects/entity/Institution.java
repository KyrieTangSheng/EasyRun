package com.example.demo.objects.entity;

import com.example.demo.instructor.Instructor;
import org.hibernate.annotations.Cascade;

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
    @OneToMany(mappedBy = "institution")
    private List<Instructor> instructors;
    public Institution(){

    }
    public Institution(String name, String description, String url) {
        this.name = name;
        this.description = description;
        this.url = url;
    }
    public Institution(Long id, String name, String description, String url) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.url = url;
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

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public List<Long> getInstructors() {
        List<Long> instructorIds = new ArrayList<Long>();
        for(Instructor instructor:instructors){
            instructorIds.add(instructor.getId());
        }
        return instructorIds;
    }

    public void setInstructors(List<Instructor> instructors) {
        this.instructors = instructors;
    }
    public void addInstructor(Instructor instructor){
        this.instructors.add(instructor);
    }
}
