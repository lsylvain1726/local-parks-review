package com.launchacademy.localparksreview.models;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
@Entity
@Table(name = "states")
public class State {
  @Id
  @SequenceGenerator(name = "states_generator", sequenceName = "states_id_seq", allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "states_generator")
  @Column(name = "id", nullable = false, unique = true)
  private Integer id;

  @Column
  private String name;

}
