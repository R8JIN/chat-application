package com.socket.chat.controller;

import java.util.HashMap;
import java.util.Map;

public class BaseController {

    public Object buildResponse(Object o){
        Map<String, Object> response = new HashMap<>();

        if(o !=  null) {
            response.put("success", true);
            response.put("data", o);
            return response;
        }
        response.put("success", false);
        response.put("data", null);
        return response;
    }
}
