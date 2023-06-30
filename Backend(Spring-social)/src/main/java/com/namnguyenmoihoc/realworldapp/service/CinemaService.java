package com.namnguyenmoihoc.realworldapp.service;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;

import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;
import com.namnguyenmoihoc.realworldapp.model.cinema.CinemaDTO;
import com.namnguyenmoihoc.realworldapp.model.cinema.CinemaDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.cinema.CinemaDTOResponseNoId;

public interface CinemaService {

    Map<String, CinemaDTOResponseNoId> createCinema(Map<String, CinemaDTO> cinemaCreate)
            throws UnsupportedEncodingException;

    public List<CinemaDTOResponse> getListCinemas();

    public Map<String, CinemaDTOResponseNoId> getUpdateCinema(CinemaDTO cinemaDTO) throws CustomNotFoundException;

    public void getDeleteCinema(int cinemaId) throws CustomNotFoundException;

    Map<String, CinemaDTOResponse> getCinemaByID(int cinemaId) throws CustomNotFoundException;

}
