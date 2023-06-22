package com.namnguyenmoihoc.realworldapp.model.user.dto;

import java.util.Date;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDTOCreateAccount {
    private String username;
    private String email;
    private String password;
    private byte sex;
    private String address;
    private String picture;
    private String phoneNumber;
    private Date dob;
}
