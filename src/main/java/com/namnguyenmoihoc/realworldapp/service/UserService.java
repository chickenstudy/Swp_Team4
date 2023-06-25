package com.namnguyenmoihoc.realworldapp.service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.sql.rowset.serial.SerialException;

import com.namnguyenmoihoc.realworldapp.exception.custom.CustomBadRequestException;
import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;
import com.namnguyenmoihoc.realworldapp.model.profileAccount.ProfileDTOResponsive;
import com.namnguyenmoihoc.realworldapp.model.roles.UserRolesDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.user.dto.UserDTOCreateAccount;
import com.namnguyenmoihoc.realworldapp.model.user.dto.UserDTOLoginRequest;
import com.namnguyenmoihoc.realworldapp.model.user.dto.UserDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.user.dto.UserDTOUpdateAccount;

public interface UserService {

    public Map<String, UserDTOResponse> authenticate(Map<String, UserDTOLoginRequest> userloginRequestMap) throws CustomBadRequestException, CustomNotFoundException;

    public Map<String, UserDTOResponse> registerUser(Map<String, UserDTOCreateAccount> userRegisterRequestMap) throws SerialException, SQLException, IOException, CustomNotFoundException;

    public Map<String, UserDTOResponse> getCurrentUser() throws CustomNotFoundException;

    public List<UserRolesDTOResponse> getRole();

    public Map<String, ProfileDTOResponsive> getProfile(int userid) throws CustomNotFoundException;

    public Map<String, ProfileDTOResponsive> getUpdateAccount(UserDTOUpdateAccount userDTOUpdateAccount) throws CustomNotFoundException, IOException;

    //public UserRolesDTOResponse findAll();
    
}
