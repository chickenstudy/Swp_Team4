package com.namnguyenmoihoc.realworldapp.service.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
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
import com.namnguyenmoihoc.realworldapp.service.MovieService;

@SpringBootTest
public class MovieServiceImplTest {

    @InjectMocks
    private MovieServiceImpl movieService;

    @Mock
    private MovieRepository movieRepository;

    @Test
    public void testCreateMovie() throws UnsupportedEncodingException, ParseException {
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
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
        Date showDate = dateFormat.parse("2023/03/01");
        movieDTOCreate.setShow_date(showDate);
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
    public void testCreateMovieWithoutName() {
        // Tạo đối tượng movieDTOCreateMap
        Map<String, MovieDTOCreate> movieDTOCreateMap = new HashMap<>();
        MovieDTOCreate movieDTOCreate = new MovieDTOCreate();
        // Thiếu trường 'name'
        movieDTOCreate
                .setDescription("The Avengers must undo Thanos's actions in order to restore order to the universe.");
        movieDTOCreate.setCountry("USA");
        movieDTOCreate.setPoster("https://www.example.com/poster.jpg");
        movieDTOCreate.setBanner("https://www.example.com/banner.jpg");
        movieDTOCreate.setTrailer("https://www.example.com/trailer.mp4");
        movieDTOCreate.setType("Action, Adventure, Drama");
        movieDTOCreate.setTimes("3");
        movieDTOCreateMap.put("movie", movieDTOCreate);

        // Gọi hàm createMovie() và kiểm tra xem có báo lỗi hay không
        Assertions.assertThrows(Exception.class, () -> {
            movieService.createMovie(movieDTOCreateMap);
        });

    }

    @Test
    public void testCreateMovieWithouDecption() {
        // Tạo đối tượng movieDTOCreateMap
        Map<String, MovieDTOCreate> movieDTOCreateMap = new HashMap<>();
        MovieDTOCreate movieDTOCreate = new MovieDTOCreate();

        movieDTOCreate.setName("Hoa");
        // movieDTOCreate
        // .setDescription("The Avengers must undo Thanos's actions in order to restore
        // order to the universe.");
        movieDTOCreate.setCountry("USA");
        movieDTOCreate.setPoster("https://www.example.com/poster.jpg");
        movieDTOCreate.setBanner("https://www.example.com/banner.jpg");
        movieDTOCreate.setTrailer("https://www.example.com/trailer.mp4");
        movieDTOCreate.setType("Action, Adventure, Drama");
        movieDTOCreate.setTimes("3");
        movieDTOCreateMap.put("movie", movieDTOCreate);

        // Gọi hàm createMovie() và kiểm tra xem có báo lỗi hay không
        Assertions.assertThrows(Exception.class, () -> {
            movieService.createMovie(movieDTOCreateMap);
        });

    }

    @Test
    public void testCreateMovieWithoutPoster() {
        // Tạo đối tượng movieDTOCreateMap
        Map<String, MovieDTOCreate> movieDTOCreateMap = new HashMap<>();
        MovieDTOCreate movieDTOCreate = new MovieDTOCreate();

        movieDTOCreate.setName("Hoa");
        movieDTOCreate
                .setDescription("The Avengers must undo Thanos's actions in order to restore order to the universe.");
        movieDTOCreate.setCountry("USA");
        // movieDTOCreate.setPoster("https://www.example.com/poster.jpg");
        // movieDTOCreate.setBanner("https://www.example.com/banner.jpg");
        movieDTOCreate.setTrailer("https://www.example.com/trailer.mp4");
        movieDTOCreate.setType("Action, Adventure, Drama");
        movieDTOCreate.setTimes("3");
        movieDTOCreateMap.put("movie", movieDTOCreate);

        // Gọi hàm createMovie() và kiểm tra xem có báo lỗi hay không
        Assertions.assertThrows(Exception.class, () -> {
            movieService.createMovie(movieDTOCreateMap);
        });
    }

    @Test
    public void testCreateMovieWithoutDate() throws ParseException {
        // Tạo đối tượng movieDTOCreateMap
        Map<String, MovieDTOCreate> movieDTOCreateMap = new HashMap<>();
        MovieDTOCreate movieDTOCreate = new MovieDTOCreate();

        movieDTOCreate.setName("Hoa");
        movieDTOCreate
                .setDescription("The Avengers must undo Thanos's actions in order to restore order to the universe.");
        movieDTOCreate.setCountry("USA");
        movieDTOCreate.setPoster("https://www.example.com/poster.jpg");
        movieDTOCreate.setBanner("https://www.example.com/banner.jpg");
        movieDTOCreate.setTrailer("https://www.example.com/trailer.mp4");
        movieDTOCreate.setType("Action, Adventure, Drama");
        movieDTOCreate.setTimes("3");
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
        Date showDate = dateFormat.parse("22/10/2021");
        movieDTOCreate.setShow_date(showDate);
        movieDTOCreateMap.put("movie", movieDTOCreate);

        // Gọi hàm createMovie() và kiểm tra xem có báo lỗi hay không
        Assertions.assertThrows(Exception.class, () -> {
            movieService.createMovie(movieDTOCreateMap);
        });
    }

    @Test
    public void testCreateMovieWithoutTrailer() {
        // Tạo đối tượng movieDTOCreateMap
        Map<String, MovieDTOCreate> movieDTOCreateMap = new HashMap<>();
        MovieDTOCreate movieDTOCreate = new MovieDTOCreate();

        movieDTOCreate.setName("Hoa");
        // movieDTOCreate
        // .setDescription("The Avengers must undo Thanos's actions in order to restore
        // order to the universe.");
        movieDTOCreate.setCountry("USA");
        movieDTOCreate.setPoster("https://www.example.com/poster.jpg");
        movieDTOCreate.setBanner("https://www.example.com/banner.jpg");
        movieDTOCreate.setTrailer("https://www.example.com/trailer.mp4");
        movieDTOCreate.setType("Action, Adventure, Drama");
        movieDTOCreate.setTimes("3");
        movieDTOCreateMap.put("movie", movieDTOCreate);

        // Gọi hàm createMovie() và kiểm tra xem có báo lỗi hay không
        Assertions.assertThrows(Exception.class, () -> {
            movieService.createMovie(movieDTOCreateMap);
        });
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

    @Test
    void testGetMovieByID() throws CustomNotFoundException {
        int movieid = 1;
        Movie movie = new Movie();

        movie.setMovieid(movieid);
        movie.setName("Test Movie");
        movie.setPoster("poster data".getBytes());
        movie.setDescription("Test movie description");
        movie.setType("Action");
        movie.setShow_date(new Date());
        movie.setBanner("banner data".getBytes());
        movie.setTrailer("https://example.com/trailer");
        movie.setCountry("Test country");
        movie.setTimes("120");

        when(movieRepository.findById(movieid)).thenReturn(Optional.of(movie));

        Map<String, MovieDTOResponse> result = null; // Initialize the result variable

        result = movieService.getMovieByID(movieid);
        assertNotNull(result);
        assertEquals(1, result.size());
        assertTrue(result.containsKey("movie"));

        MovieDTOResponse movieDTO = result.get("movie");
        assertNotNull(movieDTO);
        assertEquals(movie.getMovieid(), movieDTO.getId());
        assertEquals(movie.getName(), movieDTO.getName());
        assertEquals(movie.getCountry(), movieDTO.getCountry());

    }
@Test
void testGetMovieByIDWithout() throws CustomNotFoundException {
    int movieid = 1;
    Movie movie=new Movie();
     movie.setMovieid(movieid);
        movie.setName("Test Movie");
        movie.setPoster("poster data".getBytes());
        movie.setDescription("Test movie description");
        movie.setType("Action");
        movie.setShow_date(new Date());
        movie.setBanner("banner data".getBytes());
        movie.setTrailer("https://example.com/trailer");
        movie.setCountry("Test country");
        movie.setTimes("120");
    // ... (Đoạn mã khởi tạo movie giữ nguyên)
    // ...

    when(movieRepository.findById(movieid)).thenReturn(Optional.of(movie));

    // Test when movie with invalid ID is not found
    Assertions.assertThrows(Exception.class, () -> {
        movieService.getMovieByID(999); // Use an ID that doesn't exist in the test data
    });

    // Rest of the test remains unchanged
    Map<String, MovieDTOResponse> result = movieService.getMovieByID(movieid);
    assertNotNull(result);
    assertEquals(1, result.size());
    assertTrue(result.containsKey("movie"));

    MovieDTOResponse movieDTO = result.get("movie");
    assertNotNull(movieDTO);
    assertEquals(movie.getMovieid(), movieDTO.getId());
    assertEquals(movie.getName(), movieDTO.getName());
    assertEquals(movie.getCountry(), movieDTO.getCountry());
}



    @Test
    void testSearchMovieByName() throws CustomNotFoundException {
        String name = "Avengers";
        Movie movie1 = new Movie();
        movie1.setName("Avengers: Endgame");
        movie1.setPoster("poster data".getBytes());
        movie1.setDescription("Test movie description");
        movie1.setType("Action");
        movie1.setShow_date(new Date());
        movie1.setBanner("banner data".getBytes());
        movie1.setTrailer("https://example.com/trailer");
        movie1.setCountry("Test country");
        movie1.setTimes("120");

        // Set other properties for movie1 object
        Movie movie2 = new Movie();
        movie2.setName("Avengers: Infinity War");
        movie2.setPoster("poster data".getBytes());
        movie2.setDescription("Test movie description");
        movie2.setType("Action");
        movie2.setShow_date(new Date());
        movie2.setBanner("banner data".getBytes());
        movie2.setCountry("Test country");
        movie2.setTimes("120");
        // Set other properties for movie2 object

        List<Movie> movieList = new ArrayList<>();
        movieList.add(movie1);
        movieList.add(movie2);

        when(movieRepository.findAll()).thenReturn(movieList);

        // Act
        List<MovieDTOResponse> result = movieService.searchMovieByName(name);

        // Assert
        Assertions.assertNotNull(result);
        Assertions.assertEquals(2, result.size());

        MovieDTOResponse movieDTO1 = result.get(0);
        Assertions.assertEquals(movie1.getName(), movieDTO1.getName());
        // Perform additional assertions for other properties of movieDTO1

        MovieDTOResponse movieDTO2 = result.get(1);
        Assertions.assertEquals(movie2.getName(), movieDTO2.getName());

    }
    @Test
    void testGetMovieByNameWithout() throws CustomNotFoundException {
       
    }
}
