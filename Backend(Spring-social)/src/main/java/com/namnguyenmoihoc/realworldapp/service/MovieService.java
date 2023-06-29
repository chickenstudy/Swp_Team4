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

    public Map<String, MovieDTOResponseCreate> createMovie(Map<String, MovieDTOCreate> movieDTOCreateMap) throws UnsupportedEncodingException;

    public List<MovieDTOResponse> getListMovie();

    public Map<String, MovieDTOResponseCreate> getUpdateMovie(MovieDTOUpdate movieDTOUpdate) throws CustomNotFoundException;

    public void getDeleteMovie(int movieId)throws CustomNotFoundException;

    public Map<String, MovieDTOResponse> getMovieByID(int movieId) throws CustomNotFoundException;

    public List<MovieDTOResponse> searchMovieByName(String name)throws CustomNotFoundException;
    
    
}
