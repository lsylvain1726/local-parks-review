package com.launchacademy.localparksreview.repositories;

import com.launchacademy.localparksreview.models.Park;
import java.util.List;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ParkRepository extends PagingAndSortingRepository<Park, Integer> {

  List<Park> findByState(String state);
}
