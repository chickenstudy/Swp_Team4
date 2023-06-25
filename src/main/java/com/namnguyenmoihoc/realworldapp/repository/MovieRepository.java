package com.namnguyenmoihoc.realworldapp.repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.namnguyenmoihoc.realworldapp.entity.Account;
import com.namnguyenmoihoc.realworldapp.entity.Movie;
import com.namnguyenmoihoc.realworldapp.entity.Roles;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOResponse;

@Repository
public interface MovieRepository extends JpaRepository<Movie ,Integer>{

    public Optional<Movie> findByMovieid(int movieid);
    

    
}
