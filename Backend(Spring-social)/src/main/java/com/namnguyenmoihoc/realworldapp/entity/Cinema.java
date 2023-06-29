package com.namnguyenmoihoc.realworldapp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Entity
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

@Table(name = "cinema")
public class Cinema {
    @Id
    private  int cinemaid;
    private  String name;
    private  String location;

    
}
