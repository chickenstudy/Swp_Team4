package com.namnguyenmoihoc.realworldapp.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.namnguyenmoihoc.realworldapp.entity.BookTicket;
import com.namnguyenmoihoc.realworldapp.exception.custom.CustomMessageError;
import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;
import com.namnguyenmoihoc.realworldapp.model.booking.BookingDTO;
import com.namnguyenmoihoc.realworldapp.model.booking.BookingRequestDTO;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOCreate;

import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOResponseCreate;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOUpdate;
import com.namnguyenmoihoc.realworldapp.model.user.CustomError;
import com.namnguyenmoihoc.realworldapp.service.MovieService;
import com.namnguyenmoihoc.realworldapp.service.OrderDetailsService;

import lombok.RequiredArgsConstructor;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/order/bills")
public class OrderDetailsController {

    @Autowired
    private OrderDetailsService orderDetailsService;

    @PutMapping("/createbills")
    public Map<String, List<BookTicket>> createNewOrder(@RequestBody BookingRequestDTO bookingRequestDTO)
            throws CustomMessageError {
        System.out.println(bookingRequestDTO);
        List<Integer> seat = parseStringToList(bookingRequestDTO.getListSeatIds());
        BookingDTO lBookingDTO = new BookingDTO();
        lBookingDTO.setShowtimeId(bookingRequestDTO.getShowtimeId());
        lBookingDTO.setListSeatIds(seat);
        System.out.println(lBookingDTO);
        return orderDetailsService.createNewOrder(lBookingDTO);
        /*
         * try {
         * return orderDetailsService.createNewOrder(lBookingDTO);
         * } catch (RuntimeException e) {
         * throw new CustomMessageError(CustomError.builder().code("404")
         * .message("Error booking ticket, please wait a few seconds!!!").build());
         * }
         */
    }

    private List<Integer> parseStringToList(String input) {
        List<Integer> list = new ArrayList<>();
        String[] elements = input.substring(1, input.length() - 1).split(",");

        for (String element : elements) {
            int number = Integer.parseInt(element.trim());
            list.add(number);
        }

        return list;
    }

}
