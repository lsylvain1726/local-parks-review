package com.launchacademy.localparksreview.repositories;

import com.launchacademy.localparksreview.models.State;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StateRepository extends PagingAndSortingRepository<State,Integer> {

  State findByName(String state);
}
