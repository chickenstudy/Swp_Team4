package com.namnguyenmoihoc.realworldapp.model.user.mapper;

import com.namnguyenmoihoc.realworldapp.entity.Account;
import com.namnguyenmoihoc.realworldapp.model.profileAccount.ProfileDTOResponsive;


public class StaffMapper {
    public static ProfileDTOResponsive toStaffResponse(Account staff){
        ProfileDTOResponsive profileDTOResponsive = ProfileDTOResponsive.builder().address(staff.getAddress())
                .email(staff.getEmail()).phonenumber(staff.getPhonenumber())
                .picture(staff.getPicture()).sex(checkSex(staff)).username(staff.getUsername()).dob(staff.getDob()).build();
                return profileDTOResponsive;
    }

    private static String checkSex(Account user) {
        String sexString = "Male";
        int sex = (int)(user.getSex());
        if (sex == 0) {
            return sexString = "Female";
        }
        return sexString;
    }
}
