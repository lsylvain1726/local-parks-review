package com.launchacademy.localparksreview.controllers.api.v1;

import com.launchacademy.localparksreview.models.Park;
import com.launchacademy.localparksreview.repositories.ParkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/parks")
public class ParkRestController {
  private ParkRepository parkRepo;


    @Autowired
  public void setParkRepo(ParkRepository parkRepo) {
    this.parkRepo = parkRepo;
  }
    @GetMapping
    public Iterable<Park> getList() {
      return parkRepo.findAll();
  }
}


