package com.namnguyenmoihoc.realworldapp.controller;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;
import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTOCreate;
import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTOResponse;
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

    @GetMapping("/listShowtime")
    public List<ShowtimeDTOResponse> getListShowtime() {
        return showtimeService.getListShowtime();
    }

    @PutMapping("/updateShowtime/{showtimeid}")
    public Map<String, ShowtimeDTOResponseNoID> getUpdateShowtime(@PathVariable(value = "showtimeid") int showtimeId,
            @RequestBody ShowtimeDTOCreate showtimeDTOCreate)
            throws CustomNotFoundException {
        showtimeDTOCreate.setShowtimeid(showtimeId);

        return showtimeService.getUpdateShowtime(showtimeDTOCreate);
    }

    @DeleteMapping("/deleteShowtime/{showtimeid}")
    public void deleteShowtime(@PathVariable(value = "showtimeid") int showtimeId)
            throws CustomNotFoundException {

        showtimeService.getDeleteShowtime(showtimeId);

    }
}
