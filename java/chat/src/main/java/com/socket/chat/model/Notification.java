package com.socket.chat.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @OneToOne
    ChatMessage message;

    Boolean isSeen;


}
