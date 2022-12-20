package com.easyrun.demo.user.application;

import com.easyrun.demo.objects.entity.Application;
import com.easyrun.demo.utils.Response;

public interface UserApplicationService {
    Response getProgramsByKeyword(String schoolName, String programKeyword);
    Response getAllInstitutions();
    Response uploadApplicationResult(Application application);

    Response getUniversitiesByKeyword(String schoolKeyword);
}
