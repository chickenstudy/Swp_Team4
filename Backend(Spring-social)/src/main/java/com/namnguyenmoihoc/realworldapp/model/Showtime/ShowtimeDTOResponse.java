package com.namnguyenmoihoc.realworldapp.model.Showtime;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class ShowtimeDTOResponse {
    private int showtimeid;
    private String starttime;
    private String endtime;

}