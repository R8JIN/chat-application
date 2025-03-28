package com.socket.chat.controller;


import com.socket.chat.mapstruct.ClientDto;
import com.socket.chat.model.Client;
import com.socket.chat.service.ClientService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.rsocket.service.RSocketExchange;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/client")
@AllArgsConstructor
public class ClientController extends BaseController{

    private final ClientService clientService;

    @GetMapping
    public ResponseEntity<Object> getAll(@RequestParam Long id){

        List<ClientDto> clientList = clientService.getAll(id);

        System.out.println("The list of the client "+ clientList);
        if(clientList.isEmpty()){
            return ResponseEntity.status(HttpStatusCode.valueOf(404)).body(buildResponse(null));
        }
        return ResponseEntity.ok(buildResponse(clientList));
    }
}
