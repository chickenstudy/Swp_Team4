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

public class ShowtimeDTOCreate {

    private Integer movieid; // Khóa ngoại tham chiếu đến bảng Movie
    private Integer cinemaid; // Khóa ngoại tham chiếu đến bảng Cinema
    private String startdate;
    private String starttime;;

}