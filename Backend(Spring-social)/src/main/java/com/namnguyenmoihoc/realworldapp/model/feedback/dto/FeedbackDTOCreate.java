package com.namnguyenmoihoc.realworldapp.model.feedback.dto;

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
public class FeedbackDTOCreate {
    private String content;
    private int userid;
    private int movieid;
}
