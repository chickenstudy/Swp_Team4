package com.namnguyenmoihoc.realworldapp.service;

import java.util.List;
import java.util.Map;

import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOCreate;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOUpdate;
import com.namnguyenmoihoc.realworldapp.model.profileAccount.ProfileDTOResponsive;

public interface MovieService {

    Map<String, MovieDTOResponse> createMovie(Map<String, MovieDTOCreate> movieDTOCreateMap);

    List<MovieDTOResponse> getListMovie();

    Map<String, MovieDTOResponse> getUpdateAccount(MovieDTOUpdate movieDTOUpdate) throws CustomNotFoundException;
    
}
