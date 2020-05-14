package com.launchacademy.localparksreview.repositories;

import com.launchacademy.localparksreview.models.Visitor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VisitorRepository extends CrudRepository<Visitor, Integer> {

 Optional<Visitor> findByEmail(String email);
}
