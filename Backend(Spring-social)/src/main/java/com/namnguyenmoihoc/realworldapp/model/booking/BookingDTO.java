package com.namnguyenmoihoc.realworldapp.model.booking;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingDTO {
    private Integer userId;
    private Integer showtimeId;
    private List<Integer> listSeatIds;
}
