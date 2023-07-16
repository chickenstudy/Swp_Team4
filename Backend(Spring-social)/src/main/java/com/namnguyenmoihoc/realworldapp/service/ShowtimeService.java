package com.namnguyenmoihoc.realworldapp.service;

import java.io.UnsupportedEncodingException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

import com.namnguyenmoihoc.realworldapp.entity.Showtime;
import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;
import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTO;
import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTOCreate;
import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTOResponseNoID;

public interface ShowtimeService {

    

    List<String> getStartTimes(Integer movieid, Integer cinemaid, LocalDate startdate);

    

   
    
        List<ShowtimeDTO> getSchedules(Integer movieid, Integer cinemaid, String startdate, String starttime);
  
    
    
    
}
