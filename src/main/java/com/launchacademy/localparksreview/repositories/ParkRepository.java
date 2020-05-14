package com.launchacademy.localparksreview.repositories;

import com.launchacademy.localparksreview.models.Park;
import com.launchacademy.localparksreview.models.State;
import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParkRepository extends PagingAndSortingRepository<Park, Integer> {

  List<Park> findAllByState(State state);
  Optional<Park> findByName(String name);
}
