package com.example.demo.objects.service.impl;

import com.example.demo.objects.entity.Program;
import com.example.demo.objects.entity.Star;
import com.example.demo.objects.entity.University;
import com.example.demo.objects.repo.InstitutionRepository;
import com.example.demo.objects.repo.StarRepository;
import com.example.demo.objects.service.iface.StarService;
import com.example.demo.student.Student;
import com.example.demo.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class StarServiceImpl implements StarService {

    private final StarRepository starRepository;
    @Autowired
    public StarServiceImpl(StarRepository starRepository){
        this.starRepository = starRepository;
    }

    @Override
    public List<Star> getStarsByStudentId(Long studentId){
        List<Star> stars = this.starRepository.findByStudentId(studentId);
        return stars;
    }

    @Override
    public Boolean alreadyStarred(Long studentId,Long programId){
        List<Star> stars = starRepository.findByStudentIdAndProgramId(studentId,programId);
        if (stars.isEmpty()){
            return false;
        }else{
            return true;
        }
    }
    @Override
    public Star addNewStar(Star star){
        Boolean starred = alreadyStarred(star.getStudentId(),star.getProgramId());
        if (starred) {
            throw new IllegalStateException("Already starred");
        }
        return starRepository.save(star);
    }

    @Transactional
    @Override
    public void deleteStar(Long programId, Long studentId){
        Boolean starred = alreadyStarred(studentId,programId);
        if(!starred){
            throw new IllegalStateException("Not starred");
        }
        starRepository.deleteByStudentIdAndProgramId(studentId,programId);
    }
}
