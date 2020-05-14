package com.launchacademy.localparksreview.repositories;

import com.launchacademy.localparksreview.models.Review;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ReviewRepository extends PagingAndSortingRepository<Review, Integer> {

}
