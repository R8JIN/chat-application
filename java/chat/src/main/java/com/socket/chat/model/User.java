package com.socket.chat.model;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class User extends Client{

    private String username;
    private String email;
    private String password;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(  name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();


    public User(String firstName, String lastName, String username, String email, String password) {

        super(firstName, lastName);
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
