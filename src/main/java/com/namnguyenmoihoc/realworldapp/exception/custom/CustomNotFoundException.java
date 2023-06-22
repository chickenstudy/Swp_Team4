package com.namnguyenmoihoc.realworldapp.exception.custom;

import com.namnguyenmoihoc.realworldapp.model.user.CustomError;

public class CustomNotFoundException extends BaseCustomException{
    public CustomNotFoundException(CustomError customError) {
        super(customError);
        //TODO Auto-generated constructor stub
    }
}
