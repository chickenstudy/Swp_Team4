package com.namnguyenmoihoc.realworldapp.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.sql.rowset.serial.SerialBlob;
import javax.sql.rowset.serial.SerialException;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.namnguyenmoihoc.realworldapp.entity.Roles;
import com.namnguyenmoihoc.realworldapp.entity.User;
import com.namnguyenmoihoc.realworldapp.exception.custom.CustomBadRequestException;
import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;
import com.namnguyenmoihoc.realworldapp.model.profileAccount.ProfileDTOResponsive;
import com.namnguyenmoihoc.realworldapp.model.roles.UserRolesDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.user.CustomError;
import com.namnguyenmoihoc.realworldapp.model.user.dto.UserDTOCreateAccount;
import com.namnguyenmoihoc.realworldapp.model.user.dto.UserDTOLoginRequest;
import com.namnguyenmoihoc.realworldapp.model.user.dto.UserDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.user.dto.UserDTOUpdateAccount;
import com.namnguyenmoihoc.realworldapp.model.user.mapper.RoleMapper;
import com.namnguyenmoihoc.realworldapp.model.user.mapper.UserMapper;
import com.namnguyenmoihoc.realworldapp.repository.RoleRepository;
import com.namnguyenmoihoc.realworldapp.repository.UserRepository;
import com.namnguyenmoihoc.realworldapp.service.UserService;
import com.namnguyenmoihoc.realworldapp.util.JWTTokenUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JWTTokenUtil jwtTokenUtil;
    private final PasswordEncoder passwordEncoder;

    private final RoleRepository roleRepository;

    @Override
    public Map<String, UserDTOResponse> authenticate(Map<String, UserDTOLoginRequest> userloginRequestMap)
            throws CustomBadRequestException, CustomNotFoundException {
        // TODO Auto-generated method stub
        UserDTOLoginRequest userDTOLoginRequest = userloginRequestMap.get("user");

        Optional<User> userOptional = userRepository.findByEmail(userDTOLoginRequest.getEmail());
        if(!userOptional.isPresent()){
            throw new CustomNotFoundException(CustomError.builder().code("404").message("Your email is not registered").build());
        }

        boolean isAuthen = false;
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(userDTOLoginRequest.getPassword(), user.getPassword())) {
                isAuthen = true;
                // System.out.println("Username and password correct");

            }
        }
        if (!isAuthen) {
            throw new CustomBadRequestException(
                    CustomError.builder().code("400").message("Email or password incorrect").build());
            // System.out.println("Username and password incorrect");
        }
        return buidDTOResponse(userOptional.get());
    }

    @Override
    public Map<String, UserDTOResponse> registerUser(Map<String, UserDTOCreateAccount> userRegisterRequestMap) throws SerialException, SQLException, IOException {
        // TODO Auto-generated method stub
        UserDTOCreateAccount userDTOCreateAccount = userRegisterRequestMap.get("user");

        /* 
        if (userDTOCreateAccount.getPicture().length() == 0 || userDTOCreateAccount.getPicture() == null) {
            userDTOCreateAccount.setPicture(new SerialBlob(new byte[0]));
        }
        */

        User user = UserMapper.toUser(userDTOCreateAccount);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user = userRepository.save(user);
        return buidDTOResponse(user);
    }

    private Map<String, UserDTOResponse> buidDTOResponse(User user) {
        Map<String, UserDTOResponse> wrapper = new HashMap<>();
        UserDTOResponse userDTOResponse = UserMapper.toUserDTOResponse(user);

        userDTOResponse.setToken(jwtTokenUtil.generateToken(user, 24 * 60 * 60));

        wrapper.put("user", userDTOResponse);

        return wrapper;
    }

    @Override
    public Map<String, UserDTOResponse> getCurrentUser() throws CustomNotFoundException {
        // TODO Auto-generated method stub
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            String email = ((UserDetails) principal).getUsername();
            User user = userRepository.findByEmail(email).get();
            return buidDTOResponse(user);
        }
        throw new CustomNotFoundException(CustomError.builder().code("404").message("User not found.").build());
    }

    @Override
    public List<UserRolesDTOResponse> getRole() {
        // TODO Auto-generated method stub
        List<Roles> roles = roleRepository.findAll();

        List<UserRolesDTOResponse> rolesDTO = new ArrayList<>();

        for (Roles role : roles) {
            rolesDTO.add(RoleMapper.toUserRoleDTOResponse(role));
        }
        return rolesDTO;
    }

    @Override
    public Map<String, ProfileDTOResponsive> getProfile(int userid) throws CustomNotFoundException {
        // TODO Auto-generated method stub
        Optional<User> userOptional = userRepository.findById(userid);
        if (userOptional.isEmpty()) {
            throw new CustomNotFoundException(CustomError.builder().code("404").message("User not found").build());
        }
        return buidProfileResponse(userOptional.get());
    }

    private Map<String, ProfileDTOResponsive> buidProfileResponse(User user) {
        Map<String, ProfileDTOResponsive> wrapper = new HashMap<>();

        ProfileDTOResponsive profileDTOResponsive = ProfileDTOResponsive.builder().address(user.getAddress())
                .email(user.getEmail()).phonenumber(user.getPhonenumber())
                .picture(user.getPicture()).sex(checkSex(user)).username(user.getUsername()).dob(user.getDob()).build();

        wrapper.put("profile", profileDTOResponsive);
        return wrapper;
    }

    private String checkSex(User user) {
        String sexString = "Male";
        int sex = (int)(user.getSex());
        if (sex == 0) {
            return sexString = "Female";
        }
        return sexString;
    }

    @Override
    public Map<String, ProfileDTOResponsive> getUpdateAccount(UserDTOUpdateAccount userDTOUpdateAccount)
            throws CustomNotFoundException, IOException {
        // TODO Auto-generated method stub
        Optional<User> userOptional = userRepository.findById(userDTOUpdateAccount.getId());
        
        if (userOptional.isEmpty()) {
            throw new CustomNotFoundException(CustomError.builder().code("404").message("User not found").build());
        }

        //return buidProfileResponse(userOptional.get());

        User user = UserMapper.toUpdateUser(userDTOUpdateAccount);
        System.out.println("profile:");
        System.out.println(user);
        user = userRepository.save(user);
        return buidProfileResponse(user);
    }

}
