package com.launchacademy.localparksreview.models;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.Set;

@Component
@Getter
@Setter
@Entity
@Table(name = "roles")
public class Role {
    @Id
    @SequenceGenerator(name = "role_generator", sequenceName = "roles_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "role_generator")
    @Column(name = "id", nullable = false, unique = true)
    private Integer id;

    @Column
    private String name;

    @ManyToMany(mappedBy = "roles")
    Set<Visitor> visitors;
}
