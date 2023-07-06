package com.namnguyenmoihoc.realworldapp.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.namnguyenmoihoc.realworldapp.model.seat.SeatDTOResponse;
import com.namnguyenmoihoc.realworldapp.service.SeatService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/seat")
@CrossOrigin
@RequiredArgsConstructor
public class SeatController {
    private final SeatService seatService;

    @GetMapping("/listSeat")
    public List<SeatDTOResponse> getListSeats() {
        return seatService.getListSeats();
    }

}
