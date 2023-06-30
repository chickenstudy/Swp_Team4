package com.namnguyenmoihoc.realworldapp.controller;

import java.io.UnsupportedEncodingException;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTOCreate;

import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTOResponseNoID;
import com.namnguyenmoihoc.realworldapp.service.ShowtimeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/showtime")
@RequiredArgsConstructor
@CrossOrigin
public class ShowtimeController {
    private final ShowtimeService showtimeService;

    @PostMapping("/create")
    public Map<String, ShowtimeDTOResponseNoID> createShowtime(
            @RequestBody Map<String, ShowtimeDTOCreate> showtimeDTOCreate) throws UnsupportedEncodingException {
        return showtimeService.createShowtime(showtimeDTOCreate);
    }

}
