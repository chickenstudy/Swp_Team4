package com.namnguyenmoihoc.realworldapp.model.cinema;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class CinemaDTOResponseNoId {
    
    private String name;
    private String location;

}