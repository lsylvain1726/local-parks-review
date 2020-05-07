package com.launchacademy.localparksreview.controllers.api.v1;

import com.launchacademy.localparksreview.models.Review;
import com.launchacademy.localparksreview.repositories.ReviewRepository;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/review")
public class ReviewRestController {
  private ReviewRepository reviewRepo;

  @Autowired
  public void setAdoptionApplicationRepoRepo(ReviewRepository reviewRepo) {
    this.reviewRepo = reviewRepo;
  }

  private class InvalidReviewException extends RuntimeException {};
  @ControllerAdvice
  private class InvalidReviewAdvice {
    @ResponseBody
    @ExceptionHandler(InvalidReviewException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    String invalidReview(InvalidReviewException ic) {
      return "";
    }
  }

  @PostMapping
  public Review newPet(@RequestBody @Valid Review review, BindingResult bindingResult) {
    if(bindingResult.hasErrors()) {
      throw new InvalidReviewException();
    } else {
      return reviewRepo.save(review);
    }
  }
}
