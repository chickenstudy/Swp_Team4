package com.namnguyenmoihoc.realworldapp.service.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.io.UnsupportedEncodingException;

import java.util.Date;
import java.util.HashMap;

import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import org.springframework.boot.test.context.SpringBootTest;

import com.namnguyenmoihoc.realworldapp.entity.Movie;
import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOCreate;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOUpdate;
import com.namnguyenmoihoc.realworldapp.model.user.mapper.MovieMapper;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOResponseCreate;
import com.namnguyenmoihoc.realworldapp.repository.MovieRepository;

@SpringBootTest
public class MovieServiceImplTest {

    @InjectMocks
    private MovieServiceImpl movieService;

    @Mock
    private MovieRepository movieRepository;

    @Test
    public void testCreateMovie() throws UnsupportedEncodingException {
        // tạo đối tượng movieDTOCreateMap
        Map<String, MovieDTOCreate> movieDTOCreateMap = new HashMap<>();
        MovieDTOCreate movieDTOCreate = new MovieDTOCreate();
        movieDTOCreate.setName("Avengers: Endgame");
        movieDTOCreate
                .setDescription("The Avengers must undo Thanos's actions in order to restore order to the universe.");
        movieDTOCreate.setCountry("USA");
        movieDTOCreate.setPoster("https://www.example.com/poster.jpg");
        movieDTOCreate.setBanner("https://www.example.com/banner.jpg");
        movieDTOCreate.setTrailer("https://www.example.com/trailer.mp4");
        movieDTOCreate.setType("Action, Adventure, Drama");
        movieDTOCreate.setTimes("3");
        movieDTOCreateMap.put("movie", movieDTOCreate);

        // tạo đối tượng Movie

        Movie movie = MovieMapper.toMovie(movieDTOCreate);

        // stub logic của movieRepository.save()
        when(movieRepository.save(any(Movie.class))).thenReturn(movie);

        // gọi hàm createMovie() để kiểm tra kết quả trả về
        Map<String, MovieDTOResponseCreate> result = movieService.createMovie(movieDTOCreateMap);

        // kiểm tra kết quả trả về
        assert (result.size() == 1); // chỉ có 1 phần tử trong map return
        String key = "movie";
        assert (result.containsKey(key)); // key có tồn tại trong map return
    }

    @Test
    public void testGetListMovie() {
        // Given
        Movie movie = new Movie();
        movie.setMovieid(1);
        movie.setName("Test Movie");
        movie.setPoster("poster data".getBytes());
        movie.setDescription("Test movie description");
        movie.setType("Action");
        movie.setShow_date(new Date());
        movie.setBanner("banner data".getBytes());
        movie.setTrailer("https://example.com/trailer");
        movie.setCountry("Test country");
        movie.setTimes("120");

        // When
        MovieDTOResponse movieDTO = MovieMapper.toMovieDTOReponse(movie);

        // Then
        assertEquals(1, movieDTO.getId());
        assertEquals("Test Movie", movieDTO.getName());
        assertEquals("poster data", movieDTO.getPoster());
        assertEquals("Test movie description", movieDTO.getDescription());
        assertEquals("Action", movieDTO.getType());
        assertEquals("banner data", movieDTO.getBanner());
        assertEquals("https://example.com/trailer", movieDTO.getTrailer());
        assertEquals("Test country", movieDTO.getCountry());
        assertEquals("120", movieDTO.getTimes());
    }

    @Test
    public void testGetUpdateMovie() throws CustomNotFoundException {
        // Create a movieDTOUpdate
        MovieDTOUpdate movieDTOUpdate = new MovieDTOUpdate();
        movieDTOUpdate.setMovieid(1); // Set the movieid
        movieDTOUpdate.setPoster("poster-url");
        movieDTOUpdate.setBanner("banner-url");
        movieDTOUpdate.setTrailer("trailer-url");
        movieDTOUpdate.setShow_date(new Date());
        movieDTOUpdate.setCountry("USA");
        movieDTOUpdate.setName("Avengers: Endgame");
        movieDTOUpdate
                .setDescription("The Avengers must undo Thanos's actions in order to restore order to the universe.");
        movieDTOUpdate.setType("action");
        movieDTOUpdate.setTimes("2h 30min");

        // Create a movie object
        Movie movie = new Movie();
        movie.setMovieid(1);
        // Set other properties of the movie object

        // Mock the movieRepository.findByMovieid() method
        when(movieRepository.findByMovieid(movieDTOUpdate.getMovieid())).thenReturn(Optional.of(movie));

        // Mock the movieRepository.save() method
        when(movieRepository.save(any(Movie.class))).thenReturn(movie);

        // Call the method under test
        Map<String, MovieDTOResponseCreate> result = movieService.getUpdateMovie(movieDTOUpdate);

        // Verify the behavior and assertions
        verify(movieRepository).findByMovieid(movieDTOUpdate.getMovieid()); // Verify that
                                                                            // movieRepository.findByMovieid() was
                                                                            // called
        verify(movieRepository).save(any(Movie.class)); // Verify that movieRepository.save() was called

        assertEquals(1, result.size()); // Check the size of the result map
        assertTrue(result.containsKey("update:")); // Check if the key "update:" exists in the result map

        MovieDTOResponseCreate movieDTOResponse = result.get("update:");
        assertNotNull(movieDTOResponse); // Check if the movieDTOResponse is not null

        // Perform additional assertions on the movieDTOResponse object
        assertEquals(movie.getName(), movieDTOResponse.getName());
        assertEquals(movie.getDescription(), movieDTOResponse.getDescription());
        // Continue with other assertions for the remaining properties
    }

    @Test
    public void testGetDeleteMovie() throws CustomNotFoundException {
        // Create a movie object
        Movie movie = new Movie();
        movie.setMovieid(22);

        // Mock the movieRepository.findById() method to return the movie
        when(movieRepository.findById(22)).thenReturn(Optional.of(movie));

        // Call the method under test
        movieService.getDeleteMovie(22);

        // Verify the behavior
        verify(movieRepository).findById(22); // Verify that movieRepository.findById() was called
        verify(movieRepository).deleteById(22); // Verify that movieRepository.deleteById() was called with the correct
                                                // movieId
    }

}
