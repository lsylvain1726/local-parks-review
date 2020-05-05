package com.launchacademy.localparksreview.seeders;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.launchacademy.localparksreview.models.Park;
import com.launchacademy.localparksreview.models.Visitor;
import com.launchacademy.localparksreview.repositories.ParkRepository;
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
  private final String API_KEY = "8cmiKECeVvQUZMKxdUPBtk2AggXY465FaxZIm2Ed";

  @Autowired
  public void setParkRepository(ParkRepository parkRepo) {
    this.parkRepo = parkRepo;
  }

  public String getParks(String uri) {
    RestTemplate restTemplate = new RestTemplate();
    String result = restTemplate.getForObject(uri, String.class);
    return result;
  }

  @Override
  public void run(String... args) throws Exception {

    if(parkRepo.count() == 0) {
      ObjectMapper mapper = new ObjectMapper();

      JsonNode jsonMaNode = mapper.readTree(getParks("https://developer.nps.gov/api/v1/parks?stateCode=ma&api_key=" + API_KEY));
      JsonNode parkMaData = jsonMaNode.get("data");

      JsonNode jsonNhNode = mapper.readTree(getParks("https://developer.nps.gov/api/v1/parks?stateCode=nh&api_key=" + API_KEY));
      JsonNode parkNhData = jsonNhNode.get("data");

      JsonNode jsonVtNode = mapper.readTree(getParks("https://developer.nps.gov/api/v1/parks?stateCode=vt&api_key=" + API_KEY));
      JsonNode parkVtData = jsonVtNode.get("data");

      List<Park> listParks = new ArrayList();
      Set<Visitor> visitors = new HashSet<>();

      Visitor visitor = new Visitor();
      visitor.setFirstName("Lauren");
      visitor.setLastName("Sylvain");
      visitors.add(visitor);

      Visitor visitorTwo = new Visitor();
      visitorTwo.setFirstName("Juvenal");
      visitorTwo.setLastName("Miranda");
      visitors.add(visitorTwo);

      for(JsonNode eachPark : parkMaData) {
        Park parkMa = new Park();
        parkMa.setDescription(eachPark.get("description").asText());
        parkMa.setName(eachPark.get("fullName").asText());
        parkMa.setLocation("Massachusetts");
        parkMa.setVisitors(visitors);
        listParks.add(parkMa);
      }

      for(JsonNode eachPark : parkNhData) {
        Park parkNh = new Park();
        parkNh.setDescription(eachPark.get("description").asText());
        parkNh.setName(eachPark.get("fullName").asText());
        parkNh.setLocation("New Hampshire");
        parkNh.setVisitors(visitors);
        listParks.add(parkNh);
      }

      for(JsonNode eachPark : parkVtData) {
        Park parkVt = new Park();
        parkVt.setDescription(eachPark.get("description").asText());
        parkVt.setName(eachPark.get("fullName").asText());
        parkVt.setLocation("Vermont");
        parkVt.setVisitors(visitors);
        listParks.add(parkVt);
      }

      for (Park park : listParks) {
        parkRepo.save(park);
      }
    }
  }
}
