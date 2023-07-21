package com.namnguyenmoihoc.realworldapp.exception.custom;

import com.namnguyenmoihoc.realworldapp.model.user.CustomError;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;



public class ChangePasswordMessage extends Success{

    public ChangePasswordMessage(CustomError customError) {
        super(customError);
        //TODO Auto-generated constructor stub
    }
    
}
