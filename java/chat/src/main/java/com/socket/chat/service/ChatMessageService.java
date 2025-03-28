package com.socket.chat.service;

import com.socket.chat.model.ChatMessage;
import com.socket.chat.repository.ChatMessageRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.socket.chat.repository.ChatMessageRepository.Specs.searchBy;

@Service
@AllArgsConstructor
public class ChatMessageService {

    private ChatMessageRepository chatMessageRepository;

    public List<ChatMessage> getAllMessage(String senderClientId, String targetClientId){
        return chatMessageRepository.findAll(searchBy(senderClientId, targetClientId));
    }

    public ChatMessage saveMessage(ChatMessage message){
        return chatMessageRepository.save(message);
    }
}
