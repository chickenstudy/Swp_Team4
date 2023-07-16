package com.namnguyenmoihoc.realworldapp.model.movie;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MovieDTO {
    private int id;

    private String author;
    private String name;

    private byte[] poster;
    private String description;
    private String type;

    private Date show_date;

    private byte[] banner;
    private String trailer;
    private String country;
    private String times;

}
