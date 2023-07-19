package com.namnguyenmoihoc.realworldapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.namnguyenmoihoc.realworldapp.entity.Seat;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;


@Repository
public interface SeatRepositorty extends JpaRepository<Seat, Integer> {
    Optional<Seat> findBySeatid(int seatid);
}