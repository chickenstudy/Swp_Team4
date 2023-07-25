package com.namnguyenmoihoc.realworldapp.service;

import java.util.List;

import com.namnguyenmoihoc.realworldapp.entity.BookTicket;


public interface TicketService {
    public List<BookTicket> getTicketsByUserId(Integer userId);


}
