package com.namnguyenmoihoc.realworldapp.model.orderDetails;

import java.time.LocalDateTime;
import java.util.List;

import com.namnguyenmoihoc.realworldapp.entity.Account;
import com.namnguyenmoihoc.realworldapp.model.ticket.TicketDTO;

import lombok.Data;

@Data
public class OrderDetailsDTO {
    private int id;
    private LocalDateTime purchasedate;
    private float total;
    private Account user;

    private List<TicketDTO> listTickets;
    
}
