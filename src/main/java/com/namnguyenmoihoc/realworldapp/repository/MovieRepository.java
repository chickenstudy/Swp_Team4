package com.namnguyenmoihoc.realworldapp.repository;

import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.namnguyenmoihoc.realworldapp.entity.Movie;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOResponse;

@Repository
public interface MovieRepository extends JpaRepository<Movie ,Integer>{

   
    
}
