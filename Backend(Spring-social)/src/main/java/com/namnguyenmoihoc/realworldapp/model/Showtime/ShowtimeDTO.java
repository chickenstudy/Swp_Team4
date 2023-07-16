package com.namnguyenmoihoc.realworldapp.model.Showtime;

import java.time.LocalDate;
import java.time.LocalTime;

import com.namnguyenmoihoc.realworldapp.entity.Cinema;
import com.namnguyenmoihoc.realworldapp.entity.Movie;
import com.namnguyenmoihoc.realworldapp.model.cinema.CinemaDTO;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTO;

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