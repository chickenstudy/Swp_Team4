package com.namnguyenmoihoc.realworldapp.model.user;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CustomError {
    private String code;
    private String message;
    private String traces;
}
