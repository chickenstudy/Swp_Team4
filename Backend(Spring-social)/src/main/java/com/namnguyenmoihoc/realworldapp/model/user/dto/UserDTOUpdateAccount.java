package com.namnguyenmoihoc.realworldapp.model.user.dto;


import java.util.Date;


import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Builder
@Getter
@Setter
public class UserDTOUpdateAccount {
    private int id;
    private String username;
    private String email;
    private byte sex;
    private String address;

    private String picture;
    private String phonenumber;
    private Date dob;
}
