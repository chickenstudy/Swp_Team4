package com.namnguyenmoihoc.realworldapp.controller;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;
import com.namnguyenmoihoc.realworldapp.model.cinema.CinemaDTO;
import com.namnguyenmoihoc.realworldapp.model.cinema.CinemaDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.cinema.CinemaDTOResponseNoId;
import com.namnguyenmoihoc.realworldapp.service.CinemaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/cinema")
@CrossOrigin
@RequiredArgsConstructor
public class CinemaController {
    private final CinemaService cinemaService;

    @PostMapping("/create")
    public Map<String, CinemaDTOResponseNoId> createCinema(
            @RequestBody Map<String, CinemaDTO> cinemaCreate) throws UnsupportedEncodingException {
        System.out.println(cinemaCreate);
        return cinemaService.createCinema(cinemaCreate);
    }

    @GetMapping("/listCinema")
    public List<CinemaDTOResponse> getListCinemas() {
        return cinemaService.getListCinemas();
    }

    @PutMapping("/updateCinema/{cinemaid}")
    public Map<String, CinemaDTOResponseNoId> getUpdateCinema(@PathVariable(value = "cinemaid") int cinemaId,
            @RequestBody CinemaDTO cinemaDTO)
            throws CustomNotFoundException {
        cinemaDTO.setCinemaid(cinemaId);

        return cinemaService.getUpdateCinema(cinemaDTO);
    }

    @DeleteMapping("/deleteCinema/{cinemaid}")
    public void getCinema(@PathVariable(value = "cinemaid") int cinemaId)
    throws CustomNotFoundException {

    cinemaService.getDeleteCinema(cinemaId);

    }

}
