package com.namnguyenmoihoc.realworldapp.repository;

import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;



import com.namnguyenmoihoc.realworldapp.entity.Roles;



@Repository
public interface RoleRepository extends JpaRepository<Roles, Integer>{
        public List<Roles> findAll();

}
