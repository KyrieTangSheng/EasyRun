package com.easyrun.demo.objects.service.iface;

import com.easyrun.demo.objects.entity.Institution;

import java.util.List;
import java.util.Optional;

public interface InstitutionService {
  List<Institution> getAllInstitutionsByKeyword(String keyword);
  Optional<Institution> getInstitutionInfoById(Long institutionId);
  List<Institution> getAllInstitutions();
  Optional<Institution> getInstitutionByName(String name);
  Institution updateInstitutionInfo(Institution institution);
}
