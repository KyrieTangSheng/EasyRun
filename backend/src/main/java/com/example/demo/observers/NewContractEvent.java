package com.example.demo.observers;


import com.example.demo.instructor.Instructor;
import com.example.demo.objects.entity.Institution;
import com.example.demo.student.Student;
import org.springframework.context.ApplicationEvent;

public class NewContractEvent extends ApplicationEvent {
    private Student student;
    private Instructor instructor;
    private Institution institution;

    public NewContractEvent(final Object source, final Student student,
                            final Instructor instructor, final Institution institution){
        super(source);
        this.student = student;
        this.instructor = instructor;
        this.institution = institution;
    }

    public Student getStudent(){
        return student;
    }

    public Instructor getInstructor() {
        return instructor;
    }

    public Institution getInstitution() {
        return institution;
    }
}
