package com.namnguyenmoihoc.realworldapp.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.namnguyenmoihoc.realworldapp.exception.custom.ChangePasswordMessage;
import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;
import com.namnguyenmoihoc.realworldapp.model.profileAccount.ProfileDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.user.dto.AccountDTONewPassword;
import com.namnguyenmoihoc.realworldapp.model.user.dto.UserDTOResponseEmail;
import com.namnguyenmoihoc.realworldapp.model.user.dto.UserDTOUpdateAccount;
import com.namnguyenmoihoc.realworldapp.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user/profiles")
@CrossOrigin
public class ProfileController {
    private final UserService userService;

    @GetMapping("/{userid}")
    public Map<String, ProfileDTOResponse> getProfile(@PathVariable("userid") int userid)
            throws CustomNotFoundException {
        return userService.getProfile(userid);
    }

    @PutMapping("/update/{userid}")
    public Map<String, ProfileDTOResponse> getUpdateAccount(@PathVariable int userid,
            @RequestBody UserDTOUpdateAccount userDTOUpdateAccount)
            throws CustomNotFoundException, IOException {
        userDTOUpdateAccount.setId(userid);
        return userService.getUpdateAccount(userDTOUpdateAccount);
    }

    @PutMapping("/update/changepassword/{userid}")
    public  Map<String, ChangePasswordMessage> changePassword(@PathVariable int userid, @RequestBody AccountDTONewPassword accountNewPassword)
            throws CustomNotFoundException, IOException {
        return userService.changePassword(userid, accountNewPassword);
    }

    @GetMapping("/userid")
    public UserDTOResponseEmail getUserIdByEmail(@RequestParam("email") String email) throws CustomNotFoundException {      
        return userService.getUserIdByEmail(email);
    }

}
