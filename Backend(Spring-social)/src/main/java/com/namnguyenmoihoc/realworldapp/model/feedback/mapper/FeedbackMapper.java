package com.namnguyenmoihoc.realworldapp.model.feedback.mapper;

import com.namnguyenmoihoc.realworldapp.entity.Account;
import com.namnguyenmoihoc.realworldapp.entity.Feedback;
import com.namnguyenmoihoc.realworldapp.model.feedback.dto.FeedbackDTO;
import com.namnguyenmoihoc.realworldapp.model.user.dto.UserDTOResponse;

public class FeedbackMapper {
    public static FeedbackDTO toUserDTOResponse(Feedback feedback) {

        String decodedStringPicture = new String(feedback.getUserid().getPicture());
        
        return FeedbackDTO.builder().feedbackid(feedback.getFeedbackid()).createddate(feedback.getCreateddate())
        .content(feedback.getContent()).movieid(feedback.getMovieid().getMovieid())
        .username(feedback.getUserid().getUsername()).picture(decodedStringPicture).build();
    }
}
