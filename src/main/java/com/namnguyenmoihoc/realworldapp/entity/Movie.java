package com.namnguyenmoihoc.realworldapp.entity;

import java.util.Date;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "movie")
public class Movie {
    @Id
    private int movie_id;

    private String author;
    private String name;
    private String poster;
    private String description;
    private String type;
    private Date show_date;

    private String banner;
    private String trailer;
    private String country;
    private String times;

}