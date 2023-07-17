package com.namnguyenmoihoc.realworldapp.controller;

import java.io.UnsupportedEncodingException;
import java.time.LocalDate;
import java.time.LocalTime;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.namnguyenmoihoc.realworldapp.entity.Showtime;
import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;
import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTO;
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

  @GetMapping("/starttime")
  public List<String> getStartTimes(@RequestParam Integer movieid, @RequestParam Integer cinemaid,
      @RequestParam String startdate) {
    return showtimeService.getStartTimes(movieid, cinemaid,LocalDate.parse(startdate));
  }
  @GetMapping
  public List<ShowtimeDTO> getSchedules(@RequestParam Integer movieid, @RequestParam Integer cinemaid,
                                        @RequestParam String startdate, @RequestParam String starttime) {
      return showtimeService.getSchedules(movieid, cinemaid, startdate, starttime);
  }

}
