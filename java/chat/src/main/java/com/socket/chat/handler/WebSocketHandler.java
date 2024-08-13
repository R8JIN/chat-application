package com.socket.chat.handler;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.socket.chat.model.ChatMessage;

import com.socket.chat.model.Notification;
import com.socket.chat.repository.NotificationRepository;
import com.socket.chat.service.ChatMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.socket.TextMessage;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

public class WebSocketHandler extends TextWebSocketHandler {

    private final Map<String, WebSocketSession> sessions = Collections.synchronizedMap(new HashMap<>());
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private ChatMessageService chatMessageService;

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String clientId = getClientId(session);
        sessions.put(clientId, session);
         
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String clientId = getClientId(session);
        sessions.remove(clientId);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {

        JsonNode jsonNode = objectMapper.readTree(message.getPayload());
        String senderClientId = jsonNode.get("senderClientId").asText();
        String targetClientId = jsonNode.get("targetClientId").asText();
        String textMessage = jsonNode.get("message").asText();

        WebSocketSession targetSession = sessions.get(targetClientId);

        ChatMessage chatMessage = ChatMessage.builder()
                .senderClientId(senderClientId)
                .targetClientId(targetClientId)
                .message(textMessage)
                .messageTimeStamp(LocalDateTime.now()).build();

        ChatMessage savedChatMessage= chatMessageService.saveMessage(chatMessage);

        if (targetSession == null || !targetSession.isOpen()) {
            System.out.println("Socket for targetClientId " + targetClientId + " is closed or does not exist.");
            // TODO: Notification

            Notification  notification = Notification.builder().build();
            notification.setMessage(chatMessage);
            notification.setIsSeen(false);
            notificationRepository.save(notification);

        }



        if (targetSession != null && targetSession.isOpen()) {
            ObjectNode responseNode = objectMapper.createObjectNode();

            responseNode.put("id", savedChatMessage.getId());
            responseNode.put("senderClientId", senderClientId);
            responseNode.put("message", textMessage);
            responseNode.put("targetClientId", targetClientId);
            responseNode.put("messageTimeStamp", LocalDateTime.now().toString());

            String responseText = responseNode.toString();
            targetSession.sendMessage(new TextMessage(responseText));
        }
    }

    private String getClientId(WebSocketSession session) {

        String uri = session.getUri().toString();
        return uri.substring(uri.lastIndexOf('=') + 1);
    }
}
