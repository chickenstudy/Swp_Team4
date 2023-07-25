package com.namnguyenmoihoc.realworldapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.namnguyenmoihoc.realworldapp.entity.BookTicket;
import com.namnguyenmoihoc.realworldapp.service.TicketService;

import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
@CrossOrigin
public class BookTicketController {
    @Autowired
    private TicketService ticketService;

    @GetMapping("/listBooking")
    public List<BookTicket> getTicketsByUserId(@RequestParam Integer userId){
        return ticketService.getTicketsByUserId(userId);
    }

    
    

}
