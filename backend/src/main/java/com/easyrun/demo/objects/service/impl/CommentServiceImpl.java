package com.easyrun.demo.objects.service.impl;

import com.easyrun.demo.objects.entity.Comment;
import com.easyrun.demo.objects.repo.CommentRepository;
import com.easyrun.demo.objects.service.iface.CommentService;
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
            comment.setParentUserName(fatherComment.getStudentUserName());
            comment.setChildComments(new ArrayList<Comment>());
            return commentRepository.save(comment);
        }else {
            Comment newComment = commentRepository.save(comment);
            newComment.setParentId(comment.getId());
            newComment.setChildComments(new ArrayList<Comment>());
            newComment.setParentComment(comment);
            newComment.addChildComment(comment);
            newComment.setId(comment.getId());
            return commentRepository.save(newComment);
        }

    }
}
