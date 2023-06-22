package com.namnguyenmoihoc.realworldapp.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;


import com.namnguyenmoihoc.realworldapp.entity.Roles;
import com.namnguyenmoihoc.realworldapp.entity.User;

@Repository
public interface RoleRepository extends JpaRepository<Roles, Integer>{

}
