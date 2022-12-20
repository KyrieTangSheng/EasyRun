package com.easyrun.demo.student.account;

import com.easyrun.demo.student.Student;
import com.easyrun.demo.utils.Response;

import java.util.Optional;

public interface StudentAccountService {

    Response getStudents();

    Response addNewStudent(Student student);

    void deleteStudent(Long studentId);

    Response loginStudent(String studentEmail,String studentPwd);

    Response updateStudent(Long studentId, Student student);

    Optional<Student> getStudentInfoByEmail(String studentEmail);
    Optional<Student> getStudentInfoById(Long studentId);
}
