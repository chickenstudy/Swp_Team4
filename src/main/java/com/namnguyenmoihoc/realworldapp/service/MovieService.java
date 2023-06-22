package com.namnguyenmoihoc.realworldapp.service;

import java.util.List;
import java.util.Map;

import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOCreate;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOResponse;

public interface MovieService {

    Map<String, MovieDTOResponse> createMovie(Map<String, MovieDTOCreate> movieDTOCreateMap);

    List<MovieDTOResponse> getListMovie();
    
}
