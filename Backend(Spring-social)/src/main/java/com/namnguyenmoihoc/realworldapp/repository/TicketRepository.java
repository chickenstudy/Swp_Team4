package com.namnguyenmoihoc.realworldapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.namnguyenmoihoc.realworldapp.entity.BookTicket;
import com.namnguyenmoihoc.realworldapp.entity.OrderDetail;

import java.util.List;
import java.util.Optional;

public interface TicketRepository extends JpaRepository<BookTicket, Integer>{
    
    //public List<BookTicket> findBookTicketsByShowtimeid(Integer showtimeid);

    @Query(value = "SELECT * FROM ticket WHERE showtimeid = ? AND seatid = ?", nativeQuery = true)
    public List<BookTicket> findBookTicketsByShowtimeidAndSeatid(Integer showtimeId, Integer seatId);
    
    @Query("SELECT t FROM BookTicket t WHERE t.orderid.orderid IN (SELECT b.orderid FROM OrderDetail b WHERE b.userid.id = :userId) ORDER BY t.ticketid DESC")
    public List<BookTicket> findBookTicketsByAccountid(@Param("userId") Integer userId);
}

//@Query("SELECT t.* FROM ticket t WHERE t.orderid IN ( SELECT b.orderid FROM orderdata b WHERE b.userid =:userId )ORDER BY t.ticketid DESC")
//@Query("SELECT t FROM BookTicket t WHERE t.orderid IN (SELECT b.orderid FROM OrderDetail b WHERE b.userid =:userId) ORDER BY t.ticketid DESC")
