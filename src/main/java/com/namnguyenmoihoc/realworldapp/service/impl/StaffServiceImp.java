package com.namnguyenmoihoc.realworldapp.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.namnguyenmoihoc.realworldapp.entity.Account;
import com.namnguyenmoihoc.realworldapp.entity.Movie;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.profileAccount.ProfileDTOResponsive;
import com.namnguyenmoihoc.realworldapp.model.user.mapper.MovieMapper;
import com.namnguyenmoihoc.realworldapp.model.user.mapper.StaffMapper;
import com.namnguyenmoihoc.realworldapp.repository.StaffRepository;
import com.namnguyenmoihoc.realworldapp.service.StaffService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StaffServiceImp implements StaffService {
    private final StaffRepository staffRepository;

    @Override
    public List<ProfileDTOResponsive> getListStaff() {
        // TODO Auto-generated method stub
        List<Account> listStaff = staffRepository.findByRolesID(2);

        List<ProfileDTOResponsive> listProfileDTOResponsives = new ArrayList<>();

        for (Account staff : listStaff) {
            listProfileDTOResponsives.add(StaffMapper.toStaffResponse(staff));
        }
        return listProfileDTOResponsives;
    }

}
