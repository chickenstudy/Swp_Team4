package com.namnguyenmoihoc.realworldapp.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "account_tbl")
public class User {
    @Id
    private int id;

    @Column(unique = true)
    private String email;

    private String password;
    private byte sex;
    private String address;
    private String username;

    @Lob
    private byte[] picture;

    private String phonenumber;
    private int rolesID;
    private Date dob;

}
