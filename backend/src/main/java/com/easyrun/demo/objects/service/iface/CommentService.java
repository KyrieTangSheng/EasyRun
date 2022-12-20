package com.easyrun.demo.objects.service.iface;

import com.easyrun.demo.objects.entity.Comment;

import java.util.List;
import java.util.Optional;

public interface CommentService {
    List<Comment> getCommentsByRatingId(Long ratingId);
    Optional<Comment> getCommentById(Long id);
    Comment addNewComment(Comment comment);
}
