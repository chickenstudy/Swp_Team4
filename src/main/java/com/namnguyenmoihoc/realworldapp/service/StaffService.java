package com.namnguyenmoihoc.realworldapp.service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.sql.rowset.serial.SerialException;


import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;
import com.namnguyenmoihoc.realworldapp.model.profileAccount.ProfileDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.staff.StaffDTOCreate;
import com.namnguyenmoihoc.realworldapp.model.staff.StaffDTOResponse;


public interface StaffService {

    List<ProfileDTOResponse> getListStaff();

    Map<String, ProfileDTOResponse> createStaffAccount(Map<String, StaffDTOCreate> staffCreateAcc) throws SerialException, SQLException, IOException, CustomNotFoundException;

    Map<String, StaffDTOResponse> getUpdateAccount(StaffDTOCreate staffDTOUpdateAccount) throws CustomNotFoundException;

    void getDeleteMovie(int staffId) throws CustomNotFoundException;
    
}
