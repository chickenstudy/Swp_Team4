package com.namnguyenmoihoc.realworldapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.namnguyenmoihoc.realworldapp.entity.Showtime;

public interface ShowtimeRepository extends JpaRepository<Showtime, Integer> {
   
  
}
