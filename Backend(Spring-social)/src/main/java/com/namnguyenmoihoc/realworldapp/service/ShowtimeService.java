package com.namnguyenmoihoc.realworldapp.service;

import java.time.LocalDate;

import java.util.List;

import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTO;

public interface ShowtimeService {

    List<String> getStartTimes(Integer movieid, Integer cinemaid, LocalDate startdate);

    List<ShowtimeDTO> getSchedules(Integer movieid, Integer cinemaid, String startdate, String starttime);

}
