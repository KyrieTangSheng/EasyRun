package com.example.demo.objects.service.iface;

import com.example.demo.objects.entity.Comment;

import java.util.List;
import java.util.Optional;

public interface CommentService {
    List<Comment> getCommentsByInstitutionName(String institutionName);
    Optional<Comment> getCommentById(Long id);
    Comment addNewComment(Comment comment);
}
