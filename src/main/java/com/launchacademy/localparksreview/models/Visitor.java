package com.launchacademy.localparksreview.models;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Component
@Getter
@Setter
@Entity
@Table(name = "visitor")
public class Visitor {
    @Id
    @SequenceGenerator(name = "visitor_generator", sequenceName = "visitor_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "visitor_generator")
    @Column(name = "id", nullable = false, unique = true)
    private Integer id;

    @NotBlank
    @Column(name = "first_name")
    private String firstName;

    @NotBlank
    @Column(name = "last_name")
    private String lastName;

    @Email
    @Column(name = "email")
    private String email;

    @NotBlank
    @Column(name = "password")
    private String password;

    @ManyToMany
    @JoinTable(name = "review",
            joinColumns = @JoinColumn(name = "visitor_id"),
            inverseJoinColumns = @JoinColumn(name = "park_id"))
    Set<Park> parkReviews = new HashSet<>();

    @ManyToMany
    @JoinTable(name="visitor_roles",
            joinColumns= @JoinColumn(name="visitor_id"),
            inverseJoinColumns= @JoinColumn(name="role_id")
    )
    Set<Role> roles;

}
