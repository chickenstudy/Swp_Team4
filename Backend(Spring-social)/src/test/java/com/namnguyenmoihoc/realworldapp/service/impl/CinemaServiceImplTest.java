package com.namnguyenmoihoc.realworldapp.service.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.namnguyenmoihoc.realworldapp.entity.Cinema;

import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;
import com.namnguyenmoihoc.realworldapp.model.cinema.CinemaDTO;
import com.namnguyenmoihoc.realworldapp.model.cinema.CinemaDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.cinema.CinemaDTOResponseNoId;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOCreate;
import com.namnguyenmoihoc.realworldapp.model.user.mapper.CinemaMapper;

import com.namnguyenmoihoc.realworldapp.repository.CinemaRepository;

@SpringBootTest
public class CinemaServiceImplTest {

    @InjectMocks
    private CinemaServiceImpl cinemaService;

    @Mock
    private CinemaRepository cinemaRepository;

    @Test
    void testCreateCinema() {
        CinemaDTO cinemaDTOCreate = new CinemaDTO();
        cinemaDTOCreate.setName("lottle");
        cinemaDTOCreate.setLocation("ha noi");

        // Create the cinema DTO map and add the cinema DTO to it
        Map<String, CinemaDTO> cinemaDTOCreateMap = new HashMap<>();
        cinemaDTOCreateMap.put("cinema", cinemaDTOCreate);

        // Convert the cinema DTO to a cinema object
        Cinema cinema = CinemaMapper.toCinema(cinemaDTOCreate);

        // Set up the mock behavior for the cinema repository
        when(cinemaRepository.save(any(Cinema.class))).thenReturn(cinema);

        // Call the createCinema() method to test
        Map<String, CinemaDTOResponseNoId> result = cinemaService.createCinema(cinemaDTOCreateMap);

        // Check the result
        assertEquals(1, result.size()); // Check that the result map has 1 element
        assertTrue(result.containsKey("cinema"));

    }

    @Test
    public void testCreateCinemaWithoutName() {
        // Tạo đối tượng movieDTOCreateMap
        CinemaDTO cinemaDTOCreate = new CinemaDTO();
        // cinemaDTOCreate.setName("lottle");
        cinemaDTOCreate.setLocation("ha noi");
        Map<String, CinemaDTO> cinemaDTOCreateMap = new HashMap<>();
        cinemaDTOCreateMap.put("cinema", cinemaDTOCreate);

        // Gọi hàm createMovie() và kiểm tra xem có báo lỗi hay không
        Assertions.assertThrows(Exception.class, () -> {
            cinemaService.createCinema(cinemaDTOCreateMap);
        });

    }
    @Test
    public void testCreateCinemaWithoutNameAndLocation() {
        // Tạo đối tượng movieDTOCreateMap
        CinemaDTO cinemaDTOCreate = new CinemaDTO();
        // cinemaDTOCreate.setName("lottle");
        // cinemaDTOCreate.setLocation("ha noi");
        Map<String, CinemaDTO> cinemaDTOCreateMap = new HashMap<>();
        cinemaDTOCreateMap.put("cinema", cinemaDTOCreate);

        // Gọi hàm createMovie() và kiểm tra xem có báo lỗi hay không
        Assertions.assertThrows(Exception.class, () -> {
            cinemaService.createCinema(cinemaDTOCreateMap);
        });
    }

    @Test
    public void testCreateCinemaWithoutLocation() {
        // Tạo đối tượng movieDTOCreateMap
        CinemaDTO cinemaDTOCreate = new CinemaDTO();
        cinemaDTOCreate.setName("lottle");
        cinemaDTOCreate.setLocation("ha noi");
        Map<String, CinemaDTO> cinemaDTOCreateMap = new HashMap<>();
        cinemaDTOCreateMap.put("cinema", cinemaDTOCreate);

        // Gọi hàm createMovie() và kiểm tra xem có báo lỗi hay không
        Assertions.assertThrows(Exception.class, () -> {
            cinemaService.createCinema(cinemaDTOCreateMap);
        });

    }

    @Test
    void testGetCinemaByID() throws CustomNotFoundException {
        int cinemaId = 1;
        Cinema cinema = new Cinema();
        cinema.setCinemaid(cinemaId);
        cinema.setName("Lottle");
        cinema.setLocation("Ha Noi");

        when(cinemaRepository.findById(cinemaId)).thenReturn(Optional.of(cinema));

        Map<String, CinemaDTOResponse> result = null; // Initialize the result variable

        result = cinemaService.getCinemaByID(cinemaId);
        assertNotNull(result);
        assertEquals(1, result.size());
        assertTrue(result.containsKey("cinema"));

        CinemaDTOResponse cinemaDTO = result.get("cinema");
        assertNotNull(cinemaDTO);
        assertEquals(cinema.getCinemaid(), cinemaDTO.getCinemaid());
        assertEquals(cinema.getName(), cinemaDTO.getName());
        assertEquals(cinema.getLocation(), cinemaDTO.getLocation());

    }

    @Test
    void testGetCinemaByIDWithout() throws CustomNotFoundException {
        int cinemaId = 1;
        Cinema cinema = new Cinema();
        cinema.setCinemaid(cinemaId);
        cinema.setName("Lottle");
        cinema.setLocation("Ha Noi");

        when(cinemaRepository.findById(cinemaId)).thenReturn(Optional.of(cinema));

        Assertions.assertThrows(Exception.class, () -> {
            cinemaService.getCinemaByID(999); // Use an ID that doesn't exist in the test data
        });
        Map<String, CinemaDTOResponse> result = null; // Initialize the result variable

        result = cinemaService.getCinemaByID(cinemaId);
        assertNotNull(result);
        assertEquals(1, result.size());
        assertTrue(result.containsKey("cinema"));

        CinemaDTOResponse cinemaDTO = result.get("cinema");
        assertNotNull(cinemaDTO);
        assertEquals(cinema.getCinemaid(), cinemaDTO.getCinemaid());
        assertEquals(cinema.getName(), cinemaDTO.getName());
        assertEquals(cinema.getLocation(), cinemaDTO.getLocation());

    }

    @Test
    void testGetDeleteCinema() throws CustomNotFoundException {
        // Create a movie object
        Cinema cinema = new Cinema();
        cinema.setCinemaid(1);
        ;

        // Mock the movieRepository.findById() method to return the movie
        when(cinemaRepository.findById(1)).thenReturn(Optional.of(cinema));

        // Call the method under test
        cinemaService.getDeleteCinema(1);
        ;

        // Verify the behavior
        verify(cinemaRepository).findById(1); // Verify that movieRepository.findById() was called
        verify(cinemaRepository).deleteById(1);

    }

    @Test
    void testGetListCinemas() {
        // Create sample cinema objects
        Cinema cinema1 = new Cinema();
        cinema1.setCinemaid(1);
        cinema1.setName("Lottle");
        cinema1.setLocation("Ha Noi");

        Cinema cinema2 = new Cinema();
        cinema2.setCinemaid(2);
        cinema2.setName("Mega");
        cinema2.setLocation("Ho Chi Minh City");

        // Create a list of cinema objects
        List<Cinema> listCinemas = new ArrayList<>();
        listCinemas.add(cinema1);
        listCinemas.add(cinema2);

        // Set up the mock behavior for the cinema repository
        when(cinemaRepository.findAll()).thenReturn(listCinemas);

        // Call the getListCinemas() method to test
        List<CinemaDTOResponse> result = cinemaService.getListCinemas();

        // Check the result
        assertNotNull(result);
        assertEquals(2, result.size()); // Check that the result list has 2 elements

        CinemaDTOResponse cinemaDTO1 = result.get(0);
        assertNotNull(cinemaDTO1);
        assertEquals(cinema1.getCinemaid(), cinemaDTO1.getCinemaid());
        assertEquals(cinema1.getName(), cinemaDTO1.getName());
        assertEquals(cinema1.getLocation(), cinemaDTO1.getLocation());

        CinemaDTOResponse cinemaDTO2 = result.get(1);
        assertNotNull(cinemaDTO2);
        assertEquals(cinema2.getCinemaid(), cinemaDTO2.getCinemaid());
        assertEquals(cinema2.getName(), cinemaDTO2.getName());
        assertEquals(cinema2.getLocation(), cinemaDTO2.getLocation());

    }

    @Test
    void testGetUpdateCinema() throws CustomNotFoundException {
        CinemaDTO cinemaDTO = new CinemaDTO();
        cinemaDTO.setName("Updated Cinema");
        cinemaDTO.setLocation("Updated Location");

        Cinema cinema = new Cinema();
        cinema.setCinemaid(1);
        cinema.setName("Old Cinema");
        cinema.setLocation("Old Location");

        when(cinemaRepository.findById(cinemaDTO.getCinemaid())).thenReturn(Optional.of(cinema));
        when(cinemaRepository.save(any(Cinema.class))).thenReturn(cinema);

        Map<String, CinemaDTOResponseNoId> result = cinemaService.getUpdateCinema(cinemaDTO);

        verify(cinemaRepository).findById(cinemaDTO.getCinemaid());

        verify(cinemaRepository).save(any(Cinema.class));

        assertEquals(1, result.size()); // Check the size of the result map
        assertTrue(result.containsKey("update:")); // Check if the key "update:" exists in the result map

        CinemaDTOResponseNoId cinemaDTOResponse = result.get("update:");
        assertNotNull(cinemaDTOResponse); // Check if the movieDTOResponse is not null

        // Perform additional assertions on the movieDTOResponse object
        assertEquals(cinema.getName(), cinemaDTOResponse.getName());
        assertEquals(cinema.getLocation(), cinemaDTOResponse.getLocation());
    }

    @Test
    void testGetUpdateCinemaWithoutname() throws CustomNotFoundException {

    }

}
