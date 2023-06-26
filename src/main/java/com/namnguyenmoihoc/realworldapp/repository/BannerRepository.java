package com.namnguyenmoihoc.realworldapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.namnguyenmoihoc.realworldapp.entity.Banner;

@Repository
public interface BannerRepository extends JpaRepository<Banner ,Integer> {
    
}
