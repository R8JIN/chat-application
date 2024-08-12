package com.socket.chat.service;


import com.socket.chat.model.Notification;
import com.socket.chat.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.socket.chat.repository.NotificationRepository.Specs.filterClientNotification;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public List<Notification> getAll(){
        return notificationRepository.findAll();
    }

    public Notification save(Notification notification){

        return notificationRepository.save(notification);

    }

    public Notification getNotificationById(Long id){

        return notificationRepository.findById(id).get();
    }

    public List<Notification> getAllClientNotification(Long clientId){

        return notificationRepository.findAll(filterClientNotification(clientId));
    }

    public Notification notificationSeen(Long notificationId){
        Notification notification = getNotificationById(notificationId);
        notification.setIsSeen(true);
        return notificationRepository.save(notification);
    }
}
