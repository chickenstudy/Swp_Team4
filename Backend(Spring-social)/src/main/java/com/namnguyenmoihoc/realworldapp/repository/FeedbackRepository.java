package com.namnguyenmoihoc.realworldapp.repository;

import org.springframework.stereotype.Repository;

import com.namnguyenmoihoc.realworldapp.entity.BookTicket;
import com.namnguyenmoihoc.realworldapp.entity.Feedback;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;




@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Integer>{
    @Query(value = "SELECT * FROM feedback WHERE movieid = ?", nativeQuery = true)
    public List<Feedback> findFeedbackByMovieid(int movieid);
}
