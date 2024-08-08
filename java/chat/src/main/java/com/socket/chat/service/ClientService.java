package com.socket.chat.service;


import com.socket.chat.mapstruct.ClientDto;
import com.socket.chat.model.Client;
import com.socket.chat.repository.ClientRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.socket.chat.repository.ClientRepository.Specs.getClient;

@Service
@AllArgsConstructor
public class ClientService {

    private final ClientRepository clientRepository;


    public List<ClientDto> getAll(Long id){

        System.out.println("The lo");
        return clientRepository.findAll(getClient(id)).stream()
                .map(client -> new ClientDto(client.getId(), client.getFirstName(), client.getLastName()))
                .collect(Collectors.toList());
    }

}
