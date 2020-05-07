package com.launchacademy.localparksreview.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
@Entity
@Table(name = "review")
public class Review {
  @Id
  @SequenceGenerator(name = "review_generator", sequenceName = "review_id_seq", allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "review_generator")
  @Column(name = "id", nullable = false, unique = true)    Integer id;

  @ManyToOne
  @JoinColumn(name = "park_id")
  Park park;

  @ManyToOne
  @JoinColumn(name = "visitor_id", nullable = true)
  Visitor visitor;

  @NotBlank
  private String comment;

  @NotNull
  private Integer rating;
}
