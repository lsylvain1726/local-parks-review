package com.launchacademy.localparksreview.controllers.api.v1;
import com.launchacademy.localparksreview.exceptions.InvalidVisitorException;
import com.launchacademy.localparksreview.models.Visitor;
import com.launchacademy.localparksreview.repositories.VisitorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("api/v1/visitors")
public class VisitorController {
  @Autowired
  private VisitorRepository visitorRepo;
  @PostMapping
  public Visitor newVisitor(@RequestBody Visitor visitor) {
    if (visitorRepo.findByEmail(visitor.getEmail()).isPresent()) {
      return visitor;
    } else {
      return visitorRepo.save(visitor);
    }
  }
}