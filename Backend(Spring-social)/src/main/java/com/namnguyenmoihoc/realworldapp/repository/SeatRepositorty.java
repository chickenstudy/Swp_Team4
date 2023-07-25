package com.namnguyenmoihoc.realworldapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.namnguyenmoihoc.realworldapp.entity.Seat;


@Repository
public interface SeatRepositorty extends JpaRepository<Seat, Integer> {
    Optional<Seat> findBySeatid(int seatid);
}