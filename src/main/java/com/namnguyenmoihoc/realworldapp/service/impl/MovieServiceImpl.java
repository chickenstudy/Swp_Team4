package com.namnguyenmoihoc.realworldapp.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.namnguyenmoihoc.realworldapp.entity.Movie;
import com.namnguyenmoihoc.realworldapp.entity.Roles;
import com.namnguyenmoihoc.realworldapp.entity.User;
import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOCreate;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTODelete;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOResponseCreate;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOUpdate;

import com.namnguyenmoihoc.realworldapp.model.user.CustomError;
import com.namnguyenmoihoc.realworldapp.model.user.mapper.MovieMapper;

import com.namnguyenmoihoc.realworldapp.repository.MovieRepository;
import com.namnguyenmoihoc.realworldapp.service.MovieService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MovieServiceImpl implements MovieService {
    private final MovieRepository movieRepository;

    @Override
    public Map<String, MovieDTOResponseCreate> createMovie(Map<String, MovieDTOCreate> movieDTOCreateMap) {
    
        MovieDTOCreate movieDTOcreate = movieDTOCreateMap.get("movie");
        Movie movie = MovieMapper.toMovie(movieDTOcreate);
        movie = movieRepository.save(movie);

        Map<String, MovieDTOResponseCreate> wrapper = new HashMap<>();
        MovieDTOResponseCreate movieDTOResponse = MovieMapper.toMovieDTOReponseCreate(movie);
        wrapper.put("movie", movieDTOResponse);
        return wrapper;
    }

    @Override
    public List<MovieDTOResponse> getListMovie() {
        // TODO Auto-generated method stub
        List<Movie> listMovie = movieRepository.findAll();

        List<MovieDTOResponse> movieDTOResponses = new ArrayList<>();

        for (Movie movie : listMovie) {
            movieDTOResponses.add(MovieMapper.toMovieDTOReponse(movie));
        }
        return movieDTOResponses;
    }

    @Override
    public Map<String, MovieDTOResponse> getUpdateAccount(MovieDTOUpdate movieDTOUpdate)
            throws CustomNotFoundException {
        // TODO Auto-generated method stub
        Optional<Movie> movieOptional = movieRepository.findById(movieDTOUpdate.getMovieid());

        if (movieOptional.isEmpty()) {
            throw new CustomNotFoundException(CustomError.builder().code("404").message("User not found").build());
        }

        // return buidProfileResponse(userOptional.get());

        Movie movie = MovieMapper.toMovieUpdate(movieDTOUpdate);
        System.out.println("update:");
        movie = movieRepository.save(movie);
        return buildMovieResponse(movie);
    }

    private Map<String, MovieDTOResponse> buildMovieResponse(Movie movie) {
        Map<String, MovieDTOResponse> wrapper = new HashMap<>();

        MovieDTOResponse movieDTOResponse = MovieDTOResponse.builder().poster(movie.getPoster()).id(movie.getMovie_id())
                .banner(movie.getBanner()).trailer(movie.getTrailer()).show_date(movie.getShow_date())
                .country(movie.getCountry()).name(movie.getName()).description(movie.getDescription())
                .type(movie.getType()).times(movie.getTimes()).build();

        wrapper.put("update:", movieDTOResponse);
        return wrapper;
    }

    @Override
    public void getDeleteMovie(MovieDTODelete movieDTODelete) throws CustomNotFoundException {
        int movieId = movieDTODelete.getMovieid();

        Optional<Movie> movieOptional = movieRepository.findById(movieId);

        if (movieOptional.isEmpty()) {
            throw new CustomNotFoundException(CustomError.builder().code("404").message("Movie not found").build());
        }

        movieRepository.deleteById(movieId);
    }
}
