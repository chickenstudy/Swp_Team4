package com.namnguyenmoihoc.realworldapp.model.ticket;

import java.time.LocalDateTime;

import com.namnguyenmoihoc.realworldapp.entity.Cinema;
import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTO;
import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTOForTicket;
import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.orderDetails.OrderDetailsDTO;
import com.namnguyenmoihoc.realworldapp.model.seat.SeatDTOResponse;

import lombok.Data;

@Data
public class TicketDTO {
    private int id;
    private LocalDateTime createddate;

    private ShowtimeDTOForTicket showtime;
    private SeatDTOResponse seat;

    private String ticketcode;
    private byte ticketactive;

    private OrderDetailsDTO bill;
}
