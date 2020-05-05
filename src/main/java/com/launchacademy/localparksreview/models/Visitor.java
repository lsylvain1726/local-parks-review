package com.launchacademy.localparksreview.models;

import lombok.Data;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Component
@Data
@Entity
@Table(name = "visitor")
public class Visitor {
    @Id
    @SequenceGenerator(name = "visitor_generator", sequenceName = "visitor_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "visitor_generator")
    @Column(name = "id", nullable = false, unique = true)
    private Integer id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @ManyToMany
    @JoinTable(name = "review", joinColumns = @JoinColumn(name = "visitor_id"), inverseJoinColumns = @JoinColumn(name = "park_id"))
    Set<Park> parkReviews = new HashSet<>();
}
