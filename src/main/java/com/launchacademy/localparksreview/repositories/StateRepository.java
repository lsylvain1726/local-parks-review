package com.launchacademy.localparksreview.repositories;

import com.launchacademy.localparksreview.models.State;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface StateRepository extends PagingAndSortingRepository<State,Integer> {

  State findByName(String state);
}
