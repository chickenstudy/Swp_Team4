package com.namnguyenmoihoc.realworldapp.model.user.mapper;

import java.util.HashMap;
import java.util.Map;

import com.namnguyenmoihoc.realworldapp.entity.Cinema;

import com.namnguyenmoihoc.realworldapp.model.cinema.CinemaDTO;
import com.namnguyenmoihoc.realworldapp.model.cinema.CinemaDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.cinema.CinemaDTOResponseNoId;

public class CinemaMapper {

    public static Cinema toCinema(CinemaDTO cinemaDTOcreate) {
     
            Cinema cinema = Cinema.builder()
                    .cinemaid(cinemaDTOcreate.getCinemaid())
                    .location(cinemaDTOcreate.getLocation())
                    .name(cinemaDTOcreate.getName())
                    .build();
            return cinema;
        

    }

    public static CinemaDTOResponse toCinemaDTOReponse(Cinema cinema) {
        return CinemaDTOResponse.builder()
                .cinemaid(cinema.getCinemaid())
                .name(cinema.getName())
                .location(cinema.getLocation())
                .build();

    }

    public static Map<String, CinemaDTOResponseNoId> toCinemaDTOReponseUpdate(Cinema cinema) {
        Map<String, CinemaDTOResponseNoId> wrapper = new HashMap<>();
        CinemaDTOResponseNoId cinemaDTOResponse = CinemaDTOResponseNoId.builder()

                .name(cinema.getName())
                .location(cinema.getLocation())
                .build();

        wrapper.put("update:", cinemaDTOResponse);
        return wrapper;

    }

    public static void updateCinemaDetails(Cinema cinema, CinemaDTO cinemaDTO) {
      

            cinema.setLocation(cinemaDTO.getLocation());
            cinema.setName(cinemaDTO.getName());
       

    }

    public static CinemaDTOResponseNoId toCinemaDTOReponseNoId(Cinema cinema) {
        return CinemaDTOResponseNoId.builder()
        .name(cinema.getName())
        .location(cinema.getLocation())
        .build();

    }

    

}
