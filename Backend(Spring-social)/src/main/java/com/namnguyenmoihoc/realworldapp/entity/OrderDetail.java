package com.namnguyenmoihoc.realworldapp.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;

import jakarta.persistence.Entity;

import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "orderdata")
@NoArgsConstructor
public class OrderDetail {
    @Id
    private int orderid;

    @CreatedDate
    private LocalDateTime purchasedate;

    private float total;

    @ManyToOne
    @JoinColumn(nullable = false,name="userid")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Account userid;
}
