package com.example.demo.student.home;

import com.example.demo.utils.Response;

public interface StudentHomeService {
    Response viewStarredPrograms(Long studentId);
    Response viewContracts(Long studentId);
    Response changeContractStatus(Long contractId,String newStatus, Long studentId);
}
