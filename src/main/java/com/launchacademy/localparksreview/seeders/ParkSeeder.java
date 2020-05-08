package com.launchacademy.localparksreview.seeders;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.launchacademy.localparksreview.models.Park;
import com.launchacademy.localparksreview.models.State;
import com.launchacademy.localparksreview.models.Visitor;
import com.launchacademy.localparksreview.repositories.ParkRepository;
import com.launchacademy.localparksreview.repositories.StateRepository;
import com.launchacademy.localparksreview.repositories.VisitorRepository;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class ParkSeeder {
  private final ParkRepository parkRepo;
  private final StateRepository stateRepo;
  private final VisitorRepository visitorRepo;
  private final String API_KEY = "8cmiKECeVvQUZMKxdUPBtk2AggXY465FaxZIm2Ed";
  private List<Park> listParks;

  @Autowired
  public ParkSeeder(ParkRepository parkRepo, StateRepository stateRepo, VisitorRepository visitorRepo) {
    this.parkRepo = parkRepo;
    this.stateRepo = stateRepo;
    this.visitorRepo = visitorRepo;
  }

  public String getParks(String uri) {
    RestTemplate restTemplate = new RestTemplate();
    String result = restTemplate.getForObject(uri, String.class);
    return result;
  }

  public void run(String... args) throws Exception {

      ObjectMapper mapper = new ObjectMapper();

      JsonNode jsonMaNode = mapper.readTree(getParks("https://developer.nps.gov/api/v1/parks?stateCode=ma&api_key=" + API_KEY));
      JsonNode parkMaData = jsonMaNode.get("data");

      JsonNode jsonNhNode = mapper.readTree(getParks("https://developer.nps.gov/api/v1/parks?stateCode=nh&api_key=" + API_KEY));
      JsonNode parkNhData = jsonNhNode.get("data");

      JsonNode jsonVtNode = mapper.readTree(getParks("https://developer.nps.gov/api/v1/parks?stateCode=vt&api_key=" + API_KEY));
      JsonNode parkVtData = jsonVtNode.get("data");

      listParks = new ArrayList();
      Set<Visitor> visitors = new HashSet<>();
      List<State> states = new ArrayList<>();

      Visitor visitor = new Visitor();
      visitor.setFirstName("Lauren");
      visitor.setLastName("Sylvain");
      visitors.add(visitor);

      Visitor visitorTwo = new Visitor();
      visitorTwo.setFirstName("Juvenal");
      visitorTwo.setLastName("Miranda");
      visitors.add(visitorTwo);


      State state = new State();
      state.setName("Massachusetts");
      states.add(state);

      State stateTwo = new State();
      stateTwo.setName("Vermont");
      states.add(stateTwo);

      State stateThree = new State();
      stateThree.setName("New Hampshire");
      states.add(stateThree);

      if(stateRepo.count() == 0) {
        for(State eachState : states) {
          stateRepo.save(eachState);
        }
      }

      addOrUpdatePark(parkMaData, visitors, state);
      addOrUpdatePark(parkNhData, visitors, stateThree);
      addOrUpdatePark(parkVtData, visitors, stateTwo);

      for (Park park : listParks) {
        parkRepo.save(park);
      }
  }

  private void addOrUpdatePark(JsonNode data, Set<Visitor> visitors, State state) {
    for(JsonNode fetchedPark : data) {
      if (!fetchedPark.get("fullName").asText().equals("?????????") && !fetchedPark.get("fullName").asText().isEmpty()) {
        Park park = parkRepo.findByName(fetchedPark.get("fullName").asText()).orElse(new Park());
        park.setName(fetchedPark.get("fullName").asText());
        park.setDescription(fetchedPark.get("description").asText());
        park.setState(state);
        park.setVisitors(visitors);
        listParks.add(park);
      }
    }
  }
}
