package com.namnguyenmoihoc.realworldapp.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.sql.rowset.serial.SerialException;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.namnguyenmoihoc.realworldapp.entity.Roles;
import com.namnguyenmoihoc.realworldapp.entity.Account;
import com.namnguyenmoihoc.realworldapp.exception.custom.CustomBadRequestException;
import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;
import com.namnguyenmoihoc.realworldapp.model.profileAccount.ProfileDTOResponse;
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

        Optional<Account> userOptional = userRepository.findByEmail(userDTOLoginRequest.getEmail());
        if (!userOptional.isPresent()) {
            throw new CustomNotFoundException(
                    CustomError.builder().code("404").message("Your email is not registered").build());
        }

        boolean isAuthen = false;
        if (userOptional.isPresent()) {
            Account user = userOptional.get();
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
    public Map<String, UserDTOResponse> registerUser(Map<String, UserDTOCreateAccount> userRegisterRequestMap)
            throws SerialException, SQLException, IOException, CustomNotFoundException {

        UserDTOCreateAccount userDTOCreateAccount = userRegisterRequestMap.get("user");

        Optional<Account> userOptional = userRepository.findByEmail(userDTOCreateAccount.getEmail());
        if (userOptional.isPresent()) {
            throw new CustomNotFoundException(
                    CustomError.builder().code("404").message("Your email is registed").build());
        }

        Account user = UserMapper.toUser(userDTOCreateAccount);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user = userRepository.save(user);
        return buidDTOResponse(user);
    }

    private Map<String, UserDTOResponse> buidDTOResponse(Account user) {
        Map<String, UserDTOResponse> wrapper = new HashMap<>();
        UserDTOResponse userDTOResponse = UserMapper.toUserDTOResponse(user);

        userDTOResponse.setToken(jwtTokenUtil.generateToken(user, 24 * 60 * 60));

        wrapper.put("user", userDTOResponse);

        return wrapper;
    }

    @Override
    public Map<String, UserDTOResponse> getCurrentUser() throws CustomNotFoundException {

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            String email = ((UserDetails) principal).getUsername();
            Account user = userRepository.findByEmail(email).get();
            return buidDTOResponse(user);
        }
        throw new CustomNotFoundException(CustomError.builder().code("404").message("User not found.").build());
    }

    @Override
    public List<UserRolesDTOResponse> getRole() {

        List<Roles> roles = roleRepository.findAll();

        List<UserRolesDTOResponse> rolesDTO = new ArrayList<>();

        for (Roles role : roles) {
            rolesDTO.add(RoleMapper.toUserRoleDTOResponse(role));
        }
        return rolesDTO;
    }

    @Override
    public Map<String, ProfileDTOResponse> getProfile(int userid) throws CustomNotFoundException {
        // TODO Auto-generated method stub
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            Optional<Account> userOptional = userRepository.findById(userid);
            if (userOptional.isEmpty()) {
                throw new CustomNotFoundException(CustomError.builder().code("404").message("User not found").build());
            }
            return buidProfileResponse(userOptional.get());
        }
        throw new CustomNotFoundException(CustomError.builder().code("404").message("User not login").build());
    }

    private Map<String, ProfileDTOResponse> buidProfileResponse(Account user) {
        Map<String, ProfileDTOResponse> wrapper = new HashMap<>();
        String decodedStringPicture = new String(user.getPicture());

        ProfileDTOResponse profileDTOResponsive = ProfileDTOResponse.builder().address(user.getAddress())
                .email(user.getEmail()).phonenumber(user.getPhonenumber())
                .picture(decodedStringPicture).sex(checkSex(user)).username(user.getUsername()).dob(user.getDob())
                .build();

        wrapper.put("profile", profileDTOResponsive);
        return wrapper;
    }

    private String checkSex(Account user) {
        String sexString = "Male";
        int sex = (int) (user.getSex());
        if (sex == 0) {
            return sexString = "Female";
        }
        return sexString;
    }

    @Override
    public Map<String, ProfileDTOResponse> getUpdateAccount(UserDTOUpdateAccount userDTOUpdateAccount)
            throws CustomNotFoundException, IOException {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            Optional<Account> userOptional = userRepository.findById(userDTOUpdateAccount.getId());

            if (userOptional.isEmpty()) {
                throw new CustomNotFoundException(CustomError.builder().code("404").message("User not found").build());
            }

            // return buidProfileResponse(userOptional.get());

            byte[] image = Base64.getDecoder().decode(userDTOUpdateAccount.getPicture());

            if (image.length == 0) {
                image = Base64.getDecoder().decode("NoImage");
            }

            Account user = userOptional.get();
            
            if (!userDTOUpdateAccount.getEmail().equals(user.getEmail())) {
                Optional<Account> userOptional1 = userRepository.findByEmail(userDTOUpdateAccount.getEmail());
                if (userOptional1.isPresent()) {
                    throw new CustomNotFoundException(
                            CustomError.builder().code("404").message("Your email is registered").build());
                }
                
                System.out.println("userfromdb:" + user);
                user.setAddress(userDTOUpdateAccount.getAddress());
                user.setDob(userDTOUpdateAccount.getDob());
                user.setPhonenumber(userDTOUpdateAccount.getPhonenumber());
                user.setPicture(image);
                user.setSex(userDTOUpdateAccount.getSex());
                user.setUsername(userDTOUpdateAccount.getUsername());
                user.setEmail(userDTOUpdateAccount.getEmail());

                
            } else {
                user.setAddress(userDTOUpdateAccount.getAddress());
                user.setDob(userDTOUpdateAccount.getDob());
                user.setPhonenumber(userDTOUpdateAccount.getPhonenumber());
                user.setPicture(image);
                user.setSex(userDTOUpdateAccount.getSex());
                user.setUsername(userDTOUpdateAccount.getUsername());
                
            }

            System.out.println("profile:");
            System.out.println(user);
            // user.setPassword(passwordEncoder.encode(user.getPassword()));
            user = userRepository.save(user);
            return buidProfileResponse(user);
        }
        throw new CustomNotFoundException(CustomError.builder().code("404").message("User not login").build());

    }

}
