package com.launchacademy.localparksreview.seeders;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.launchacademy.localparksreview.models.Park;
import com.launchacademy.localparksreview.models.Review;
import com.launchacademy.localparksreview.models.State;
import com.launchacademy.localparksreview.models.Visitor;
import com.launchacademy.localparksreview.repositories.ParkRepository;
import com.launchacademy.localparksreview.repositories.StateRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.*;

public class UpdateSeeder {
    private final String API_KEY = "8cmiKECeVvQUZMKxdUPBtk2AggXY465FaxZIm2Ed";
    private final StateRepository stateRepo;
    private final ParkRepository parkRepo;


    @Autowired
    public UpdateSeeder(StateRepository stateRepo, ParkRepository parkRepo) {
        this.stateRepo = stateRepo;
        this.parkRepo = parkRepo;
    }

    public void run() throws IOException {
        seedParks("ma");
        seedParks("vt");
        seedParks("nh");
    }

    private void seedParks(String stateCode) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(getParks("https://developer.nps.gov/api/v1/parks?stateCode=" + stateCode + "&api_key=" + API_KEY));
        JsonNode parkData = jsonNode.get("data");


        List<Park> listParks = new ArrayList<Park>();
        Set<Visitor> visitors = new HashSet<Visitor>();
        List<Review> reviews = new ArrayList<Review>();
        State state = new State();

        if (stateCode.equals("ma")) {
            state = seedStates("Massachusetts", "https://local-parks.s3.us-east-2.amazonaws.com/massachusetts-1813239.jpg");
        } else if (stateCode.equals("vt")) {
            state = seedStates("Vermont", "https://local-parks.s3.us-east-2.amazonaws.com/vermont-1934567.jpg");
        } else if (stateCode.equals("nh")) {
            state = seedStates("New Hampshire", "https://local-parks.s3.us-east-2.amazonaws.com/nh-4019975.jpg");
        }

        for (JsonNode eachPark : parkData) {
            Park park = new Park();

            JsonNode operatingHours = eachPark.get("operatingHours");
            for (JsonNode hours : operatingHours) {
                JsonNode exceptions = hours.get("exceptions");
                park.setHoursDescription(hours.get("description").asText());
                for (JsonNode exception : exceptions) {
                    park.setExceptionName(exception.get("name").asText());
                    park.setExceptionStartDate(exception.get("startDate").asText());
                    park.setExceptionEndDate(exception.get("endDate").asText());
                }
            }

            JsonNode images = eachPark.get("images");
            int i = 0;
            for (JsonNode image : images) {
                if (i == 0) {
                    park.setImage(image.get("url").asText());
                }
                i++;
            }

            park.setDirectionsUrl(eachPark.get("directionsUrl").asText());
            park.setDescription(eachPark.get("description").asText());
            park.setName(eachPark.get("fullName").asText());
            park.setState(state);
            park.setVisitors(visitors);
            park.setReviews(reviews);
            listParks.add(park);
        }

        for (Park park : listParks) {
            if (!park.getName().equals("?????????") && !park.getName().isEmpty()) {
                Park parkToUpdate = parkRepo.findByName(park.getName()).orElse(park);
                BeanUtils.copyProperties(park, parkToUpdate);
                parkRepo.save(parkToUpdate);
            }

        }
    }

    private State seedStates(String stateName, String imagePath) {
        State state = stateRepo.findByName(stateName);
        state.setImagePath(imagePath);
        stateRepo.save(state);
        return state;
    }

    private String getParks(String uri) {
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(uri, String.class);
        return result;
    }
}
