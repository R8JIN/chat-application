package com.socket.chat.repository;


import com.socket.chat.model.Notification;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository
        extends JpaRepository<Notification, Long>,
        JpaSpecificationExecutor<Notification> {


    interface  Specs{
        static Specification<Notification> filterClientNotification(Long clientId){
            return (root, query, builder) ->
                    builder.equal(root.get("message").get("targetClientId"), clientId.toString());
        }
    }
}
