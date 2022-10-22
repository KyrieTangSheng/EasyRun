package com.example.demo.user.view.institution;

import com.example.demo.objects.entity.Comment;
import com.example.demo.objects.entity.Rating;
import com.example.demo.utils.Response;

public interface UserViewInstitutionService {
    Response getAllInstitutions();
    Response getInstitutionsByKeyword(String keyword);
    Response getSpecificInstitutionInfo(String institutionName,Long studentId);
    Response rateInstitution(Rating rating);
    Response commentRating(Comment comment);
    Response getInstitutionMembers(String institutionName);
}
