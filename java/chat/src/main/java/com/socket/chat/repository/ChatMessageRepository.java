package com.socket.chat.repository;

import com.socket.chat.model.ChatMessage;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long>,
        JpaSpecificationExecutor<ChatMessage> {

    interface  Specs{

        static Specification<ChatMessage> searchBy(String senderClientId, String targetClientId){
            return (root, query, builder)-> builder.or(builder.and(
                    builder.equal(root.get("senderClientId"), senderClientId),
                    builder.equal(root.get("targetClientId"), targetClientId)),
                    builder.and(
                    builder.equal(root.get("senderClientId"), targetClientId),
                    builder.equal(root.get("targetClientId"), senderClientId)
                    ));

        }
    }
}
