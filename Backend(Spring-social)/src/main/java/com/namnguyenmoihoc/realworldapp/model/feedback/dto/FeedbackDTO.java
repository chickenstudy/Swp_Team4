package com.namnguyenmoihoc.realworldapp.model.feedback.dto;

import java.time.LocalDateTime;
import com.namnguyenmoihoc.realworldapp.entity.Account;
import com.namnguyenmoihoc.realworldapp.entity.Movie;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackDTO {
    private int feedbackid;
    private LocalDateTime createddate;
    private String content;
    
    private int movieid;
    private String username;
    private String picture;
}
