package com.namnguyenmoihoc.realworldapp.service.impl;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.namnguyenmoihoc.realworldapp.entity.Showtime;
import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;
import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTO;
import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTOCreate;
import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTOResponseNoID;
import com.namnguyenmoihoc.realworldapp.model.user.CustomError;

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
        return showtimeRepository
                .getSchedulesByMovie(movieid, cinemaid,
                        parsedStartDate, parsedStartTime)
                .stream().map(showtime -> modelMapper.map(showtime, ShowtimeDTO.class))
                .collect(Collectors.toList());
    }

}
