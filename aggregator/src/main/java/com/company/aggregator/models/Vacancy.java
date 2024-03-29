package com.company.aggregator.models;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "vacancies")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = "user")
@Builder
public class Vacancy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String date;
    private String salary;
    private String company;
    @Column(columnDefinition = "text")
    private String requirements;
    @Column(columnDefinition = "text")
    private String description;
    @Column(columnDefinition = "text")
    private String schedule;
    @Column(columnDefinition = "text")
    private String source;
    @Column(columnDefinition = "text")
    private String logo;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
}
