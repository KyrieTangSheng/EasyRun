package com.easyrun.demo.student.account;
import com.easyrun.demo.student.Student;
import com.easyrun.demo.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RequestMapping(path = "account/student")
@RestController
public class StudentAccountController {

    private final StudentAccountServiceImpl studentAccountServiceImpl;

    @Autowired
    public StudentAccountController(StudentAccountServiceImpl studentAccountServiceImpl){
        this.studentAccountServiceImpl = studentAccountServiceImpl;
    }

    @GetMapping(path="all")
    public Response getStudents(){
        return studentAccountServiceImpl.getStudents();
    }

//    @GetMapping(path="get_student")
//    public
//    Response getStudentInfo(@RequestBody Student student){
//        Long studentId = student.getId();
//        return studentAccountServiceImpl.getStudentInfo(studentId);
//    }

    @PostMapping(path="register")
    public Response registerNewStudent(@RequestBody Student student){
        return studentAccountServiceImpl.addNewStudent(student);
    }

    @PostMapping(path = "login")
    public Response loginStudent(@RequestBody Student tempStudent){
        String studentEmail = tempStudent.getEmail();
        String studentPwd = tempStudent.getPwd();
        return studentAccountServiceImpl.loginStudent(studentEmail,studentPwd);
    }

//    @DeleteMapping(path = "delete/{studentId}")
//    public void deleteStudent(@PathVariable("studentId") Long studentId){
//        studentAccountServiceImpl.deleteStudent(studentId);
//    }

    @PostMapping(path = "profile")
    public Response updateStudent(@RequestBody Student student){
        Long studentId = student.getId();
        return studentAccountServiceImpl.updateStudent(studentId,student);
    }



}
