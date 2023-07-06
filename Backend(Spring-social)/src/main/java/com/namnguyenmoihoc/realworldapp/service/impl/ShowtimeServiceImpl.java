package com.namnguyenmoihoc.realworldapp.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;


import com.namnguyenmoihoc.realworldapp.entity.Showtime;
import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;
import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTOCreate;
import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTOResponseNoID;
import com.namnguyenmoihoc.realworldapp.model.user.CustomError;

import com.namnguyenmoihoc.realworldapp.model.user.mapper.ShowtimeMapper;
import com.namnguyenmoihoc.realworldapp.repository.ShowtimeRepository;
import com.namnguyenmoihoc.realworldapp.service.ShowtimeService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ShowtimeServiceImpl implements ShowtimeService {
    private final ShowtimeRepository showtimeRepository;

    @Override
    public Map<String, ShowtimeDTOResponseNoID> createShowtime(Map<String, ShowtimeDTOCreate> showtimeDTOCreate) {
        ShowtimeDTOCreate showDTOcreateMap = showtimeDTOCreate.get("showtime");
        Showtime showtime = ShowtimeMapper.toShowtime(showDTOcreateMap);
        showtime = showtimeRepository.save(showtime);

        Map<String, ShowtimeDTOResponseNoID> wrapper = new HashMap<>();
        ShowtimeDTOResponseNoID showtimeDTOResponse = ShowtimeMapper.toMovieDTOReponseNoID(showtime);
        wrapper.put("showtime", showtimeDTOResponse);
        return wrapper;
    }

    @Override
    public List<ShowtimeDTOResponse> getListShowtime() {
        List<Showtime> listShowtimes = showtimeRepository.findAll();

        List<ShowtimeDTOResponse> showtimeDTOResponses = new ArrayList<>();

        for (Showtime showtime : listShowtimes) {
            showtimeDTOResponses.add(ShowtimeMapper.toMovieDTOReponse(showtime));
        }
        return showtimeDTOResponses;

    }

    @Override
    public Map<String, ShowtimeDTOResponseNoID> getUpdateShowtime(ShowtimeDTOCreate showtimeDTOCreate)
            throws CustomNotFoundException {
        Optional<Showtime> showtimeOptional = showtimeRepository.findById(showtimeDTOCreate.getShowtimeid());

        if (showtimeOptional.isEmpty()) {
            throw new CustomNotFoundException(CustomError.builder().code("404").message("Showtime not found").build());
        }

        Showtime showtime  =showtimeOptional.get();

        ShowtimeMapper.updateShowtimeDetails(showtime, showtimeDTOCreate);

        showtime = showtimeRepository.save(showtime);
        return ShowtimeMapper.toMovieDTOReponseUpdate(showtime);
    }

    @Override
    public void getDeleteShowtime(int showtimeId) throws CustomNotFoundException {
         Optional<Showtime> showtimeOptional = showtimeRepository.findById(showtimeId);

        if (showtimeOptional.isEmpty()) {
            throw new CustomNotFoundException(CustomError.builder().code("404").message("Showtime not found").build());
        }

       showtimeRepository.deleteById(showtimeId);
      
    }

}
