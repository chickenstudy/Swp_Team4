package com.namnguyenmoihoc.realworldapp.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.namnguyenmoihoc.realworldapp.entity.Cinema;

@Repository
public interface CinemaRepository extends JpaRepository<Cinema , Integer>{

    
}