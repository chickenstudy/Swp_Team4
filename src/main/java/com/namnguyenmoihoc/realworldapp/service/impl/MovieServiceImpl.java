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
        System.out.println(movieOptional);

        if (movieOptional.isEmpty()) {
            throw new CustomNotFoundException(CustomError.builder().code("404").message("Movie not found").build());
        }

        // return buidProfileResponse(userOptional.get());

        Movie movie = movieOptional.get();
        updateMovieDetails(movie, movieDTOUpdate);

        movie = movieRepository.save(movie);
        return buildMovieResponse(movie);
    }

    private void updateMovieDetails(Movie movie, MovieDTOUpdate movieDTOUpdate) {
        String posterStr = movieDTOUpdate.getPoster();
        String bannerStr = movieDTOUpdate.getBanner();
        try {
            String encodePosterStr = Base64.getEncoder().encodeToString(posterStr.getBytes("ASCII"));
            String encodeBannerStr = Base64.getEncoder().encodeToString(bannerStr.getBytes("ASCII"));
            byte[] decodePoster = Base64.getDecoder().decode(encodePosterStr); // string to byte[]
            byte[] decodeBanner = Base64.getDecoder().decode(encodeBannerStr);

            movie.setBanner(decodeBanner);
            movie.setPoster(decodePoster);
            movie.setTrailer(movieDTOUpdate.getTrailer());
            movie.setShow_date(movieDTOUpdate.getShow_date());
            movie.setCountry(movieDTOUpdate.getCountry());
            movie.setName(movieDTOUpdate.getName());
            movie.setDescription(movieDTOUpdate.getDescription());
            movie.setType(movieDTOUpdate.getType());
            movie.setTimes(movieDTOUpdate.getTimes());
        } catch (Exception e) {

            e.printStackTrace();

        }

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
    public Map<String, MovieDTOResponse> getMovieByID(int movieId) throws CustomNotFoundException {
        Optional<Movie> movieOptional = movieRepository.findById(movieId);

        if (movieOptional.isEmpty()) {
            throw new CustomNotFoundException(CustomError.builder().code("404").message("Movie not found").build());
        }
        Movie movie = movieOptional.get();
        // MovieDTOResponseCreate.add(MovieMapper.toMovieDTOReponse(movie));
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
