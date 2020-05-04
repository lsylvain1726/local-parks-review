package com.launchacademy.localparksreview.models;

import lombok.Data;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Component
@Data
@Entity
@Table(name = "park")
public class Park {
    @Id
    @SequenceGenerator(name = "park_generator", sequenceName = "park_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "park_generator")
    @Column(name = "id", nullable = false, unique = true)
    private Integer id;

    @Column
    private String name;

    @Column
    private String description;

    @Column
    private String location;

    @ManyToMany(mappedBy = "parkReviews")
    Set<Visitor> parkVisitors = new HashSet<>();
}