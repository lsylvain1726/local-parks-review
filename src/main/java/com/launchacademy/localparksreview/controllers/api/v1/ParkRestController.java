package com.launchacademy.localparksreview.controllers.api.v1;

import com.launchacademy.localparksreview.exceptions.UrlNotFoundException;
import com.launchacademy.localparksreview.models.Park;
import com.launchacademy.localparksreview.models.Visitor;
import com.launchacademy.localparksreview.repositories.ParkRepository;
import com.launchacademy.localparksreview.repositories.VisitorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/parks")
public class ParkRestController {
    private ParkRepository parkRepo;
    private VisitorRepository visitorRepo;


    @Autowired
    public void setParkRepo(ParkRepository parkRepo) {
        this.parkRepo = parkRepo;
    }


    @GetMapping
    public Iterable<Park> getAll() {
        return parkRepo.findAll();
    }

    @GetMapping("{state}/{id}")
    public Park getParkByState(@PathVariable String state, @PathVariable Integer id) {
        Park park = parkRepo.findById(id).orElseThrow(() -> new UrlNotFoundException());
        if (!park.getState().getName().equals(state)) {
            throw new UrlNotFoundException();
        }
        return park;
    }

    private class InvalidVisitorException extends RuntimeException{};

    @ControllerAdvice
    private class InvalidVisitorAdvice {
        @ResponseBody
        @ExceptionHandler(InvalidVisitorException.class)
        @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
        String invalidVisitor(InvalidVisitorException ic) {
            return "";
        }
    }

    @PostMapping
    public Visitor newVisitor(@RequestBody Visitor visitor, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            throw new InvalidVisitorException();
        } else {
            return visitorRepo.save(visitor);
        }
    }
}