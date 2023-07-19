package com.namnguyenmoihoc.realworldapp.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.namnguyenmoihoc.realworldapp.entity.Account;
import com.namnguyenmoihoc.realworldapp.entity.BookTicket;
import com.namnguyenmoihoc.realworldapp.model.ticket.TicketDTO;
import com.namnguyenmoihoc.realworldapp.model.ticket.TicketDTORequest;
import com.namnguyenmoihoc.realworldapp.model.user.dto.UserDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.user.mapper.UserMapper;
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
        // TODO Auto-generated method stub
        return ticketRepository.findBookTicketsByAccountid(userId);
                //.stream().map(ticket -> modelMapper.map(ticket,TicketDTO.class))
                //.collect(Collectors.toList());
    }
    
}
