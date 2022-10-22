package com.example.demo;

import com.example.demo.instructor.InstructorRepository;
import com.example.demo.objects.entity.Institution;
import com.example.demo.objects.repo.InstitutionRepository;
import com.example.demo.student.Student;
import com.example.demo.student.StudentRepository;
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
    @Autowired
    public Config(StudentRepository studentRepository,
                  InstitutionRepository institutionRepository,
                  InstructorRepository instructorRepository){
        this.studentRepository = studentRepository;
        this.institutionRepository = institutionRepository;
        this.instructorRepository = instructorRepository;
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
        if (studentRepository.findAll().isEmpty()) {
            return args -> {
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
                        "abc1234"
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
                        "abc1234"
                );

                studentRepository.saveAll(
                        List.of(kyrie, jay)
                );

                Institution aaa = new Institution(
                        "aaa",
                        "aaa",
                        "aaa"
                );
                Institution bbb = new Institution(
                        "bbb",
                        "bbb",
                        "bbb"
                );
                Institution ccc = new Institution(
                        "ccc",
                        "ccc",
                        "ccc"
                );
                institutionRepository.saveAll(List.of(aaa, bbb, ccc));
//
//                Instructor staffaaa = new Instructor(
//                        "staff@aaa.com",
//                        "aaa",
//                        "staffa",
//                        "staffa",
//                        13300033333L,
//                        "PKU",
//                        "abc1234"
//                );
//
//                Instructor staffbbb = new Instructor(
//                        "staff@bbb.com",
//                        "bbb",
//                        "staffb",
//                        "staffb",
//                        13300033334L,
//                        "THU",
//                        "abc1234"
//                );
//                instructorRepository.saveAll(
//                        List.of(staffaaa, staffbbb)
//                );
            };
        }else{
            return args -> {};
        }
    }
}
