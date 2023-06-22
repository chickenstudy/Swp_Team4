package com.namnguyenmoihoc.realworldapp.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.namnguyenmoihoc.realworldapp.entity.Movie;
import com.namnguyenmoihoc.realworldapp.entity.Roles;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOCreate;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.roles.UserRolesDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.user.mapper.MovieMapper;
import com.namnguyenmoihoc.realworldapp.model.user.mapper.RoleMapper;
import com.namnguyenmoihoc.realworldapp.repository.MovieRepository;
import com.namnguyenmoihoc.realworldapp.service.MovieService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MovieServiceImpl implements MovieService {
    private final MovieRepository movieRepository;

    @Override
    public Map<String, MovieDTOResponse> createMovie(Map<String, MovieDTOCreate> movieDTOCreateMap) {
        // TODO Auto-generated method stub
        MovieDTOCreate movieDTOcreate = movieDTOCreateMap.get("movie");
        Movie movie = MovieMapper.toMovie(movieDTOcreate);
        movie = movieRepository.save(movie);
        
        Map<String, MovieDTOResponse> wrapper = new HashMap<>();
        MovieDTOResponse movieDTOResponse = MovieMapper.toMovieDTOReponse(movie);
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
    

}
