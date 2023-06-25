package com.namnguyenmoihoc.realworldapp.service.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
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
        Movie movie = new Movie();
        // movie.setId(1L);
        movie.setName(movieDTOCreate.getName());
        movie.setDescription(movieDTOCreate.getDescription());
        movie.setCountry(movieDTOCreate.getCountry());
        // movie.setPoster(movieDTOCreate.getPoster());
        // movie.setBanner(movieDTOCreate.getBanner());
        movie.setTrailer(movieDTOCreate.getTrailer());
        movie.setType(movieDTOCreate.getType());
        movie.setTimes(movieDTOCreate.getTimes());

        // stub logic của movieRepository.save()
        when(movieRepository.save(any(Movie.class))).thenReturn(movie);

        // gọi hàm createMovie() để kiểm tra kết quả trả về
        Map<String, MovieDTOResponseCreate> result = movieService.createMovie(movieDTOCreateMap);

        // kiểm tra kết quả trả về
        assert (result.size() == 1); // chỉ có 1 phần tử trong map return
        String key = "movie";
        assert (result.containsKey(key)); // key có tồn tại trong map return
        MovieDTOResponseCreate movieDTOResponse = result.get(key);
        // assert(movieDTOResponse.getId() != null); // id không null
        assert (movieDTOResponse.getName().equals(movieDTOCreate.getName()));
        assert (movieDTOResponse.getDescription().equals(movieDTOCreate.getDescription()));
        assert (movieDTOResponse.getCountry().equals(movieDTOCreate.getCountry()));
        assert (movieDTOResponse.getPoster().equals(movieDTOCreate.getPoster()));
        assert (movieDTOResponse.getBanner().equals(movieDTOCreate.getBanner()));
        assert (movieDTOResponse.getTrailer().equals(movieDTOCreate.getTrailer()));
        assert (movieDTOResponse.getType().equals(movieDTOCreate.getType()));
        assert (movieDTOResponse.getTimes() == movieDTOCreate.getTimes());
    }

    @Test
    public void testGetListMovie() {
        // Create a list of movies
        List<Movie> movies = new ArrayList<>();
        movies.add(new Movie(1, "q", "q", null, "d", "e", null, null, "d", "d", "d"));
        movies.add(new Movie(2, "o", "o", null, "m", "g", null, null, "d", "d", "d"));

        // Mock the movieRepository.findAll() method to return the list of movies
        when(movieRepository.findAll()).thenReturn(movies);

        // Call the method under test
        List<MovieDTOResponse> result = movieService.getListMovie();

        // Verify the behavior and assertions
        verify(movieRepository).findAll(); // Verify that movieRepository.findAll() was called

        // Check the size of the result list
        assertEquals(2, result.size());

        // Check the properties of the first movie in the result list
        MovieDTOResponse movie1 = result.get(0);
        assertEquals(1, movie1.getId());
        assertEquals("q", movie1.getName());
        assertEquals("d", movie1.getDescription());
        assertEquals("d", movie1.getCountry());

        // Check the properties of the second movie in the result list
        MovieDTOResponse movie2 = result.get(1);
        assertEquals(2, movie2.getId());
        assertEquals("o", movie2.getName());
        assertEquals("m", movie2.getDescription());
        assertEquals("d", movie2.getCountry());
    }

    @Test
    public void testGetUpdateAccount() throws CustomNotFoundException {
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
        movie.setMovie_id(1);
        ;
        // Set other properties of the movie object

        // Mock the movieRepository.findById() method
        when(movieRepository.findById(movieDTOUpdate.getMovieid())).thenReturn(Optional.of(movie));

        // Mock the movieRepository.save() method
        when(movieRepository.save(any(Movie.class))).thenReturn(movie);

        // Call the method under test
        Map<String, MovieDTOResponseCreate> result = movieService.getUpdateAccount(movieDTOUpdate);

        // Verify the behavior and assertions
        verify(movieRepository).findById(movieDTOUpdate.getMovieid()); // Verify that movieRepository.findById() was
                                                                       // called
        verify(movieRepository).save(any(Movie.class)); // Verify that movieRepository.save() was called

        assertEquals(1, result.size()); // Check the size of the result map
        assertTrue(result.containsKey("update:")); // Check if the key "update:" exists in the result map

        MovieDTOResponseCreate movieDTOResponse = result.get("update:");
        assertNotNull(movieDTOResponse); // Check if the movieDTOResponse is not null

        // Perform additional assertions on the movieDTOResponse object
        // assertEquals(movie.getMovie_id(), movieDTOResponse.getId());
        assertEquals(movie.getName(), movieDTOResponse.getName());
        assertEquals(movie.getDescription(), movieDTOResponse.getDescription());
        // Continue with other assertions for the remaining properties
    }

    @Test
    public void testGetDeleteMovie() throws CustomNotFoundException {
        // Create a movie object
        Movie movie = new Movie();
        movie.setMovie_id(22);
        movie.setName("Avengers: Endgame");
        movie.setDescription("The Avengers must undo Thanos's actions in order to restore order to the universe.");
        movie.setCountry("USA");

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
