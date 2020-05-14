package com.launchacademy.localparksreview.security;

import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;

import com.launchacademy.localparksreview.models.Role;
import com.launchacademy.localparksreview.models.Visitor;
import com.launchacademy.localparksreview.repositories.VisitorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class VisitorDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private VisitorRepository visitorRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) {
        Visitor visitor = visitorRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException(email));

        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        for (Role role : visitor.getRoles()) {
            grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_"  + role.getName().toUpperCase()));
        }

        return new org.springframework.security.core.userdetails.User(visitor.getEmail(),
                visitor.getPassword(), grantedAuthorities);
    }
}