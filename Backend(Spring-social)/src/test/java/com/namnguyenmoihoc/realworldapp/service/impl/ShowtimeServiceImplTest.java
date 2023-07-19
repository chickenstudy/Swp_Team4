package com.namnguyenmoihoc.realworldapp.service.impl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import com.namnguyenmoihoc.realworldapp.entity.Cinema;
import com.namnguyenmoihoc.realworldapp.entity.Movie;
import com.namnguyenmoihoc.realworldapp.entity.Showtime;
import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTO;
import com.namnguyenmoihoc.realworldapp.repository.ShowtimeRepository;

import java.time.LocalDate;
import java.time.LocalTime;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class ShowtimeServiceImplTest {

    @Mock
    private ShowtimeRepository showtimeRepository;

      @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private ShowtimeServiceImpl showtimeService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetStartTimes() {
        Integer movieId = 1;
        Integer cinemaId = 2;
        LocalDate startDate = LocalDate.of(2023, 7, 19);

        // Mock the behavior of showtimeRepository.getStartTimeByMovie()
        List<LocalTime> mockStartTimes = Arrays.asList(
                LocalTime.of(10, 0),
                LocalTime.of(13, 30),
                LocalTime.of(17, 45)
        );
        when(showtimeRepository.getStartTimeByMovie(movieId, cinemaId, startDate))
                .thenReturn(mockStartTimes);

        // Call the method to be tested
        List<String> result = showtimeService.getStartTimes(movieId, cinemaId, startDate);

        // Expected start times after formatting
        List<String> expectedStartTimes = Arrays.asList("10:00", "13:30", "17:45");

        // Assert the result
        assertEquals(expectedStartTimes, result);
    }

    @Test
    void testGetSchedules() {
        Movie movie = new Movie();
        movie.setMovieid(1);

        Cinema cinema = new Cinema();
        cinema.setCinemaid(2);

        String startDateStr = "2023-07-19";
        String startTimeStr = "10:00";

        LocalDate parsedStartDate = LocalDate.parse(startDateStr);
        LocalTime parsedStartTime = LocalTime.parse(startTimeStr);

        // Mock the behavior of showtimeRepository.getSchedulesByMovie()
        List<Showtime> mockShowtimes = Arrays.asList(
                new Showtime(1, parsedStartTime,  parsedStartDate,movie, cinema),
                new Showtime(2,  parsedStartTime.plusHours(2),parsedStartDate, movie, cinema)
        );
        when(showtimeRepository.getSchedulesByMovie(movie.getMovieid(), cinema.getCinemaid(), parsedStartDate, parsedStartTime))
                .thenReturn(mockShowtimes);

        // Mock the behavior of modelMapper.map()
        ShowtimeDTO mockShowtimeDTO1 = new ShowtimeDTO();
        mockShowtimeDTO1.setId(1);
        ShowtimeDTO mockShowtimeDTO2 = new ShowtimeDTO();
        mockShowtimeDTO2.setId(2);
        when(modelMapper.map(mockShowtimes.get(0), ShowtimeDTO.class)).thenReturn(mockShowtimeDTO1);
        when(modelMapper.map(mockShowtimes.get(1), ShowtimeDTO.class)).thenReturn(mockShowtimeDTO2);

        // Call the method to be tested
        List<ShowtimeDTO> result = showtimeService.getSchedules(movie.getMovieid(), cinema.getCinemaid(), startDateStr, startTimeStr);

        // Expected ShowtimeDTOs after mapping
        List<ShowtimeDTO> expectedShowtimeDTOs = Arrays.asList(mockShowtimeDTO1, mockShowtimeDTO2);

        // Assert the result
        assertEquals(expectedShowtimeDTOs, result);
    }
}
