package com.namnguyenmoihoc.realworldapp.model.Showtime;

import com.namnguyenmoihoc.realworldapp.entity.Cinema;
import com.namnguyenmoihoc.realworldapp.entity.Movie;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter

@Builder
@AllArgsConstructor
@NoArgsConstructor

public class ShowtimeDTO {
    private Integer id;
    private Movie movie;
    private Cinema cinema;
    private String startdate;
    private String starttime;

}