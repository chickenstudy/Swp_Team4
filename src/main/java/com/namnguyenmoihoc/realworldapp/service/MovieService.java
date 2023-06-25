package com.namnguyenmoihoc.realworldapp.service;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;

import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOCreate;

import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOResponseCreate;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOUpdate;


public interface MovieService {

    Map<String, MovieDTOResponseCreate> createMovie(Map<String, MovieDTOCreate> movieDTOCreateMap) throws UnsupportedEncodingException;

    List<MovieDTOResponse> getListMovie();

    Map<String, MovieDTOResponseCreate> getUpdateAccount(MovieDTOUpdate movieDTOUpdate) throws CustomNotFoundException;

    void getDeleteMovie(int movieId)throws CustomNotFoundException;

    Map<String, MovieDTOResponse> getMovieByID(int movieId) throws CustomNotFoundException;
    
}
