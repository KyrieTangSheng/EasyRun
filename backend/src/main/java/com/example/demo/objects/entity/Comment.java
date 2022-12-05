package com.example.demo.objects.entity;

import com.example.demo.student.Student;
import net.bytebuddy.asm.Advice;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
public class Comment {
    @Id
    @SequenceGenerator(
            name = "comment_sequence",
            sequenceName = "comment_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "comment_sequence"
    )
    private Long id;
    private Long ratingId;
    @ManyToOne
    @JoinColumn(name="rating",nullable = true)
    private Rating rating;

    private Long parentId;
    @ManyToOne
    @JoinColumn(name="parent",nullable = true)
    private Comment parentComment;
    @OneToMany
    private List<Comment> childComments;
    private String content;
    private Long studentId;
    private String studentUserName;
    @ManyToOne
    @JoinColumn(name="student",nullable = true)
    private Student student;
    private LocalDateTime dateTime;
    private String parentUserName;
    public Comment(){

    }

    public Comment(Long ratingId, Long parentId, String content, Long studentId, String studentUserName) {
        this.ratingId = ratingId;
        this.parentId = parentId;
        this.content = content;
        this.studentId = studentId;
        this.studentUserName = studentUserName;
        this.dateTime = LocalDateTime.now();
        this.childComments = new ArrayList<>();
    }

    public Comment(Long id, Long ratingId, Long parentId, String content, Long studentId, String studentUserName) {
        this.id = id;
        this.ratingId = ratingId;
        this.parentId = parentId;
        this.content = content;
        this.studentId = studentId;
        this.studentUserName = studentUserName;
        this.dateTime = LocalDateTime.now();
        this.childComments = new ArrayList<>();
    }

    public String getParentUserName() {
        return parentUserName;
    }

    public void setParentUserName(String parentUserName) {
        this.parentUserName = parentUserName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRatingId() {
        return ratingId;
    }

    public void setRatingId(Long ratingId) {
        this.ratingId = ratingId;
    }

    public Long getRating() {
        return rating.getId();
    }

    public void setRating(Rating rating) {
        this.rating = rating;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public Long getParentComment() {
        return parentComment.getId();
    }

    public void setParentComment(Comment parentComment) {
        this.parentComment = parentComment;
    }

    public List<Long> getChildComments() {
        List<Long> commentIds = new ArrayList<Long>();
        for (Comment comment:childComments){
            commentIds.add(comment.getId());
        }
        return commentIds;
    }

    public void addChildComment(Comment comment){
        childComments.add(comment);
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public String getStudentUserName() {
        return studentUserName;
    }

    public void setStudentUserName(String studentUserName) {
        this.studentUserName = studentUserName;
    }

    public Long getStudent() {
        return student.getId();
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public void setChildComments(List<Comment> childComments) {
        this.childComments = childComments;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
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

