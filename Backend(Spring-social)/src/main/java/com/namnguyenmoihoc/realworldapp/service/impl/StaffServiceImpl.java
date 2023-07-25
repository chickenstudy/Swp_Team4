package com.namnguyenmoihoc.realworldapp.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.sql.rowset.serial.SerialException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.namnguyenmoihoc.realworldapp.entity.Account;
import com.namnguyenmoihoc.realworldapp.entity.BookTicket;
import com.namnguyenmoihoc.realworldapp.entity.Seat;
import com.namnguyenmoihoc.realworldapp.exception.custom.CustomMessageError;
import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;
import com.namnguyenmoihoc.realworldapp.model.profileAccount.ProfileDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.staff.StaffDTOCreate;
import com.namnguyenmoihoc.realworldapp.model.staff.StaffDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.ticket.CheckoutDTO;
import com.namnguyenmoihoc.realworldapp.model.user.CustomError;
import com.namnguyenmoihoc.realworldapp.model.user.mapper.StaffMapper;
import com.namnguyenmoihoc.realworldapp.repository.SeatRepositorty;
import com.namnguyenmoihoc.realworldapp.repository.StaffRepository;
import com.namnguyenmoihoc.realworldapp.repository.TicketRepository;
import com.namnguyenmoihoc.realworldapp.service.StaffService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StaffServiceImpl implements StaffService {
    private final StaffRepository staffRepository;
    private final PasswordEncoder passwordEncoder;
    private final TicketRepository ticketRepository;
    private final SeatRepositorty seatRepositorty;
    private final List<BookTicket> listBuyedForStaffs;
    @Autowired
    private HttpSession httpSession;


    @Override
    public List<ProfileDTOResponse> getListStaff() {

        List<Account> listStaff = staffRepository.findByRolesID(2);

        List<ProfileDTOResponse> listProfileDTOResponsives = new ArrayList<>();

        for (Account staff : listStaff) {
            listProfileDTOResponsives.add(StaffMapper.toStaffResponse(staff));
        }
        return listProfileDTOResponsives;
    }

    @Override
    public Map<String, ProfileDTOResponse> createStaffAccount(Map<String, StaffDTOCreate> staffCreateAcc)
            throws SerialException, SQLException, IOException, CustomNotFoundException {

        StaffDTOCreate staffDTOCreate = staffCreateAcc.get("user");
        Optional<Account> staffOptional = staffRepository.findByEmail(staffDTOCreate.getEmail());
        if (staffOptional.isPresent()) {
            throw new CustomNotFoundException(
                    CustomError.builder().code("404").message("Your email is registed").build());

        }
        Account staff = StaffMapper.toStaff(staffDTOCreate);
        staff.setPassword(passwordEncoder.encode(staff.getPassword()));
        staff = staffRepository.save(staff);

        Map<String, ProfileDTOResponse> wrapper = new HashMap<>();
        ProfileDTOResponse staffDTOResponse = StaffMapper.toStaffResponse(staff);

        wrapper.put("staff", staffDTOResponse);
        return wrapper;

    }

    @Override
    public Map<String, StaffDTOResponse> getUpdateAccount(StaffDTOCreate staffDTOUpdateAccount)
            throws CustomNotFoundException {

        Optional<Account> staffOptional = staffRepository.findById(staffDTOUpdateAccount.getId());

        if (staffOptional.isEmpty()) {
            throw new CustomNotFoundException(CustomError.builder().code("404").message("Staff not found").build());
        }

        Account staff = staffOptional.get();
        StaffMapper.updateStaffDetails(staff, staffDTOUpdateAccount);
        staff = staffRepository.save(staff);
        return StaffMapper.buidDTOUpdateResponse(staff);
    }

    @Override
    public void getDeleteMovie(int staffId) throws CustomNotFoundException {
        Optional<Account> movieOptional = staffRepository.findById(staffId);
        if (movieOptional.isEmpty()) {
            throw new CustomNotFoundException(CustomError.builder().code("404").message("Staff not found").build());
        }
        staffRepository.deleteById(staffId);
    }

    @Override
    public Map<String, List<BookTicket>> checkoutTicket(CheckoutDTO checkoutString)
            throws CustomMessageError {
        String checkoutCodeRequest = checkoutString.getTicketCodeString();

        List<BookTicket> ticket = ticketRepository.findByTicketcode(checkoutCodeRequest);

        if (ticket.isEmpty()) {
            System.out.println("here ne");
            throw new CustomMessageError(CustomError.builder().code("404").message("Can't found this ticket!!!").build());
        }
        if (ticket.get(0).getTicketactive() == 0) {
            throw new CustomMessageError(CustomError.builder().code("404").message("This ticket has been activated!!!").build());
        }

        for (BookTicket t : ticket) {
            t.setTicketactive((byte) 0);
            ticketRepository.save(t);
            listBuyedForStaffs.add(t);
        }
        httpSession.setAttribute("listBuyedForStaffs", listBuyedForStaffs);
        System.out.println(listBuyedForStaffs.size());
        return buidCheckoutTicketResponse(ticket);
    }

    private Map<String, List<BookTicket>> buidCheckoutTicketResponse(List<BookTicket> checkoutTicket) {
        Map<String, List<BookTicket>> wrapper = new HashMap<>();
        wrapper.put("checkoutedTicket", checkoutTicket);
        return wrapper;
    }

    @Override
    public void clearSeat() {
        // TODO Auto-generated method stub
        List<Seat> listSeats = seatRepositorty.findAll();
        for (Seat seats : listSeats) {
            seats.setActive((byte) 1);
            seatRepositorty.save(seats);
        }
    }

    public List<BookTicket> getListTransaction(){
        List<BookTicket> data = (List<BookTicket>) httpSession.getAttribute("listBuyedForStaffs");
        return data;
    }
}
