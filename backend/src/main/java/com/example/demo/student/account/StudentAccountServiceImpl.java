package com.example.demo.student.account;

import com.example.demo.student.Student;
import com.example.demo.student.StudentRepository;
import com.example.demo.utils.Response;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class StudentAccountServiceImpl implements StudentAccountService {
    private final StudentRepository studentRepository;

    @Autowired
    public StudentAccountServiceImpl(StudentRepository studentRepository){
        this.studentRepository = studentRepository;
    }

    @Override
    public Response getStudents(){
        List<Student> studentList = studentRepository.findAll();
        ObjectMapper mapper = new ObjectMapper();
        try{
            String jsonStudent = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(studentList);
            Response response = new Response(1,100,jsonStudent);
            return response;
        }
        catch(Exception e){
            throw new IllegalStateException("Json Parsing Error");
        }
    }

    @Override
    public Optional<Student> getStudentInfoByEmail(String studentEmail){
        Optional<Student> optionalStudent = studentRepository.findStudentByEmail(studentEmail);
        return optionalStudent;
    }
    @Override
    public Response addNewStudent(Student student) {
        Optional<Student> studentOptionalByEmail = studentRepository
                .findStudentByEmail(student.getEmail());
        if (studentOptionalByEmail.isPresent()){
            //Email Taken
            Response response = new Response(0,1,null);
            return response;
        }
        Optional<Student> studentOptionalByUserName = studentRepository
                .findStudentByUserName(student.getUserName());
        if (studentOptionalByUserName.isPresent()){
            //UserName Taken
            Response response = new Response(0,2,null);
            return response;
        }



        studentRepository.save(student);
        ObjectMapper mapper = new ObjectMapper();
        try{
            String jsonStudent = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(student);
            Response response = new Response(1,100,jsonStudent);
            return response;
        }
        catch(Exception e){
            throw new IllegalStateException("Json Parsing Error");
        }
    }

    @Override
    public void deleteStudent(Long studentId) {
        boolean exists = studentRepository.existsById(studentId);
        if (!exists){
            throw new IllegalStateException("No such student");
        }
        studentRepository.deleteById(studentId);
    }

    @Override
    public Response loginStudent(String studentEmail, String studentPwd){
        Optional<Student> optionalStudent = studentRepository.
                findStudentByEmail(studentEmail);
        if (optionalStudent.isEmpty()){
            //Email not Exists
            Response response = new Response(0,3,null);
            return response;
        }
        Student student = optionalStudent.get();
        if (!Objects.equals(student.getPwd(),studentPwd)){
            //Password Incorrect
            Response response = new Response(0,2,null);
            return response;
        }

        ObjectMapper mapper = new ObjectMapper();
        try{
            String jsonStudent = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(student);
            Response response = new Response(1,100,jsonStudent);
            return response;
        }
        catch(Exception e){
            throw new IllegalStateException("Json Parsing Error");
        }
    }

    @Override
    @Transactional
    public Response updateStudent(Long studentId, Student student) {
        student.setId(studentId);

        Optional<Student> studentOptionalByEmail = studentRepository
                .findStudentByEmail(student.getEmail());
        if (studentOptionalByEmail.isPresent()){
            //Email Taken
            Response response = new Response(0,1,null);
            return response;
        }
        Optional<Student> studentOptionalByUserName = studentRepository
                .findStudentByEmail(student.getUserName());
        if (studentOptionalByUserName.isPresent()){
            //UserName Taken
            Response response = new Response(0,2,null);
            return response;
        }
        studentRepository.save(student);

        ObjectMapper mapper = new ObjectMapper();
        try{
            String jsonStudent = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(student);
            Response response = new Response(1,100,jsonStudent);
            return response;
        }
        catch(Exception e){
            throw new IllegalStateException("Json Parsing Error");
        }
    }

    @Override
    public Optional<Student> getStudentInfoById(Long studentId){
        return studentRepository.findById(studentId);
    }
}
