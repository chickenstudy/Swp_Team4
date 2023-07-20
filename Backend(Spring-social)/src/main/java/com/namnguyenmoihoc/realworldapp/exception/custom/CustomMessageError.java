package com.namnguyenmoihoc.realworldapp.exception.custom;

import com.namnguyenmoihoc.realworldapp.model.user.CustomError;

public class CustomMessageError extends BaseCustomException{
    public CustomMessageError(CustomError customError) {
        super(customError);
        //TODO Auto-generated constructor stub
    }
}
