package com.launchacademy.localparksreview.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;
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

    @Column(name="exception_name")
    private String exceptionName;

    @Column
    private String image;

    @ManyToOne
    @JoinColumn(name="location_id", nullable = false)
    private State state;

    @ManyToMany(mappedBy = "parkReviews")
    Set<Visitor> visitors = new HashSet<>();

    @OneToMany(mappedBy = "park", fetch = FetchType.LAZY)
    @JsonIgnoreProperties("park")
    private List<Review> reviews;
}