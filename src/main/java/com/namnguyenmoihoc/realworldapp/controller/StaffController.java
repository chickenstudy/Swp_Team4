package com.namnguyenmoihoc.realworldapp.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;
import com.namnguyenmoihoc.realworldapp.model.profileAccount.ProfileDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.staff.StaffDTOCreate;
import com.namnguyenmoihoc.realworldapp.model.staff.StaffDTOResponse;
import com.namnguyenmoihoc.realworldapp.service.StaffService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/staff")
@RequiredArgsConstructor
public class StaffController {
    private final StaffService staffService;

    @PostMapping("/create")
    public Map<String, ProfileDTOResponse> createStaff(
            @RequestBody Map<String, StaffDTOCreate> staffCreateAcc)
            throws SQLException, IOException, CustomNotFoundException {
        return staffService.createStaffAccount(staffCreateAcc);
    }

    @GetMapping("/listStaff")
    public List<ProfileDTOResponse> getListStaff() {
        return staffService.getListStaff();
    }

    @PutMapping("/update/{staffid}")
    public Map<String, StaffDTOResponse> getUpdateAccount(@PathVariable int staffid,
            @RequestBody StaffDTOCreate staffDTOUpdateAccount)
            throws CustomNotFoundException, IOException {

        staffDTOUpdateAccount.setId(staffid);
        return staffService.getUpdateAccount(staffDTOUpdateAccount);
    }

    @DeleteMapping("/delete/{id}")
    public void getDeleteStaff(@PathVariable(value = "id") int staffId)
            throws CustomNotFoundException {

        staffService.getDeleteMovie(staffId);

    }
}
