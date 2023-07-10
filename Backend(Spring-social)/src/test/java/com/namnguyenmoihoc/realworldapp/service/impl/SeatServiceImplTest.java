package com.namnguyenmoihoc.realworldapp.service.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;


import com.namnguyenmoihoc.realworldapp.entity.Seat;

import com.namnguyenmoihoc.realworldapp.model.seat.SeatDTOResponse;

import com.namnguyenmoihoc.realworldapp.repository.SeatRepositorty;

@SpringBootTest
public class SeatServiceImplTest {
    
    @InjectMocks
    private SeatServiceImpl seatService;

    @Mock
    private SeatRepositorty seatRepository;

    @Test
    void testGetListSeats() {
          Seat seat1 = new Seat();
        seat1.setSeatid(1);;
        seat1.setPrice(10000);
        seat1.setCol("A");
        seat1.setRow("1");
        
  Seat seat2 = new Seat();
        seat2.setSeatid(2);;
        seat2.setPrice(10000);
        seat2.setCol("B");
        seat2.setRow("2");

        // Create a list of cinema objects
        List<Seat> listSeat = new ArrayList<>();
        listSeat.add(seat1);
        listSeat.add(seat2);

        // Set up the mock behavior for the cinema repository
        when(seatRepository.findAll()).thenReturn(listSeat);

        // Call the getListCinemas() method to test
        List<SeatDTOResponse> result = seatService.getListSeats();

        // Check the result
        assertNotNull(result);
        assertEquals(2, result.size()); // Check that the result list has 2 elements

        SeatDTOResponse seatDTO1 = result.get(0);
        assertNotNull(seatDTO1);
        assertEquals(seat1.getSeatid(), seatDTO1.getSeatid());
        assertEquals(seat1.getPrice(), seatDTO1.getPrice());
        assertEquals(seat1.getCol(), seatDTO1.getCol());
         assertEquals(seat1.getRow(), seatDTO1.getRow());


          SeatDTOResponse seatDTO2 = result.get(1);
        assertNotNull(seatDTO2);
        assertEquals(seat2.getSeatid(), seatDTO2.getSeatid());
        assertEquals(seat2.getPrice(), seatDTO2.getPrice());
        assertEquals(seat2.getCol(), seatDTO2.getCol());
         assertEquals(seat2.getRow(), seatDTO2.getRow());

    }
}
