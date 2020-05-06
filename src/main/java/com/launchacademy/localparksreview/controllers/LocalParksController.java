package com.launchacademy.localparksreview.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LocalParksController {
<<<<<<< HEAD
  @GetMapping(value = "/**/{path:[^\\.]*}")
  public String forward() {
    return "forward:/";
  }
=======
    @GetMapping(value = "/**/{path:[^\\.]*}")
    public String forward() {
        return "forward:/";
    }
>>>>>>> 3bfb6bcc78bff6049bb332a360d64b3571659e6c
}
