package com.namnguyenmoihoc.realworldapp.model.staff;

import java.time.LocalDateTime;

import com.namnguyenmoihoc.realworldapp.entity.OrderDetail;
import com.namnguyenmoihoc.realworldapp.entity.Seat;
import com.namnguyenmoihoc.realworldapp.entity.Showtime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ListTicketBuyedForStaff {
    private int ticketid;

    private LocalDateTime createddate;

    private Seat seatid;

    private Showtime showtimeid;

    private OrderDetail orderid;

    private String ticketcode;
    private byte ticketactive;
}
