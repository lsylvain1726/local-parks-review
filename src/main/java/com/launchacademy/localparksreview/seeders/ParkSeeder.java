package com.launchacademy.localparksreview.seeders;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.launchacademy.localparksreview.models.Park;
import com.launchacademy.localparksreview.repositories.ParkRepository;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Component
public class ParkSeeder implements CommandLineRunner {
  private ParkRepository parkRepo;

  @Autowired
  public void setParkRepository(ParkRepository parkRepo) {
    this.parkRepo = parkRepo;
  }

  public String getParks() {
    final String uri = "https://developer.nps.gov/api/v1/parks?stateCode=ma&api_key=RrRy9TREVxKtqPjCVNLaQhYfdrUtNFrTehHBycDg";
    RestTemplate restTemplate = new RestTemplate();
    String result = restTemplate.getForObject(uri, String.class);
    return result;
  }

  @Override
  public void run(String... args) throws Exception {
    ObjectMapper mapper = new ObjectMapper();
    JsonNode jsonNode = mapper.readTree(getParks());

    JsonNode parkData = jsonNode.get("data");

    List<Park> listParks = new ArrayList();
    for(JsonNode eachPark : parkData) {
       Park park = new Park();
       park.setDescription(eachPark.get("description").asText());
       park.setName(eachPark.get("name").asText());
       park.setLocation("ma");
       listParks.add(park);
    }
    if(parkRepo.count() == 0) {
      for (Park park : listParks) {
        parkRepo.save(park);
      }
    }
  }
}
