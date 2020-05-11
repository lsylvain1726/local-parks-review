package com.launchacademy.localparksreview.seeders;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.launchacademy.localparksreview.models.Park;
import com.launchacademy.localparksreview.models.Review;
import com.launchacademy.localparksreview.models.State;
import com.launchacademy.localparksreview.models.Visitor;
import com.launchacademy.localparksreview.repositories.ParkRepository;
import com.launchacademy.localparksreview.repositories.StateRepository;
import com.launchacademy.localparksreview.repositories.VisitorRepository;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class ParkSeeder implements CommandLineRunner {
  private ParkRepository parkRepo;
  private StateRepository stateRepo;
  private VisitorRepository visitorRepo;
  private final String API_KEY = "8cmiKECeVvQUZMKxdUPBtk2AggXY465FaxZIm2Ed";
  private final String STATE_CODE = "ma";

  @Autowired
  public void setParkRepository(ParkRepository parkRepo, StateRepository stateRepo, VisitorRepository visitorRepo) {
    this.parkRepo = parkRepo;
    this.stateRepo = stateRepo;
    this.visitorRepo = visitorRepo;
  }

  public String getParks(String uri) {
    RestTemplate restTemplate = new RestTemplate();
    String result = restTemplate.getForObject(uri, String.class);
    return result;
  }
  public State seedStates(String state) {
    State newState = new State();
    newState.setName(state);
    stateRepo.save(newState);
    return newState;
  }

  public void seedParks(String stateCode) throws Exception {
    ObjectMapper mapper = new ObjectMapper();
    JsonNode jsonNode = mapper.readTree(getParks("https://developer.nps.gov/api/v1/parks?stateCode="+ stateCode + "&api_key=" + API_KEY));
    JsonNode parkData = jsonNode.get("data");
    

    List<Park> listParks = new ArrayList();
    Set<Visitor> visitors = new HashSet<>();
    List<Review> reviews = new ArrayList<>();
    State state = new State();

    if(stateCode.equals("ma")) {
      state = seedStates("Massachusetts");
    } else if (stateCode.equals("vt")) {
      state = seedStates("Vermont");
    } else if (stateCode.equals("nh")) {
      state = seedStates("New Hampshire");
    }

    for(JsonNode eachPark : parkData) {
      Park park = new Park();

      JsonNode operatingHours = eachPark.get("operatingHours");
      for(JsonNode hours : operatingHours) {
        JsonNode exceptions = hours.get("exceptions");
        for(JsonNode exception : exceptions) {
          park.setExceptionName(exception.get("name").asText());
        }
      }

      JsonNode images = eachPark.get("images");
      int i = 0;
      for(JsonNode image : images) {
        if(i == 0) {
          park.setImage(image.get("url").asText());
        }
        i++;
      }

      park.setDescription(eachPark.get("description").asText());
      park.setName(eachPark.get("fullName").asText());
      park.setState(state);
      park.setVisitors(visitors);
      park.setReviews(reviews);
      listParks.add(park);
    }

    for (Park park : listParks) {
      if (!park.getName().equals("?????????") && !park.getName().isEmpty()) {
        parkRepo.save(park);
      }
    }
  }

  @Override
  public void run(String... args) throws Exception {
    if(parkRepo.count() == 0) {
      seedParks("ma");
      seedParks("vt");
      seedParks("nh");
    }
  }
}

