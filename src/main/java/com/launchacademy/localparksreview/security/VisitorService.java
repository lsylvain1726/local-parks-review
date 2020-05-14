package com.launchacademy.localparksreview.security;

import java.util.HashSet;
import java.util.Set;

import com.launchacademy.localparksreview.models.Role;
import com.launchacademy.localparksreview.models.Visitor;
import com.launchacademy.localparksreview.repositories.RoleRepository;
import com.launchacademy.localparksreview.repositories.VisitorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class VisitorService {
    @Autowired
    private VisitorRepository visitorRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public void save(Visitor visitor) {
        visitor.setPassword(bCryptPasswordEncoder.encode(visitor.getPassword()));
        Set roles = new HashSet<Role>();
        roles.add(roleRepository.findByName("user"));
        visitor.setRoles(roles);
        visitorRepository.save(visitor);
    }

    public Visitor findByEmail(String email) {
        return visitorRepository.findByEmail(email).orElseThrow();
    }
}