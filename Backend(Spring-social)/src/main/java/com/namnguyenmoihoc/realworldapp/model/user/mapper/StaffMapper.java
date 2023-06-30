package com.namnguyenmoihoc.realworldapp.model.user.mapper;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import com.namnguyenmoihoc.realworldapp.entity.Account;
import com.namnguyenmoihoc.realworldapp.model.profileAccount.ProfileDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.staff.StaffDTOCreate;
import com.namnguyenmoihoc.realworldapp.model.staff.StaffDTOResponse;

public class StaffMapper {
    public static ProfileDTOResponse toStaffResponse(Account staff) {
                String decodedStringPicture = new String(staff.getPicture());

        ProfileDTOResponse profileDTOResponsive = ProfileDTOResponse.builder().address(staff.getAddress())
                .email(staff.getEmail()).phonenumber(staff.getPhonenumber()).id(staff.getId())
                .picture(decodedStringPicture).sex(checkSex(staff)).username(staff.getUsername()).dob(staff.getDob())
                .build();
        return profileDTOResponsive;
    }

    private static String checkSex(Account staff) {
        String sexString = "Male";
        int sex = (int) (staff.getSex());
        if (sex == 0) {
            return sexString = "Female";
        }
        return sexString;
    }

    public static Account toStaff(StaffDTOCreate staffDTOCreateAccount) {
        String picture = staffDTOCreateAccount.getPicture();

        try {
            String encodePictureStr = Base64.getEncoder().encodeToString(picture.getBytes("ASCII"));
            byte[] decodePicture = Base64.getDecoder().decode(encodePictureStr); // string to byte[]

            return Account.builder().username(staffDTOCreateAccount.getUsername())
                    .id(staffDTOCreateAccount.getId())
                    .email(staffDTOCreateAccount.getEmail())
                    .password(staffDTOCreateAccount.getPassword()).picture(decodePicture)
                    .address(staffDTOCreateAccount.getAddress())
                    .sex(staffDTOCreateAccount.getSex()).phonenumber(staffDTOCreateAccount.getPhonenumber())
                    .rolesID(Integer.parseInt("2")).dob(staffDTOCreateAccount.getDob()).build();
        } catch (Exception e) {

            e.printStackTrace();
        }
        return null;
    }

    public static void updateStaffDetails(Account staff, StaffDTOCreate staffDTOUpdate) {

        String picture = staffDTOUpdate.getPicture();
        try {
            String encodePosterStr = Base64.getEncoder().encodeToString(picture.getBytes("ASCII"));

            byte[] decodePicture = Base64.getDecoder().decode(encodePosterStr); // string to byte[]
            staff.setId(staffDTOUpdate.getId());
            staff.setPicture(decodePicture);
            staff.setAddress(staffDTOUpdate.getAddress());
            staff.setUsername(staffDTOUpdate.getUsername());
            staff.setDob(staffDTOUpdate.getDob());
            staff.setPhonenumber(staffDTOUpdate.getPhonenumber());
            staff.setEmail(staffDTOUpdate.getEmail());
            staff.setSex(staffDTOUpdate.getSex());
            staff.setRolesID(Integer.parseInt("2"));
       

        } catch (Exception e) {

            e.printStackTrace();

        }

    }

    public static Map<String, StaffDTOResponse> buidDTOUpdateResponse(Account staff) {
        String picture = Base64.getEncoder().encodeToString(staff.getPicture());

        Map<String, StaffDTOResponse> wrapper = new HashMap<>();
        StaffDTOResponse staffDTOResponse = StaffDTOResponse.builder()
                .id(staff.getId())
                .address(staff.getAddress())
                .picture(picture)
                .dob(staff.getDob())
                .username(staff.getUsername())
                .phonenumber(staff.getPhonenumber())
               

                .sex(staff.getSex())
                .email(staff.getEmail())

                .build();

        wrapper.put("update", staffDTOResponse);
        return wrapper;
    }

}
