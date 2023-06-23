package com.namnguyenmoihoc.realworldapp.entity;

import java.util.Date;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "movie")
public class Movie {
    @Id
    
    private int movie_id;

    private String author;
    private String name;

    @Lob
    private byte[] poster;
    private String description;
    private String type;
    private Date show_date;

    @Lob
    private byte[] banner;
    private String trailer;
    private String country;
    private String times;

}