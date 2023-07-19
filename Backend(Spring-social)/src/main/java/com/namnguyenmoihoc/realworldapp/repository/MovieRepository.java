package com.namnguyenmoihoc.realworldapp.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.namnguyenmoihoc.realworldapp.entity.Movie;


@Repository
public interface MovieRepository extends JpaRepository<Movie ,Integer>{

    public Optional<Movie> findByMovieid(int movieid);

    public Object findByName(String movieName);
    

    
}
