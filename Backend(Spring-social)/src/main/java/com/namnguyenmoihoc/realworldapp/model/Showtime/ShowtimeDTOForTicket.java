package com.namnguyenmoihoc.realworldapp.model.Showtime;

import java.time.LocalDate;
import java.time.LocalTime;

import com.namnguyenmoihoc.realworldapp.model.cinema.CinemaDTO;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ShowtimeDTOForTicket {
    private int showtimeid;
    private LocalTime starttime;
    private LocalDate startdate;
    private MovieDTO movie;
    private CinemaDTO cinema;
}
