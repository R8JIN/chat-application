package com.socket.chat.repository;


import com.socket.chat.model.Client;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long>, JpaSpecificationExecutor<Client> {

    interface Specs{

        static Specification<Client> getClient(Long id){
            return (root, query, builder) -> builder.not(builder.equal(root.get("id"), id));
        }
    }
}
