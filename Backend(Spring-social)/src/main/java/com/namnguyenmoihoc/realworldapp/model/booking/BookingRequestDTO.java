package com.namnguyenmoihoc.realworldapp.model.booking;

import java.util.List;

import lombok.Data;

@Data
public class BookingRequestDTO {
    private Integer userId;
    private Integer showtimeId;
    private String listSeatIds;
}
