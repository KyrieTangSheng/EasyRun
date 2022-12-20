package com.easyrun.demo.observers;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class NewContractNotificationHandler {

    //Will function upon notified,
    //Here we simulate a external email sender
    @EventListener
    public void sendNotification(final NewContractEvent newContractEvent){
        String studentEmail = newContractEvent.getStudent().getEmail();
        String instructorName = newContractEvent.getInstructor().getUserName();
        String institutionName = newContractEvent.getInstitution().getName();
        System.out.println("Notification sent to Student Email: " + studentEmail
        + ". Instructor " + instructorName + "from Institution " + institutionName + "has created new contract.");
    }
}
