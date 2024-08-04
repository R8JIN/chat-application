package com.socket.chat.handler;

import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.socket.TextMessage;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class WebSocketHandler extends TextWebSocketHandler {

    private final Map<String, WebSocketSession> sessions = Collections.synchronizedMap(new HashMap<>());
    private final ObjectMapper objectMapper = new ObjectMapper();

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
        String senderClientId = jsonNode.get("senderClientId").asText(); // Extract sender ID from the message
        String targetClientId = jsonNode.get("targetClientId").asText();
        String textMessage = jsonNode.get("message").asText();

        WebSocketSession targetSession = sessions.get(targetClientId);
        if (targetSession != null && targetSession.isOpen()) {
            ObjectNode responseNode = objectMapper.createObjectNode();
            responseNode.put("senderClientId", senderClientId); // Include sender ID in the response
            responseNode.put("message", textMessage);
            responseNode.put("targetClientId", targetClientId);
            
            String responseText = responseNode.toString();
            targetSession.sendMessage(new TextMessage(responseText));
        }
    }

    private String getClientId(WebSocketSession session) {
        // Extract client ID from the session, this could be a query parameter or a header
        // For this example, we assume client ID is passed as a query parameter
        String uri = session.getUri().toString();
        return uri.substring(uri.lastIndexOf('=') + 1);
    }
}
