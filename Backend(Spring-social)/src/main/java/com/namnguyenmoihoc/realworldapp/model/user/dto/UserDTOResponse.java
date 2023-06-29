package com.namnguyenmoihoc.realworldapp.model.user.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserDTOResponse {
    private int userId;
    private String email;
    private String username;
    private int roleID;
    private String picture;
    private String token;
}
