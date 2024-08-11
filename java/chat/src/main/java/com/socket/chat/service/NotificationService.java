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

    public List<Notification> getAllClientNotification(Long id){

        return notificationRepository.findAll(filterClientNotification(id));
    }
}
