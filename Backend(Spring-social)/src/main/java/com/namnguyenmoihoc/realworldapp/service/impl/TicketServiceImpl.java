package com.namnguyenmoihoc.realworldapp.service.impl;


import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.namnguyenmoihoc.realworldapp.entity.BookTicket;
import com.namnguyenmoihoc.realworldapp.repository.TicketRepository;
import com.namnguyenmoihoc.realworldapp.repository.UserRepository;
import com.namnguyenmoihoc.realworldapp.service.TicketService;
import com.namnguyenmoihoc.realworldapp.util.JWTTokenUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TicketServiceImpl implements TicketService{

    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UserRepository userRepository;

    private final JWTTokenUtil jwtTokenUtil;
    
    @Override
    public List<BookTicket> getTicketsByUserId(Integer userId) {
      
        return ticketRepository.findBookTicketsByAccountid(userId);
              
    }
    
}
