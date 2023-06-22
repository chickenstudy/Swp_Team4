package com.namnguyenmoihoc.realworldapp.exception.custom;

import com.namnguyenmoihoc.realworldapp.model.user.CustomError;

public class CustomBadRequestException extends BaseCustomException{

    public CustomBadRequestException(CustomError customError) {
        super(customError);
        //TODO Auto-generated constructor stub
    }
    
}
