package com.socket.chat.controller;


import com.socket.chat.model.Notification;
import com.socket.chat.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/notification")
@RequiredArgsConstructor
public class NotificationController extends BaseController {

    private final NotificationService notificationService;

    @GetMapping
    public ResponseEntity<Object> getAllNotification(){
        List<Notification> notificationList = notificationService.getAll();
        if(notificationList.isEmpty()){
            return ResponseEntity.status(
                    HttpStatusCode.valueOf(404)).
                    body(buildResponse(null));
        }
        return ResponseEntity.ok(buildResponse(notificationList));

    }

    @PostMapping
    public ResponseEntity<Object> postNotification(@RequestBody Notification notification){

        Notification savedNotification = notificationService.save(notification);
        return ResponseEntity.ok(buildResponse(savedNotification));

    }

    @GetMapping("/client")
    public ResponseEntity<Object> getClientNotification(@RequestParam Long id){

        List<Notification> notificationList = notificationService.getAllClientNotification(id);

        return ResponseEntity.ok(buildResponse(notificationList));
    }

    @PatchMapping("/seen")
    public ResponseEntity<Object> notificationSeen(@RequestParam Long id){

        Notification notification = notificationService.notificationSeen(id);
        return ResponseEntity.ok(buildResponse(notification));

    }

}
