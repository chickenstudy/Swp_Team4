package com.namnguyenmoihoc.realworldapp.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TokenPayload {
    private int userID;
    private String email;
}
