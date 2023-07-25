package com.namnguyenmoihoc.realworldapp.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.namnguyenmoihoc.realworldapp.entity.BookTicket;
import com.namnguyenmoihoc.realworldapp.exception.custom.CustomMessageError;
import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;
import com.namnguyenmoihoc.realworldapp.model.profileAccount.ProfileDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.staff.StaffDTOCreate;
import com.namnguyenmoihoc.realworldapp.model.staff.StaffDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.ticket.CheckoutDTO;
import com.namnguyenmoihoc.realworldapp.service.StaffService;
import com.namnguyenmoihoc.realworldapp.service.impl.StaffServiceImpl;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

@RestController
@RequestMapping("/api/staff")
@RequiredArgsConstructor
@CrossOrigin
public class StaffController {
    private final StaffService staffService;
    private final HttpSession httpSession;
    @Autowired
    private final StaffServiceImpl staffServiceImpl;

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

    @PutMapping("/checkoutTicket")
    public Map<String, List<BookTicket>> checkoutTicket(@RequestBody CheckoutDTO checkoutString)
            throws CustomMessageError {
        return staffService.checkoutTicket(checkoutString);
    }

    @GetMapping("/clearSeat")
    public void clearSeat() {
        staffService.clearSeat();
    }

    @GetMapping("/transactionHistory")
    public List<BookTicket> getDataListJson() {
        // Truy xuất List từ session
        List<BookTicket> dataList = staffServiceImpl.getListTransaction();
        
        return dataList;
       
    }
}
