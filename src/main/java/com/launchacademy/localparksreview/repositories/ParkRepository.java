package com.launchacademy.localparksreview.repositories;

import com.launchacademy.localparksreview.models.Park;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ParkRepository extends PagingAndSortingRepository<Park, Integer> {

}
