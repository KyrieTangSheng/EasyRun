package com.easyrun.demo.student.home;

import com.easyrun.demo.utils.Response;

public interface StudentHomeService {
    Response viewStarredPrograms(Long studentId);
    Response viewContracts(Long studentId);
    Response changeContractStatus(Long contractId,Integer newStatus, Long studentId);
}
