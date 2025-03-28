package com.socket.chat;

import com.socket.chat.handler.WebSocketHandler;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
//import org.springframework.web.socket.WebSocketHandler;

@SpringBootApplication
public class ChatApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChatApplication.class, args);
	}

	@Bean
	public WebSocketHandler webSocketHandler() {
		return new WebSocketHandler();
	}
}
