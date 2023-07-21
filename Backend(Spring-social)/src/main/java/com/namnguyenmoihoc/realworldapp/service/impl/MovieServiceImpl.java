package com.namnguyenmoihoc.realworldapp.service.impl;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.namnguyenmoihoc.realworldapp.entity.Movie;

import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOCreate;

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
    public Map<String, MovieDTOResponseCreate> createMovie(Map<String, MovieDTOCreate> movieDTOCreateMap)
            throws UnsupportedEncodingException {

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

        List<Movie> listMovie = movieRepository.findAll();

        List<MovieDTOResponse> movieDTOResponses = new ArrayList<>();

        for (Movie movie : listMovie) {
            movieDTOResponses.add(MovieMapper.toMovieDTOReponse(movie));
        }
        return movieDTOResponses;
    }

    @Override
    public Map<String, MovieDTOResponseCreate> getUpdateMovie(MovieDTOUpdate movieDTOUpdate)
            throws CustomNotFoundException {
                
        Optional<Movie> movieOptional = movieRepository.findByMovieid(movieDTOUpdate.getMovieid());

        if (movieOptional.isEmpty()) {
            throw new CustomNotFoundException(CustomError.builder().code("404").message("Movie not found").build());
        }

        Movie movie = movieOptional.get();
        MovieMapper.updateMovieDetails(movie, movieDTOUpdate);

        movie = movieRepository.save(movie);
        return MovieMapper.buildMovieResponse(movie);
    }

    @Override
    public void getDeleteMovie(int movieId) throws CustomNotFoundException {

        Optional<Movie> movieOptional = movieRepository.findById(movieId);

        if (movieOptional.isEmpty()) {
            throw new CustomNotFoundException(CustomError.builder().code("404").message("Movie not found").build());
        }

        movieRepository.deleteById(movieId);
    }

    @Override
    public Map<String, MovieDTOResponse> getMovieByID(int movieId) throws CustomNotFoundException {
        
        Optional<Movie> movieOptional = movieRepository.findById(movieId);

        if (movieOptional.isEmpty()) {
            throw new CustomNotFoundException(CustomError.builder().code("404").message("Movie not found").build());
        }
        Movie movie = movieOptional.get();

        MovieDTOResponse movieDTO = MovieMapper.toMovieDTOReponse(movie);
        Map<String, MovieDTOResponse> result = new HashMap<>();
        result.put("movie", movieDTO);

        return result;

    }

    @Override
    public List<MovieDTOResponse> searchMovieByName(String name) throws CustomNotFoundException {
        List<Movie> movies = movieRepository.findAll();

        List<MovieDTOResponse> searchResults = new ArrayList<>();

        for (Movie movie : movies) {
            if (movie.getName().toLowerCase().contains(name.toLowerCase())) {

                searchResults.add(MovieMapper.toMovieDTOReponse(movie));

            }

        }
        if (searchResults.isEmpty()) {
            throw new CustomNotFoundException(CustomError.builder().message("Not found movie").build());
        }

        return searchResults;

    }
}
