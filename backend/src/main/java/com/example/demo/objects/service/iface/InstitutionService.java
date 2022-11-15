package com.example.demo.objects.service.iface;

import com.example.demo.objects.entity.Institution;
import com.example.demo.utils.Response;

import java.util.List;
import java.util.Optional;

public interface InstitutionService {
  List<Institution> getAllInstitutionsByKeyword(String keyword);
  Optional<Institution> getInstitutionInfoById(Long institutionId);
  List<Institution> getAllInstitutions();
  Optional<Institution> getInstitutionByName(String name);
  Institution updateInstitutionInfo(Institution institution);
}
