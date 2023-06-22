package com.namnguyenmoihoc.realworldapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.namnguyenmoihoc.realworldapp.entity.User;
import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
    public Optional<User> findByEmail(String email);
    public Optional<User> findById(int id);
    public Optional<User> findByUsername(String username);
    
}
