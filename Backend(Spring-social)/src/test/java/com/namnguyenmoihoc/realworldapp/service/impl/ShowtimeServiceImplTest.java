package com.namnguyenmoihoc.realworldapp.service.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.namnguyenmoihoc.realworldapp.entity.Cinema;
import com.namnguyenmoihoc.realworldapp.entity.Showtime;
import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;
import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTOCreate;
import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTOResponseNoID;
import com.namnguyenmoihoc.realworldapp.model.cinema.CinemaDTO;
import com.namnguyenmoihoc.realworldapp.model.cinema.CinemaDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.cinema.CinemaDTOResponseNoId;
import com.namnguyenmoihoc.realworldapp.model.user.mapper.CinemaMapper;
import com.namnguyenmoihoc.realworldapp.model.user.mapper.ShowtimeMapper;
import com.namnguyenmoihoc.realworldapp.repository.CinemaRepository;
import com.namnguyenmoihoc.realworldapp.repository.ShowtimeRepository;

@SpringBootTest
public class ShowtimeServiceImplTest {
    @InjectMocks
    private ShowtimeServiceImpl showtimeServiceImpl;

    @Mock
    private ShowtimeRepository showtimeRepository;

    @Test
    void testCreateShowtime() {
        ShowtimeDTOCreate showtimeDTOCreate = new ShowtimeDTOCreate();
        showtimeDTOCreate.setStarttime("7h");
        showtimeDTOCreate.setEndtime("9h");

        // Create the cinema DTO map and add the cinema DTO to it
        Map<String, ShowtimeDTOCreate> showMap = new HashMap<>();
        showMap.put("showtime", showtimeDTOCreate);

        // Convert the cinema DTO to a cinema object
        Showtime showtime = ShowtimeMapper.toShowtime(showtimeDTOCreate);

        // Set up the mock behavior for the cinema repository
        when(showtimeRepository.save(any(Showtime.class))).thenReturn(showtime);

        // Call the createCinema() method to test
        Map<String, ShowtimeDTOResponseNoID> result = showtimeServiceImpl.createShowtime(showMap);

        // Check the result
        assertEquals(1, result.size()); // Check that the result map has 1 element
        assertTrue(result.containsKey("showtime"));

    }

    @Test
    void testGetDeleteShowtime() throws CustomNotFoundException {

        Showtime showtime = new Showtime();
        showtime.setShowtimeid(1);
        ;

        // Mock the movieRepository.findById() method to return the movie
        when(showtimeRepository.findById(1)).thenReturn(Optional.of(showtime));

        // Call the method under test
      showtimeServiceImpl.getDeleteShowtime(1);;
        ;

        // Verify the behavior
        verify(showtimeRepository).findById(1); // Verify that movieRepository.findById() was called
        verify(showtimeRepository).deleteById(1);
    }

    @Test
    void testGetListShowtime() {
      //  Showtime showtime1 = new Showtime();
      //  showtime1.setShowtimeid(1);
      //   showtime1.setStarttime("7h");
      // showtime1.setEndtime("9h");

      // Showtime showtime2 = new Showtime();
      //  showtime2.setShowtimeid(2);
      //   showtime2.setStarttime("13h");
      // showtime2.setEndtime("15h");

      //   // Create a list of cinema objects
      //   List<Showtime> listShowtime = new ArrayList<>();
      //   listShowtime.add(cinema1);
      //   listCinemas.add(cinema2);

      //   // Set up the mock behavior for the cinema repository
      //   when(cinemaRepository.findAll()).thenReturn(listCinemas);

      //   // Call the getListCinemas() method to test
      //   List<CinemaDTOResponse> result = cinemaService.getListCinemas();

      //   // Check the result
      //   assertNotNull(result);
      //   assertEquals(2, result.size()); // Check that the result list has 2 elements

      //   CinemaDTOResponse cinemaDTO1 = result.get(0);
      //   assertNotNull(cinemaDTO1);
      //   assertEquals(cinema1.getCinemaid(), cinemaDTO1.getCinemaid());
      //   assertEquals(cinema1.getName(), cinemaDTO1.getName());
      //   assertEquals(cinema1.getLocation(), cinemaDTO1.getLocation());

      //   CinemaDTOResponse cinemaDTO2 = result.get(1);
      //   assertNotNull(cinemaDTO2);
      //   assertEquals(cinema2.getCinemaid(), cinemaDTO2.getCinemaid());
      //   assertEquals(cinema2.getName(), cinemaDTO2.getName());
      //   assertEquals(cinema2.getLocation(), cinemaDTO2.getLocation());

    }

    @Test
    void testGetUpdateShowtime() {

    }
}
