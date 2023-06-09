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
public class MovieDTOResponseCreate {
   
    private  String poster;
    private String banner;
    private String trailer;
    private Date show_date;
    private String country;
    private String name;
    private String description;
    private String type;
    private String times;
    
}

