package com.easyrun.demo;

import com.easyrun.demo.instructor.InstructorRepository;
import com.easyrun.demo.objects.entity.Institution;
import com.easyrun.demo.objects.repo.InstitutionRepository;
import com.easyrun.demo.objects.repo.ProgramRepository;
import com.easyrun.demo.objects.repo.UniversityRepository;
import com.easyrun.demo.student.Student;
import com.easyrun.demo.student.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Configuration
public class Config {
    private final StudentRepository studentRepository;
    private final InstitutionRepository institutionRepository;
    private final InstructorRepository instructorRepository;
    private final ProgramRepository programRepository;
    private final UniversityRepository universityRepository;
    @Autowired
    public Config(StudentRepository studentRepository,
                  InstitutionRepository institutionRepository,
                  InstructorRepository instructorRepository,
                  ProgramRepository programRepository,
                  UniversityRepository universityRepository){
        this.studentRepository = studentRepository;
        this.institutionRepository = institutionRepository;
        this.instructorRepository = instructorRepository;
        this.programRepository = programRepository;
        this.universityRepository = universityRepository;
    }
    public Date StringToDate(String s){

        Date result = null;
        try{
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            result  = dateFormat.parse(s);
        }

        catch(ParseException e){
            e.printStackTrace();

        }
        return result ;
    }
    @Bean
    CommandLineRunner commandLineRunner(){
            return args -> {
                if (studentRepository.findAll().isEmpty()) {
                    Student kyrie = new Student(
                            "kyrie@nyu.edu",
                            "Kyrie",
                            "Sheng",
                            "Kyrieee",
                            "NYU",
                            3.9F,
                            3.9F,
                            "Computer Science",
                            332L,
                            110L,
                            "DSTC11",
                            "HelloBike",
                            StringToDate("2000-10-18"),
                            "abc1234",
                            15972590909L
                    );

                    Student jay = new Student(
                            "jay@nyu.edu",
                            "Jay",
                            "Weng",
                            "Jayyy",
                            "NYU",
                            3.9F,
                            3.9F,
                            "Computer Science",
                            330L,
                            110L,
                            "DSTC11",
                            "Alipay",
                            StringToDate("2001-04-17"),
                            "abc1234",
                            1238273828L
                    );

                    studentRepository.saveAll(
                            List.of(kyrie, jay)
                    );
                }

                if (institutionRepository.findAll().isEmpty()) {
                    Institution aaa = new Institution(
                            "aaa",
                            "aaa",
                            "aaa",
                            "123456"
                    );
                    Institution bbb = new Institution(
                            "bbb",
                            "bbb",
                            "bbb",
                            "123456"
                    );
                    Institution ccc = new Institution(
                            "ccc",
                            "ccc",
                            "ccc",
                            "123456"
                    );
                    institutionRepository.saveAll(List.of(aaa, bbb, ccc));
                }

//                if (universityRepository.findAll().isEmpty()) {
//                    University universityA = new University(
//                            "UPenn"
//                    );
//                    universityRepository.save(universityA);
//                }
//
//                if (programRepository.findAll().isEmpty()) {
//                    Program programA  = new Program(
//                            "CIS",
//                            1L,
//                            "CIS.com");
//                    programRepository.save(programA);
//                    University university = universityRepository.findById(1L).get();
//                    programA.setUniversity(university);
//                    university.addProgram((programA));
//                }

            };
    }
}
