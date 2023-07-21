package com.namnguyenmoihoc.realworldapp.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.namnguyenmoihoc.realworldapp.entity.BookTicket;
import com.namnguyenmoihoc.realworldapp.model.ticket.TicketDTO;
import com.namnguyenmoihoc.realworldapp.model.ticket.TicketDTORequest;

public interface TicketService {
    public List<BookTicket> getTicketsByUserId(Integer userId);


}
