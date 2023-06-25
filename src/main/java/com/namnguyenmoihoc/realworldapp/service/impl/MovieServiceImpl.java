package com.namnguyenmoihoc.realworldapp.service.impl;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Base64;
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
        // TODO Auto-generated method stub
        List<Movie> listMovie = movieRepository.findAll();

        List<MovieDTOResponse> movieDTOResponses = new ArrayList<>();

        for (Movie movie : listMovie) {
            movieDTOResponses.add(MovieMapper.toMovieDTOReponse(movie));
        }
        return movieDTOResponses;
    }

    @Override
    public Map<String, MovieDTOResponseCreate> getUpdateAccount(MovieDTOUpdate movieDTOUpdate)
            throws CustomNotFoundException {
        // TODO Auto-generated method stub
        Optional<Movie> movieOptional = movieRepository.findById(movieDTOUpdate.getMovieid());

        if (movieOptional.isEmpty()) {
            throw new CustomNotFoundException(CustomError.builder().code("404").message("Movie not found").build());
        }

        // return buidProfileResponse(userOptional.get());

        Movie movie = MovieMapper.toMovieUpdate(movieDTOUpdate);
        System.out.println("update:");
        movie = movieRepository.save(movie);
        return buildMovieResponse(movie);
    }

    private Map<String, MovieDTOResponseCreate> buildMovieResponse(Movie movie) {
        String poster = Base64.getEncoder().encodeToString(movie.getPoster()); // byte to string
        String banner = Base64.getEncoder().encodeToString(movie.getBanner());
        Map<String, MovieDTOResponseCreate> wrapper = new HashMap<>();

        MovieDTOResponseCreate movieDTOResponse = MovieDTOResponseCreate.builder().poster(poster)
                .banner(banner).trailer(movie.getTrailer()).show_date(movie.getShow_date())
                .country(movie.getCountry()).name(movie.getName()).description(movie.getDescription())
                .type(movie.getType()).times(movie.getTimes()).build();

        wrapper.put("update:", movieDTOResponse);
        return wrapper;
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
    public Map<String, MovieDTOResponseCreate> getMovieByID(int movieId) throws CustomNotFoundException {
        Optional<Movie> movieOptional = movieRepository.findById(movieId);

        if (movieOptional.isEmpty()) {
            throw new CustomNotFoundException(CustomError.builder().code("404").message("Movie not found").build());
        }
        Movie movie = movieOptional.get();
        // MovieDTOResponseCreate.add(MovieMapper.toMovieDTOReponse(movie));
        MovieDTOResponseCreate movieDTO = MovieMapper.toMovieDTOReponseCreate(movie);
        Map<String, MovieDTOResponseCreate> result = new HashMap<>();
        result.put("movie", movieDTO);

        return result;

    }
}
