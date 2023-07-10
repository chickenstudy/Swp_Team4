package com.namnguyenmoihoc.realworldapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.namnguyenmoihoc.realworldapp.entity.Account;

@Repository

public interface StaffRepository extends JpaRepository<Account, Integer>{
    public Optional<Account> findById(int id);

    public List<Account> findByRolesID(int rolesID);

    public Optional<Account> findByEmail(String email);
}
