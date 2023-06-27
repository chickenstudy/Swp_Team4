package com.namnguyenmoihoc.realworldapp.model.user.mapper;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;

import com.namnguyenmoihoc.realworldapp.entity.Movie;
import com.namnguyenmoihoc.realworldapp.entity.Account;
import com.namnguyenmoihoc.realworldapp.model.user.dto.UserDTOCreateAccount;
import com.namnguyenmoihoc.realworldapp.model.user.dto.UserDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.user.dto.UserDTOUpdateAccount;

public class UserMapper {
    public static UserDTOResponse toUserDTOResponse(Account user) {
        
        String decodedStringPicture = new String(user.getPicture());

        return UserDTOResponse.builder().username(user.getUsername()).email(user.getEmail()).picture(decodedStringPicture).roleID(user.getRolesID())
                .build();
    }

    public static Account toUser(UserDTOCreateAccount userDTOCreateAccount) {
        String picture = userDTOCreateAccount.getPicture();

        try {
            String encodePictureStr = Base64.getEncoder().encodeToString(picture.getBytes("ASCII"));
            byte[] decodePicture = Base64.getDecoder().decode(encodePictureStr); // string to byte[]

            return Account.builder().username(userDTOCreateAccount.getUsername()).email(userDTOCreateAccount.getEmail())
                .password(userDTOCreateAccount.getPassword()).picture(decodePicture).address(userDTOCreateAccount.getAddress())
                .sex(userDTOCreateAccount.getSex()).phonenumber(userDTOCreateAccount.getPhoneNumber())
                .rolesID(Integer.parseInt("3")).dob(userDTOCreateAccount.getDob()).build();
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }
        return null;
    }

    public static Account toUpdateUser(UserDTOUpdateAccount userDTOUpdateAccount) {
        byte[] image = Base64.getDecoder().decode(userDTOUpdateAccount.getPicture());

        if (image.length == 0) {
            image = Base64.getDecoder().decode("NoImage");
        }

        return Account.builder().id(userDTOUpdateAccount.getId()).username(userDTOUpdateAccount.getUsername())
                .email(userDTOUpdateAccount.getEmail()).password(userDTOUpdateAccount.getPassword())
                .picture(image)
                .address(userDTOUpdateAccount.getAddress()).sex(userDTOUpdateAccount.getSex())
                .phonenumber(userDTOUpdateAccount.getPhonenumber()).rolesID(Integer.parseInt("3"))
                .dob(userDTOUpdateAccount.getDob()).build();
    }

    public static UserDTOUpdateAccount toUpdateUserResponse(Account user) {
        String image = Base64.getEncoder().encodeToString(user.getPicture());

        return UserDTOUpdateAccount.builder().username(user.getUsername()).email(user.getEmail())
                .password(user.getPassword()).picture(image).address(user.getAddress()).sex(user.getSex())
                .phonenumber(user.getPhonenumber()).dob(user.getDob()).build();
    }

}
