package com.socket.chat.controller;


import com.socket.chat.model.ChatMessage;
import com.socket.chat.service.ChatMessageService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/chat-message")
public class ChatMessageController extends BaseController{

    private final ChatMessageService chatMessageService;

    @GetMapping
    public ResponseEntity<Object> getMessage(@RequestParam String senderClientId,
                                             @RequestParam String targetClientId){

        List<ChatMessage> chatMessageList = chatMessageService.getAllMessage(senderClientId, targetClientId);
        if(!chatMessageList.isEmpty()){
            return ResponseEntity.ok(buildResponse(chatMessageList));
        }

        return ResponseEntity
                .status(HttpStatusCode.valueOf(404))
                .body(buildResponse(null));

    }
}
