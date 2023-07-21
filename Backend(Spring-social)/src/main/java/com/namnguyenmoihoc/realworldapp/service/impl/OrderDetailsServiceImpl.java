package com.namnguyenmoihoc.realworldapp.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.namnguyenmoihoc.realworldapp.entity.Account;
import com.namnguyenmoihoc.realworldapp.entity.BookTicket;
import com.namnguyenmoihoc.realworldapp.entity.OrderDetail;
import com.namnguyenmoihoc.realworldapp.entity.Seat;
import com.namnguyenmoihoc.realworldapp.entity.Showtime;
import com.namnguyenmoihoc.realworldapp.exception.custom.BaseCustomException;
import com.namnguyenmoihoc.realworldapp.exception.custom.CustomMessageError;
import com.namnguyenmoihoc.realworldapp.model.booking.BookingDTO;
import com.namnguyenmoihoc.realworldapp.model.booking.BookingRequestDTO;
import com.namnguyenmoihoc.realworldapp.model.user.CustomError;
import com.namnguyenmoihoc.realworldapp.model.user.dto.UserDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.user.mapper.UserMapper;
import com.namnguyenmoihoc.realworldapp.repository.OrderDataRepository;
import com.namnguyenmoihoc.realworldapp.repository.RoleRepository;
import com.namnguyenmoihoc.realworldapp.repository.SeatRepositorty;
import com.namnguyenmoihoc.realworldapp.repository.ShowtimeRepository;
import com.namnguyenmoihoc.realworldapp.repository.TicketRepository;
import com.namnguyenmoihoc.realworldapp.repository.UserRepository;
import com.namnguyenmoihoc.realworldapp.service.OrderDetailsService;
import com.namnguyenmoihoc.realworldapp.service.ShowtimeService;
import com.namnguyenmoihoc.realworldapp.util.JWTTokenUtil;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderDetailsServiceImpl implements OrderDetailsService{
    

    
    @Autowired
    private ShowtimeRepository showtimeRepository;
    @Autowired
    private TicketRepository ticketRepository;
    
    @Autowired
    private SeatRepositorty seatRepository;
    @Autowired
    private OrderDataRepository orderDataRepository;

    private final UserRepository userRepository;
    


    @Override
    @Transactional
    public Map<String, List<BookTicket>> createNewOrder(BookingDTO bookingDTO) throws RuntimeException, CustomMessageError {
        // TODO Auto-generated method stub
        //Lấy ra lịch
        Optional<Showtime> showtime = showtimeRepository.findById(bookingDTO.getShowtimeId());
        //Lấy ra người dùng
        int userid = 0;
        Account user = new Account();
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            String email = ((UserDetails) principal).getUsername();
            user = userRepository.findByEmail(email).get();
            userid = user.getId();
        }

        //Lưu Bill gồm thông tin người dùng xuống trước
        OrderDetail billToCreate = new OrderDetail();
        billToCreate.setUserid(user);
        billToCreate.setPurchasedate(LocalDateTime.now());
        billToCreate.setTotal(bookingDTO.getListSeatIds().size() * 50000);

        
        OrderDetail createdBill = OrderDetail.builder().userid(user).purchasedate(billToCreate.getPurchasedate()).total(billToCreate.getTotal()).build();
        orderDataRepository.save(createdBill);

        List<BookTicket> listTickets = new ArrayList<>();
        //Với mỗi ghế ngồi check xem đã có ai đặt chưa, nếu rồi thì throw, roll back luôn còn ko
        //thì đóng gói các thông tin ghế và lịch vào vé và lưu xuống db
        List<Integer> listSeats = bookingDTO.getListSeatIds();
        String randomNumber = generateRandomNumber();

        for (Integer seatId : listSeats) {
            System.out.println(seatId);
            //BookTicket ticket = ticketRepository.findBookTicketsByShowtimeidAndSeatid(showtime.get().getShowtimeid(),seatId).get(userid));
            if(!ticketRepository.findBookTicketsByShowtimeidAndSeatid(showtime.get().getShowtimeid(),seatId)
                    .isEmpty()){// Nếu đã có người đặt vé ghế đó ở lịch cụ thể đó thì
                        throw new CustomMessageError(CustomError.builder().code("000").message("Some one fast than you for this seat!!!").build());
            }
            // đóng gói lịch, seat và bill vào từng vé rồi add vào list vé
            Seat seat = new Seat();
            BookTicket ticket = new BookTicket();
            seat = seatRepository.findBySeatid(seatId).get();
            seat.setActive((byte)0);
            seatRepository.save(seat);

            ticket.setShowtimeid(showtime.get());
            ticket.setSeatid(seatRepository.findBySeatid(seatId).get());
            ticket.setOrderid(createdBill);
            ticket.setCreateddate(LocalDateTime.now());
            ticket.setTicketcode(randomNumber);
            ticket.setTicketactive((byte) 1);
            ticketRepository.save(ticket);
            listTickets.add(ticket);
        }
        return buidDTOResponse(listTickets);

        /* 
        bookingDTO.getListSeatIds().forEach(seatId->{
            System.out.println(seatId);
            //BookTicket ticket = ticketRepository.findBookTicketsByShowtimeidAndSeatid(showtime.get().getShowtimeid(),seatId).get(userid));
            if(!ticketRepository.findBookTicketsByShowtimeidAndSeatid(showtime.get().getShowtimeid(),seatId)
                    .isEmpty()){// Nếu đã có người đặt vé ghế đó ở lịch cụ thể đó thì
                        
                    try {
                        throw new CustomMessageError(CustomError.builder().code("000").message("Some one fast than you for this seat!!!").build());
                    } catch (CustomMessageError e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    }
            }
            // đóng gói lịch, seat và bill vào từng vé rồi add vào list vé
            BookTicket ticket = new BookTicket();
            ticket.setShowtimeid(showtime.get());
            ticket.setSeatid(seatRepository.findBySeatid(seatId).get());
            ticket.setOrderid(createdBill);
            ticket.setCreateddate(LocalDateTime.now());
            ticket.setTicketcode(generateRandomNumber());
            ticket.setTicketactive((byte) 1);
            ticketRepository.save(ticket);
            listTickets.add(ticket);
        });
        */
    }

    private Map<String, List<BookTicket>> buidDTOResponse(List<BookTicket> ticket) {
        Map<String, List<BookTicket>> wrapper = new HashMap<>();
        wrapper.put("ticket", ticket);
        return wrapper;
    }

    private String generateRandomNumber() {
        Random random = new Random();
        int number = random.nextInt(1000000); // Sinh số ngẫu nhiên từ 0 đến 999,999
        return String.format("%06d", number); // Thêm số 0 ở đầu nếu số nhỏ hơn 100,000
    }
     
    
}
