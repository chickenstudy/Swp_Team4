package com.namnguyenmoihoc.realworldapp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name= "seat")
public class Seat {
    @Id
    private int seatid;
    private String row;
    private String col;
    private float price;
    private byte active;
    
}
