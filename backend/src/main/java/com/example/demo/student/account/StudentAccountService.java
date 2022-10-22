package com.example.demo.student.account;

import com.example.demo.student.Student;
import com.example.demo.utils.Response;

import java.util.List;
import java.util.Optional;

public interface StudentAccountService {

    Response getStudents();

    Response addNewStudent(Student student);

    void deleteStudent(Long studentId);

    Response loginStudent(String studentEmail,String studentPwd);

    Response updateStudent(Long studentId, Student student);

    Optional<Student> getStudentInfoByEmail(String studentEmail);
}
