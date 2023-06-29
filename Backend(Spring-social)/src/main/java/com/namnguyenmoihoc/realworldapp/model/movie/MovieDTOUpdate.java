package com.namnguyenmoihoc.realworldapp.model.movie;



import java.util.Date;

import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
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
public class MovieDTOUpdate {
    private int movieid;
    private String poster;
    private String banner;
    private String trailer;
    @Temporal(TemporalType.DATE)
    private Date show_date;
    private String country;
    private String name;
    private String description;
    private String type;
    private String times;
}
