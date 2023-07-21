package com.namnguyenmoihoc.realworldapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.namnguyenmoihoc.realworldapp.entity.OrderDetail;

public interface OrderDataRepository extends JpaRepository<OrderDetail, Integer>{
    
}
