package com.namnguyenmoihoc.realworldapp.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
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
    private int movieid;

    private String author;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    @Lob
    private byte[] poster;
    @Column(nullable = false)
    private String description;
    private String type;
    @Temporal(TemporalType.DATE)

    @Column(name = "show_date")
    private Date show_date;
    @Column(nullable = false)
    @Lob
    private byte[] banner;
    @Column(nullable = false)
    private String trailer;
    private String country;
    private String times;

}