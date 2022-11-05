package com.example.demo.objects.service.impl;

import com.example.demo.objects.entity.Comment;
import com.example.demo.objects.repo.CommentRepository;
import com.example.demo.objects.service.iface.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
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
    @Transactional
    public Comment addNewComment(Comment comment){
        if (Objects.nonNull(comment.getParentId())){
            Comment fatherComment = commentRepository.findById(comment.getParentId()).get();
            comment.setChildComments(new ArrayList<Comment>());
//            comment.setParentComment(fatherComment);
//            fatherComment.addChildComment(comment);
            return commentRepository.save(comment);
        }else {
            Comment newComment = commentRepository.save(comment);
            newComment.setParentId(comment.getId());
            newComment.setChildComments(new ArrayList<Comment>());
            newComment.setParentComment(comment);
            newComment.addChildComment(comment);
            newComment.setId(comment.getId());
            System.out.println("bbbbbbbbbb");
            return commentRepository.save(newComment);
        }

    }
}
