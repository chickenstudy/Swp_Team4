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

import com.namnguyenmoihoc.realworldapp.entity.Cinema;
import com.namnguyenmoihoc.realworldapp.entity.Movie;
import com.namnguyenmoihoc.realworldapp.entity.Showtime;

import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTO;
import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTOCreate;
import com.namnguyenmoihoc.realworldapp.repository.CinemaRepository;
import com.namnguyenmoihoc.realworldapp.repository.MovieRepository;
import com.namnguyenmoihoc.realworldapp.repository.ShowtimeRepository;
import com.namnguyenmoihoc.realworldapp.service.ShowtimeService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ShowtimeServiceImpl implements ShowtimeService {

    private final MovieRepository movieRepository;
    private final CinemaRepository cinemaRepository;

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
    public List<String> getStartDates(Integer movieid) {
    
        List<LocalDate> startDates = showtimeRepository.getStartDateMovie(movieid);
        return startDates.stream()
                .map(localDate -> localDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")))
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

    @Override
    public Map<String, ShowtimeDTOCreate> createShowtime(Map<String, ShowtimeDTOCreate> showtimeDTO) {
        Map<String, ShowtimeDTOCreate> response = new HashMap<>();

        try {

            for (Map.Entry<String, ShowtimeDTOCreate> entry : showtimeDTO.entrySet()) {
                ShowtimeDTOCreate dto = entry.getValue();
                Integer movieId = dto.getMovieid();
                Integer cinemaId = dto.getCinemaid();

                // Kiểm tra sự tồn tại của movieid và cinemaid trong bảng Movie và Cinema
                Optional<Movie> movieOptional = movieRepository.findById(movieId);
                Optional<Cinema> cinemaOptional = cinemaRepository.findById(cinemaId);

                if (movieOptional.isPresent() && cinemaOptional.isPresent()) {

                    Movie movie = movieOptional.get();
                    Cinema cinema = cinemaOptional.get();

                    Showtime showtime = new Showtime();
                    showtime.setMovie(movie);
                    showtime.setCinema(cinema);

                    showtime.setStartdate(LocalDate.parse(dto.getStartdate()));
                    showtime.setStarttime(LocalTime.parse(dto.getStarttime()));
                    showtimeRepository.save(showtime);

                    response.put(entry.getKey(), dto);
                } else {

                    response.put(entry.getKey(), null);
                }
            }
        } catch (Exception e) {

            e.printStackTrace();
        }

        return response;
    }

    

}
