package com.launchacademy.localparksreview.controllers.api.v1;

import com.launchacademy.localparksreview.exceptions.UrlNotFoundException;
import com.launchacademy.localparksreview.models.Park;
import com.launchacademy.localparksreview.repositories.ParkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
  public Iterable<Park> getAll(){
    return parkRepo.findAll();
  }

  @GetMapping("/{state}/{id}")
  public Park getParkByState(@PathVariable String state, @PathVariable Integer id){
    Park park = parkRepo.findById(id).orElseThrow(() -> new UrlNotFoundException());
    if (!park.getState().getName().equals(state)) {
      throw new UrlNotFoundException();
    }
    return park;
  }
}
