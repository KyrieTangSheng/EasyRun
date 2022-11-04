package com.example.demo.objects.service.impl;

import com.example.demo.objects.entity.Comment;
import com.example.demo.objects.repo.CommentRepository;
import com.example.demo.objects.service.iface.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository){
        this.commentRepository = commentRepository;
    }

    @Override
    public List<Comment> getCommentsByRatingId(Long ratingId){
        return commentRepository.findByRatingId(ratingId);
    }

    @Override
    public Optional<Comment> getCommentById(Long id){
        return commentRepository.findById(id);
    }

    @Override
    public Comment addNewComment(Comment comment){
        return commentRepository.save(comment);
    }
}
