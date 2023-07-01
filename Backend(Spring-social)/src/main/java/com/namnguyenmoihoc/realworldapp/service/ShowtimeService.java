package com.namnguyenmoihoc.realworldapp.service;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;

import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;
import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTOCreate;
import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTOResponseNoID;

public interface ShowtimeService {

    Map<String, ShowtimeDTOResponseNoID> createShowtime(Map<String, ShowtimeDTOCreate> showtimeDTOCreate) throws UnsupportedEncodingException;

    List<ShowtimeDTOResponse> getListShowtime();

    Map<String, ShowtimeDTOResponseNoID> getUpdateShowtime(ShowtimeDTOCreate showtimeDTOCreate)   throws CustomNotFoundException;

    void getDeleteShowtime(int showtimeId)  throws CustomNotFoundException;

   
    
    
    
}
