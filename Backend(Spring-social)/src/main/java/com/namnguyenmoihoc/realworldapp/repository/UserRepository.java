package com.namnguyenmoihoc.realworldapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.namnguyenmoihoc.realworldapp.entity.Account;


@Repository
public interface UserRepository extends JpaRepository<Account, Integer>{
    public Optional<Account> findByEmail(String email);
    public Optional<Account> findById(int id);
    public Optional<Account> findByUsername(String username);
    
}
