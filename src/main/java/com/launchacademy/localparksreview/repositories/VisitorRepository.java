package com.launchacademy.localparksreview.repositories;

import com.launchacademy.localparksreview.models.Visitor;
import java.util.Optional;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface VisitorRepository extends PagingAndSortingRepository<Visitor, Integer> {

 Optional<Visitor> findByEmail(String email);
}


