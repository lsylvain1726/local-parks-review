package com.launchacademy.localparksreview.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Data;
import lombok.ToString;
import org.hibernate.validator.constraints.Range;
import org.springframework.stereotype.Component;

@Component
@Data
@Entity
@Table(name = "review")
public class Review {
  @Id
  @SequenceGenerator(name = "review_generator", sequenceName = "review_id_seq", allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "review_generator")
  @Column(name = "id", nullable = false, unique = true)
  private Integer id;

  @ManyToOne
  @JoinColumn(name = "park_id")
  @JsonIgnoreProperties("reviews")
  private Park park;

  @ManyToOne(optional = true, fetch = FetchType.LAZY)
  @JoinColumn(name = "visitor_id", nullable = true)
  private Visitor visitor;

  @NotBlank
  private String comment;

  @NotNull
  @Range(min = 1, max = 5)
  private Integer rating;
}
