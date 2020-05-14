package com.launchacademy.localparksreview.controllers.api.v1;

import com.launchacademy.localparksreview.models.Review;
import com.launchacademy.localparksreview.repositories.ReviewRepository;
import java.util.Optional;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
  public void setReviewRepo(ReviewRepository reviewRepo) {
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

  @GetMapping
  public Iterable<Review> getReviews(){
    return reviewRepo.findAll();
  }

  @PostMapping
  public Review newReview(@RequestBody @Valid Review review, BindingResult bindingResult) {
    if(bindingResult.hasErrors()) {
      throw new InvalidReviewException();
    } else {
      return reviewRepo.save(review);
    }
  }

  @GetMapping (path="{id}")
  public Optional<Review> singleReview(@PathVariable Integer id){
    System.out.println(id);
    Optional<Review> review = reviewRepo.findById(id);
    System.out.println(review);
    return review;
  }

  @PutMapping ("{id}")
  public Review updateReview(@RequestBody Review newReview, @PathVariable Integer id){
    System.out.println(newReview);
    return reviewRepo.findById(id)
        .map(Review -> {
          Review.setComment(newReview.getComment());
          Review.setRating(newReview.getRating());
//          Review.setPark(newReview.getPark());
          Review.setId(id);
          return reviewRepo.save(Review);
        }).orElseThrow(() -> new InvalidReviewException());
  }

  @DeleteMapping ("/{id}")
  public Iterable<Review> deleteReview(@PathVariable Integer id){
    reviewRepo.deleteById(id);
    return reviewRepo.findAll();
  }
}
