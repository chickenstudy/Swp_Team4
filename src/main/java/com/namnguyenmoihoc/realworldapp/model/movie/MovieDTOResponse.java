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
public class MovieDTOResponse {
    private int id;
    private byte[] poster;
    private byte[] banner;
    private String trailer;
    private Date show_date;
    private String country;
    private String name;
    private String description;
    private String type;
    private String times;
}
