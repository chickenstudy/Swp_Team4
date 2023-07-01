package com.namnguyenmoihoc.realworldapp.model.user.mapper;

import java.util.HashMap;
import java.util.Map;

import com.namnguyenmoihoc.realworldapp.entity.Showtime;
import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTOCreate;
import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.Showtime.ShowtimeDTOResponseNoID;
import com.namnguyenmoihoc.realworldapp.model.cinema.CinemaDTOResponseNoId;

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

    public static ShowtimeDTOResponse toMovieDTOReponse(Showtime showtime) {
        return ShowtimeDTOResponse.builder()
                .showtimeid(showtime.getShowtimeid())
                .starttime(showtime.getStarttime())
                .endtime(showtime.getEndtime())
                .build();
    }

    public static void updateShowtimeDetails(Showtime showtime, ShowtimeDTOCreate showtimeDTOCreate) {
        
        showtime.setStarttime(showtimeDTOCreate.getStarttime());
        showtime.setEndtime(showtimeDTOCreate.getEndtime());
    }

    public static Map<String, ShowtimeDTOResponseNoID> toMovieDTOReponseUpdate(Showtime showtime) {
         Map<String, ShowtimeDTOResponseNoID> wrapper = new HashMap<>();
        ShowtimeDTOResponseNoID showtimeDTOResponse = ShowtimeDTOResponseNoID.builder()

                .starttime(showtime.getStarttime())
                .endtime(showtime.getEndtime())
                .build();

       wrapper.put("update", showtimeDTOResponse);
        return wrapper;
    }

}
