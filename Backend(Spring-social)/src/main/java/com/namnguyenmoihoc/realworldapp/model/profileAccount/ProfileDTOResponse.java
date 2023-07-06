package com.namnguyenmoihoc.realworldapp.model.profileAccount;


import java.util.Date;


import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Builder
@Getter
@Setter
public class ProfileDTOResponse {
    private int id;
    private String username;
    private String email;
    private String sex;
    private String address;
    private String picture;
    private String phonenumber;
    private Date dob;
}
