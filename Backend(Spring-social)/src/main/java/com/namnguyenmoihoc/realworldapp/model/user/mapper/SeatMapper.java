package com.namnguyenmoihoc.realworldapp.model.user.mapper;

import com.namnguyenmoihoc.realworldapp.entity.Seat;
import com.namnguyenmoihoc.realworldapp.model.seat.SeatDTOResponse;

public class SeatMapper {

    public static SeatDTOResponse toSeatDTOReponse(Seat seat) {
        return SeatDTOResponse.builder()
                .seatid(seat.getSeatid())
                .row(seat.getRow())
                .col(seat.getCol())
                .price(seat.getPrice())
                .active(seat.getActive())

                .build();
    }

}
