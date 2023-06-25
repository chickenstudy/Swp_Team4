package com.namnguyenmoihoc.realworldapp.repository;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;



import com.namnguyenmoihoc.realworldapp.entity.Roles;
import com.namnguyenmoihoc.realworldapp.entity.Account;


@Repository
public interface RoleRepository extends JpaRepository<Roles, Integer>{
        public List<Roles> findAll();

}
