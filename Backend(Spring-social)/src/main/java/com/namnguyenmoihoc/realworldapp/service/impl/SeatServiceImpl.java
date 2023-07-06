package com.namnguyenmoihoc.realworldapp.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.namnguyenmoihoc.realworldapp.entity.Seat;

import com.namnguyenmoihoc.realworldapp.model.seat.SeatDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.user.mapper.SeatMapper;

import com.namnguyenmoihoc.realworldapp.repository.SeatRepositorty;
import com.namnguyenmoihoc.realworldapp.service.SeatService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SeatServiceImpl implements SeatService {
    private final SeatRepositorty seatRepositorty;

    @Override
    public List<SeatDTOResponse> getListSeats() {
        List<Seat> listSeats = seatRepositorty.findAll();

        List<SeatDTOResponse> seatDTOResponse = new ArrayList<>();

        for (Seat seat : listSeats) {
            seatDTOResponse.add(SeatMapper.toSeatDTOReponse(seat));
        }
        return seatDTOResponse;

    }

}
