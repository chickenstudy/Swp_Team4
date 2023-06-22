package com.namnguyenmoihoc.realworldapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.namnguyenmoihoc.realworldapp.entity.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie ,Integer>{
    
}
