package com.namnguyenmoihoc.realworldapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.namnguyenmoihoc.realworldapp.entity.Seat;
import org.springframework.stereotype.Repository;

@Repository
public interface SeatRepositorty extends JpaRepository<Seat, Integer> {

}