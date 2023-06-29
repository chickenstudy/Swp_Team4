package com.namnguyenmoihoc.realworldapp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;
import com.namnguyenmoihoc.realworldapp.model.profileAccount.ProfileDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.user.dto.UserDTOUpdateAccount;
import com.namnguyenmoihoc.realworldapp.service.UserService;

import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


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
        System.out.println(userDTOUpdateAccount);
        userDTOUpdateAccount.setId(userid);
        return userService.getUpdateAccount(userDTOUpdateAccount);
    }

}
