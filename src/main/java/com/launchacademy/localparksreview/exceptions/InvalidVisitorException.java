package com.launchacademy.localparksreview.exceptions;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
@NoArgsConstructor
public class InvalidVisitorException extends RuntimeException {
}
@ControllerAdvice
class InvalidVisitorAdvice {
  @ResponseBody
  @ExceptionHandler(InvalidVisitorException.class)
  @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
  String invalidVisitor(InvalidVisitorException iv) {
    return "";
  }
}