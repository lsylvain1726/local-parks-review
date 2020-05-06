package com.launchacademy.localparksreview.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LocalParksController {
    @GetMapping(value = "/**/{path:[^\\.]*}")
    public String forward() {
        return "forward:/";
    }
}
