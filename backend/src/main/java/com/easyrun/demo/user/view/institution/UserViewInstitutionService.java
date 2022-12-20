package com.easyrun.demo.user.view.institution;

import com.easyrun.demo.objects.entity.Comment;
import com.easyrun.demo.objects.entity.Rating;
import com.easyrun.demo.utils.Response;

public interface UserViewInstitutionService {
    Response getAllInstitutions();
    Response getInstitutionsByKeyword(String keyword);
    Response getSpecificInstitutionInfo(String institutionName,Long studentId);
    Response rateInstitution(Rating rating);
    Response commentRating(Comment comment);
    Response getInstitutionMembers(String institutionName);
}
