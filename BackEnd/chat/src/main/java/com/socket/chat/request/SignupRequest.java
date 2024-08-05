package com.socket.chat.request;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class SignupRequest {
    String username;
    String email;
    String password;
    private Set<String> role;
}
