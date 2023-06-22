package com.namnguyenmoihoc.realworldapp.model.profileAccount;

import java.util.Date;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProfileDTOResponsive {
    private String username;
    private String email;
    private String sex;
    private String address;
    private String picture;
    private String phonenumber;
    private Date dob;
}
