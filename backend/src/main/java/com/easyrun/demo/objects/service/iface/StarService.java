package com.easyrun.demo.objects.service.iface;

import com.easyrun.demo.objects.entity.Star;

import java.util.List;

public interface StarService {
    List<Star> getStarsByStudentId(Long studentId);

    Star addNewStar(Star star);
    Boolean alreadyStarred(Long studentId,Long programId);

    void deleteStar(Long programId, Long studentId);
}
