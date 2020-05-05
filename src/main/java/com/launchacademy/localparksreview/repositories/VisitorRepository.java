package com.launchacademy.localparksreview.repositories;

import com.launchacademy.localparksreview.models.Visitor;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface VisitorRepository extends PagingAndSortingRepository<Visitor, Integer> {

}
