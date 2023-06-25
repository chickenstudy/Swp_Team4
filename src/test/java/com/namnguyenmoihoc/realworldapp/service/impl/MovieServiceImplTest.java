package com.namnguyenmoihoc.realworldapp.service.impl;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.namnguyenmoihoc.realworldapp.entity.Movie;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOCreate;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOResponse;
import com.namnguyenmoihoc.realworldapp.repository.MovieRepository;

@SpringBootTest
public class MovieServiceImplTest {

     @InjectMocks
    private MovieServiceImpl movieService;

    @Mock
    
    private MovieRepository movieRepository;
    
    /* 
    @Test
    void testCreateMovie() {
        // tạo đối tượng movieDTOCreateMap
        Map<String, MovieDTOCreate> movieDTOCreateMap = new HashMap<>();
        MovieDTOCreate movieDTOCreate = new MovieDTOCreate();
        movieDTOCreate.setName("Avengers: Endgame");
        movieDTOCreate.setDescription("The Avengers must undo Thanos's actions in order to restore order to the universe.");
        movieDTOCreate.setCountry("USA");
        movieDTOCreate.setPoster("https://www.example.com/poster.jpg");
        movieDTOCreate.setBanner("https://www.example.com/banner.jpg");
        movieDTOCreate.setTrailer("https://www.example.com/trailer.mp4");
        movieDTOCreate.setType("Action, Adventure, Drama");
        // movieDTOCreate.setTimes(3);
        movieDTOCreateMap.put("movie", movieDTOCreate);

        // tạo đối tượng Movie
        Movie movie = new Movie();
        // movie.setId(1L);
        movie.setName(movieDTOCreate.getName());
        movie.setDescription(movieDTOCreate.getDescription());
        movie.setCountry(movieDTOCreate.getCountry());
        movie.setPoster(movieDTOCreate.getPoster());
        movie.setBanner(movieDTOCreate.getBanner());
        movie.setTrailer(movieDTOCreate.getTrailer());
        movie.setType(movieDTOCreate.getType());
        movie.setTimes(movieDTOCreate.getTimes());

        // stub logic của movieRepository.save()
        when(movieRepository.save(any(Movie.class))).thenReturn(movie);

        // gọi hàm createMovie() để kiểm tra kết quả trả về
        Map<String, MovieDTOResponse> result = movieService.createMovie(movieDTOCreateMap);

        // kiểm tra kết quả trả về
        assertThat(result).hasSize(1); // chỉ có 1 phần tử trong map return
        String key = "movie";
        assertThat(result.containsKey(key)).isTrue(); // key có tồn tại trong map return
        MovieDTOResponse movieDTOResponse = result.get(key);
        assertThat(movieDTOResponse.getId()).isNotNull(); // id không null
        assertThat(movieDTOResponse.getName()).isEqualTo(movieDTOCreate.getName());
        assertThat(movieDTOResponse.getDescription()).isEqualTo(movieDTOCreate.getDescription());
        assertThat(movieDTOResponse.getCountry()).isEqualTo(movieDTOCreate.getCountry());
        assertThat(movieDTOResponse.getPoster()).isEqualTo(movieDTOCreate.getPoster());
        assertThat(movieDTOResponse.getBanner()).isEqualTo(movieDTOCreate.getBanner());
        assertThat(movieDTOResponse.getTrailer()).isEqualTo(movieDTOCreate.getTrailer());
        assertThat(movieDTOResponse.getType()).isEqualTo(movieDTOCreate.getType());
        assertThat(movieDTOResponse.getTimes()).isEqualTo(movieDTOCreate.getTimes());
    }
    */

    @Test
    void testGetDeleteMovie() {

    }

    @Test
    void testGetListMovie() {

    }

    @Test
    void testGetUpdateAccount() {

    }
}
