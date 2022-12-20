package com.easyrun.demo.objects.service.proxy;

import com.easyrun.demo.objects.entity.University;
import com.easyrun.demo.objects.service.iface.UniversityService;
import com.easyrun.demo.objects.service.impl.UniversityServiceImpl;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UniversityServiceProxy implements UniversityService {
    private List<University> universities;
    private UniversityServiceImpl universityServiceImpl;

    public UniversityServiceProxy(UniversityServiceImpl universityServiceImpl) {
        this.universityServiceImpl = universityServiceImpl;
        this.universities = new ArrayList<University>();
    }

    @Override
    public List<University> getAllUniversities(){
        if(universities.isEmpty()){
            System.out.println("Didn't use proxy when getting all universities");
            universities = universityServiceImpl.getAllUniversities();
        }else{
            System.out.println("Used proxy when getting all universities");
        }
        return universities;
    }

    @Override
    public University getUniversityByProgramId(Long programId){
        return universityServiceImpl.getUniversityByProgramId(programId);
    }

    @Override
    public University getUniversityById(Long schoolId){
        return universityServiceImpl.getUniversityById(schoolId);
    }

    @Override
    public List<University> getUniversitiesByKeyword(String schoolKeyword){
        return universityServiceImpl.getUniversitiesByKeyword(schoolKeyword);
    }
    @Override
    public List<University> getUniversitiesByName(String schoolName){
        return universityServiceImpl.getUniversitiesByName(schoolName);
    }



}
