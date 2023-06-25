package com.namnguyenmoihoc.realworldapp.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;



import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.namnguyenmoihoc.realworldapp.exception.custom.CustomBadRequestException;
import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;
import com.namnguyenmoihoc.realworldapp.model.roles.UserRolesDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.user.dto.UserDTOCreateAccount;
import com.namnguyenmoihoc.realworldapp.model.user.dto.UserDTOLoginRequest;
import com.namnguyenmoihoc.realworldapp.model.user.dto.UserDTOResponse;
import com.namnguyenmoihoc.realworldapp.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin
public class UserController {
    private final UserService userService;

    @PostMapping("/login")
    public Map<String, UserDTOResponse> login(@RequestBody Map<String, UserDTOLoginRequest> userloginRequestMap) throws CustomBadRequestException, CustomNotFoundException{
        return userService.authenticate(userloginRequestMap);
    }

    @PostMapping("/register")
    public Map<String, UserDTOResponse> register(
        @RequestBody Map<String, UserDTOCreateAccount> userRegisterRequestMap) throws SQLException, IOException, CustomNotFoundException{
        System.out.println(userRegisterRequestMap);
            return userService.registerUser(userRegisterRequestMap);
    }

    @GetMapping("/user/role")
    public List<UserRolesDTOResponse> getRole() {
        return userService.getRole();
    }

    @GetMapping("/user")
    public Map<String, UserDTOResponse> getCurrentUser() throws CustomNotFoundException{
        return userService.getCurrentUser();
    }
}
