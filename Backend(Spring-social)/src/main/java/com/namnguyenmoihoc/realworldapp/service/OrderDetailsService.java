package com.namnguyenmoihoc.realworldapp.service;

import java.util.List;
import java.util.Map;

import com.namnguyenmoihoc.realworldapp.entity.BookTicket;
import com.namnguyenmoihoc.realworldapp.model.booking.BookingDTO;
import com.namnguyenmoihoc.realworldapp.model.booking.BookingRequestDTO;

public interface OrderDetailsService {
    Map<String, List<BookTicket>> createNewOrder(BookingDTO bookingDTO) throws RuntimeException;
}
