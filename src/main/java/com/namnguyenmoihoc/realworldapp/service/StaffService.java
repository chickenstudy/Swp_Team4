package com.namnguyenmoihoc.realworldapp.service;

import java.util.List;

import com.namnguyenmoihoc.realworldapp.entity.Account;
import com.namnguyenmoihoc.realworldapp.model.profileAccount.ProfileDTOResponsive;

public interface StaffService {

    List<ProfileDTOResponsive> getListStaff();
    
}
