package com.namnguyenmoihoc.realworldapp.service.impl;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.namnguyenmoihoc.realworldapp.entity.Cinema;

import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;

import com.namnguyenmoihoc.realworldapp.model.cinema.CinemaDTO;
import com.namnguyenmoihoc.realworldapp.model.cinema.CinemaDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.cinema.CinemaDTOResponseNoId;
import com.namnguyenmoihoc.realworldapp.model.user.CustomError;

import com.namnguyenmoihoc.realworldapp.model.user.mapper.CinemaMapper;

import com.namnguyenmoihoc.realworldapp.repository.CinemaRepository;
import com.namnguyenmoihoc.realworldapp.service.CinemaService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CinemaServiceImpl implements CinemaService {

    private final CinemaRepository cinemaRepository;

    @Override
    public Map<String, CinemaDTOResponseNoId> createCinema(Map<String, CinemaDTO> cinemaCreate){
        CinemaDTO cinemaDTOcreate = cinemaCreate.get("cinema");
        Cinema cinema = CinemaMapper.toCinema(cinemaDTOcreate);
        cinema = cinemaRepository.save(cinema);

        Map<String, CinemaDTOResponseNoId> wrapper = new HashMap<>();

        CinemaDTOResponseNoId cinemaDTOResponse = CinemaMapper.toCinemaDTOReponseNoId(cinema);
        wrapper.put("cinema", cinemaDTOResponse);

        return wrapper;
    
            
    }
   
    

    @Override
    public List<CinemaDTOResponse> getListCinemas() {
        List<Cinema> listCinemas = cinemaRepository.findAll();

        List<CinemaDTOResponse> cinemaDTOResponses = new ArrayList<>();

        for (Cinema cinema : listCinemas) {
            cinemaDTOResponses.add(CinemaMapper.toCinemaDTOReponse(cinema));
        }
        return cinemaDTOResponses;

    }

    

    @Override
    public Map<String, CinemaDTOResponseNoId> getUpdateCinema(CinemaDTO cinemaDTO) throws CustomNotFoundException {
        Optional<Cinema> cinemaOptional = cinemaRepository.findById(cinemaDTO.getCinemaid());

        if (cinemaOptional.isEmpty()) {
            throw new CustomNotFoundException(CustomError.builder().code("404").message("Cinema not found").build());
        }

        Cinema cinema = cinemaOptional.get();

        CinemaMapper.updateCinemaDetails(cinema, cinemaDTO);

        cinema = cinemaRepository.save(cinema);
        return CinemaMapper.toCinemaDTOReponseUpdate(cinema);

    }

    @Override
    public void getDeleteCinema(int cinemaId) throws CustomNotFoundException {
        Optional<Cinema> cinemaOptional = cinemaRepository.findById(cinemaId);

        if (cinemaOptional.isEmpty()) {
            throw new CustomNotFoundException(CustomError.builder().code("404").message("Cinema not found").build());
        }

        cinemaRepository.deleteById(cinemaId);
    }

}
