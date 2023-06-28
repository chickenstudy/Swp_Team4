package com.namnguyenmoihoc.realworldapp.model.staff;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StaffDTOResponse {
    private int id;
    private String username;
    private String email;

    private byte sex;
    private String address;

    private String picture;
    private String phonenumber;
    private Date dob;

}
