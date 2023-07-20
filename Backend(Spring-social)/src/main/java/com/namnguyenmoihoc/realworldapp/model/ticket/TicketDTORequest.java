package com.namnguyenmoihoc.realworldapp.model.ticket;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Builder
@Getter
@Setter
public class TicketDTORequest {
    private int showtimeid;
    private String seatid;
    private LocalDateTime createddate;
}
