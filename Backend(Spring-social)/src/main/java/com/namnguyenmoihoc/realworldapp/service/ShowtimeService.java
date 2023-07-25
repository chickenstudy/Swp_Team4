package com.namnguyenmoihoc.realworldapp.service;

import java.time.LocalDate;

import java.util.List;
import java.util.Map;

import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTO;
import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTOCreate;

public interface ShowtimeService {

    List<String> getStartTimes(Integer movieid, Integer cinemaid, LocalDate startdate);

    List<ShowtimeDTO> getSchedules(Integer movieid, Integer cinemaid, String startdate, String starttime);
    Map<String, ShowtimeDTOCreate> createShowtime(Map<String, ShowtimeDTOCreate> showtimeDTO);

    List<String> getStartDates(Integer movieid, Integer cinemaid);

}
