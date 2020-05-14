package com.launchacademy.localparksreview.controllers.api.v1;

import com.launchacademy.localparksreview.exceptions.UrlNotFoundException;
import com.launchacademy.localparksreview.models.Park;
import com.launchacademy.localparksreview.models.State;
import com.launchacademy.localparksreview.repositories.ParkRepository;
import com.launchacademy.localparksreview.repositories.StateRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.apache.commons.lang3.StringUtils;

@RestController
@RequestMapping("/api/v1/parks")
public class ParkRestController {
    private ParkRepository parkRepo;


    @Autowired
    public void setParkRepo(ParkRepository parkRepo) {
        this.parkRepo = parkRepo;
    }

    @Autowired
    StateRepository stateRepository;


    @GetMapping
    public Iterable<Park> getAll() {
        return parkRepo.findAll();
    }

    @GetMapping("{state}")
    public List<Park> parkList(@PathVariable String state){
        State state1 = (stateRepository.findByName(state));
        return parkRepo.findAllByState(state1);
    }

    @GetMapping("{state}/{id}")
    public Park getParkByState(@PathVariable String state, @PathVariable Integer id) {
        Park park = parkRepo.findById(id).orElseThrow(() -> new UrlNotFoundException());
        if (!park.getState().getName().equals(state)) {
            throw new UrlNotFoundException();
        }
        return park;
    }

    @GetMapping("/searchBar")
    public List<String> getParksForSearchBar(){
        List<String> searchBarList = new ArrayList<>();
        Iterable <Park> parks = parkRepo.findAll();
        for(Park park: parks){
            searchBarList.add(park.getName());
        }
        return searchBarList;
    }
}