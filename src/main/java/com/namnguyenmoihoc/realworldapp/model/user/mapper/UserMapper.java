package com.namnguyenmoihoc.realworldapp.model.user.mapper;

import com.namnguyenmoihoc.realworldapp.entity.User;
import com.namnguyenmoihoc.realworldapp.model.user.dto.UserDTOCreateAccount;
import com.namnguyenmoihoc.realworldapp.model.user.dto.UserDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.user.dto.UserDTOUpdateAccount;

public class UserMapper {
    public static UserDTOResponse toUserDTOResponse(User user){
        return UserDTOResponse.builder().
        username(user.getUsername()).
        email(user.getEmail()).
        roleID(user.getRolesID()).
        build();
    }

    public static User toUser(UserDTOCreateAccount userDTOCreateAccount) {
        return User.builder().
        username(userDTOCreateAccount.getUsername()).
        email(userDTOCreateAccount.getEmail()).
        password(userDTOCreateAccount.getPassword()).
        picture(userDTOCreateAccount.getPicture()).
        address(userDTOCreateAccount.getAddress()).
        sex(userDTOCreateAccount.getSex()).
        phonenumber(userDTOCreateAccount.getPhoneNumber()).
        rolesID(Integer.parseInt("3")).
        dob(userDTOCreateAccount.getDob()).
        build();
    }

    public static User toUpdateUser(UserDTOUpdateAccount userDTOUpdateAccount) {
        return User.builder().
        id(userDTOUpdateAccount.getId()).
        username(userDTOUpdateAccount.getUsername()).
        email(userDTOUpdateAccount.getEmail()).
        password(userDTOUpdateAccount.getPassword()).
        picture(userDTOUpdateAccount.getPicture()).
        address(userDTOUpdateAccount.getAddress()).
        sex(userDTOUpdateAccount.getSex()).
        phonenumber(userDTOUpdateAccount.getPhonenumber()).
        rolesID(Integer.parseInt("3")).
        dob(userDTOUpdateAccount.getDob()).
        build();
    }

    public static UserDTOUpdateAccount toUpdateUserResponse(User user) {
        return UserDTOUpdateAccount.builder().
        username(user.getUsername()).
        email(user.getEmail()).
        password(user.getPassword()).
        picture(user.getPicture()).
        address(user.getAddress()).
        sex(user.getSex()).
        phonenumber(user.getPhonenumber()).
        dob(user.getDob()).
        build();
    }

    

    
}
