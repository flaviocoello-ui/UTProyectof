package com.proyecto.eventos_utp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class PruebaController {
    @GetMapping("/hola")
    public String hola(){
        return "hola desde el backen con springboot";
    }
}
