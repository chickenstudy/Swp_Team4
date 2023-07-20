package com.namnguyenmoihoc.realworldapp.exception.custom;

import java.util.HashMap;
import java.util.Map;

import com.namnguyenmoihoc.realworldapp.model.user.CustomError;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Success {
    private Map<String, CustomError> successMessage;

    public Success(CustomError customError) {
        this.successMessage = new HashMap<>();
        this.successMessage.put("message", customError);
    }
}
