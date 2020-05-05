package com.launchacademy.localparksreview.controllers.api.v1;

import com.launchacademy.localparksreview.models.State;
import com.launchacademy.localparksreview.repositories.StateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/states")
public class StateController {
private StateRepository stateRepo;

@Autowired
  public void setStateRepo(StateRepository stateRepo){
  this.stateRepo = stateRepo;
}
@GetMapping
public Iterable<State>getList() {
  return stateRepo.findAll();
}
}
