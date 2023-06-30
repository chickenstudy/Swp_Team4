package com.namnguyenmoihoc.realworldapp.service;

import java.io.UnsupportedEncodingException;
import java.util.Map;

import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTOCreate;

import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTOResponseNoID;

public interface ShowtimeService {

    Map<String, ShowtimeDTOResponseNoID> createShowtime(Map<String, ShowtimeDTOCreate> showtimeDTOCreate) throws UnsupportedEncodingException;

   
    
    
    
}
