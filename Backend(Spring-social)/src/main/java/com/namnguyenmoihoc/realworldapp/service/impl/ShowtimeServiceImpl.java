package com.namnguyenmoihoc.realworldapp.service.impl;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

import java.util.List;

import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.namnguyenmoihoc.realworldapp.entity.Showtime;

import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTO;


import com.namnguyenmoihoc.realworldapp.repository.ShowtimeRepository;
import com.namnguyenmoihoc.realworldapp.service.ShowtimeService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ShowtimeServiceImpl implements ShowtimeService {

    private final ShowtimeRepository showtimeRepository;
    @Autowired
    private final ModelMapper modelMapper;

    @Override
    public List<String> getStartTimes(Integer movieid, Integer cinemaid, LocalDate startdate) {
        List<LocalTime> startTimes = showtimeRepository.getStartTimeByMovie(movieid, cinemaid, startdate);
        return startTimes.stream().map(localTime -> localTime.format(DateTimeFormatter.ofPattern("HH:mm")))
                .collect(Collectors.toList());
    }

    @Override
    public List<ShowtimeDTO> getSchedules(Integer movieid, Integer cinemaid, String startdate, String starttime) {
        LocalDate parsedStartDate = LocalDate.parse(startdate);
        LocalTime parsedStartTime = LocalTime.parse(starttime);

        List<Showtime> showtimes = showtimeRepository.getSchedulesByMovie(movieid, cinemaid, parsedStartDate,
                parsedStartTime);

        List<ShowtimeDTO> showtimeDTOs = new ArrayList<>();
        for (Showtime showtime : showtimes) {
            ShowtimeDTO showtimeDTO = modelMapper.map(showtime, ShowtimeDTO.class);
            showtimeDTO.setId(showtime.getShowtimeid()); // Lấy ID của showtime và đặt nó vào showtimeDTO
            showtimeDTOs.add(showtimeDTO);
        }

        return showtimeDTOs;

    }
    
}
