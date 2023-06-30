package com.namnguyenmoihoc.realworldapp.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.namnguyenmoihoc.realworldapp.entity.Showtime;
import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTOCreate;

import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTOResponseNoID;
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

}
