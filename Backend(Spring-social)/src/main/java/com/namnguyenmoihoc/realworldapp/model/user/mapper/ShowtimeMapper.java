package com.namnguyenmoihoc.realworldapp.model.user.mapper;

import com.namnguyenmoihoc.realworldapp.entity.Showtime;
import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTOCreate;

import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTOResponseNoID;

public class ShowtimeMapper {

    public static Showtime toShowtime(ShowtimeDTOCreate showDTOcreateMap) {
        Showtime showtime = Showtime.builder()
                .showtimeid(showDTOcreateMap.getShowtimeid())
                .starttime(showDTOcreateMap.getStarttime())

                .endtime(showDTOcreateMap.getEndtime())

                .build();
        return showtime;
    }

    public static ShowtimeDTOResponseNoID toMovieDTOReponseNoID(Showtime showtime) {
        return ShowtimeDTOResponseNoID.builder()
                .starttime(showtime.getStarttime())
                .endtime(showtime.getEndtime())

                .build();
    }

}
