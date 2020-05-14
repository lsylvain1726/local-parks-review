package com.launchacademy.localparksreview.controllers.api.v1;

import com.launchacademy.localparksreview.models.Visitor;
import com.launchacademy.localparksreview.repositories.VisitorRepository;
import com.launchacademy.localparksreview.security.SecurityService;
import com.launchacademy.localparksreview.security.VisitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/v1/visitors")
public class VisitorController {
    @Autowired
    private VisitorRepository visitorRepo;
    @Autowired
    private VisitorService visitorService;
    @Autowired
    private SecurityService securityService;

    @PostMapping("/signup")
    public Visitor newVisitor(@RequestBody Visitor visitor) {
        if (visitorRepo.findByEmail(visitor.getEmail()).isEmpty()) {
            visitorService.save(visitor);
            securityService.autoLogin(visitor.getEmail(), visitor.getPassword());
            visitor.setRoles(null);
        }
        return visitor;
    }

    @PostMapping("/login")
    public Visitor login(@RequestBody Visitor visitor) {
        Optional<Visitor> visitorDB = visitorRepo.findByEmail(visitor.getEmail());
        if (visitorDB.isPresent()) {
            securityService.autoLogin(visitorDB.get().getEmail(), visitorDB.get().getPassword());
            visitorDB.get().setRoles(null);
        }
        return visitorDB.orElse(new Visitor());
    }

    @PostMapping("/isLoggedIn")
    public String isLoggedIn() {
        return securityService.findLoggedInUsername();
    }
}