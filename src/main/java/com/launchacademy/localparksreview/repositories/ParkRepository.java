package com.launchacademy.localparksreview.repositories;

import com.launchacademy.localparksreview.models.Park;
import com.launchacademy.localparksreview.models.State;
import java.util.List;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ParkRepository extends PagingAndSortingRepository<Park, Integer> {

  List<Park> findAllByState(State state);
}
