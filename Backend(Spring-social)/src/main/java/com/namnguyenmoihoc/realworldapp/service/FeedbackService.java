package com.namnguyenmoihoc.realworldapp.service;

import java.util.List;
import java.util.Map;

import com.namnguyenmoihoc.realworldapp.entity.Feedback;
import com.namnguyenmoihoc.realworldapp.exception.custom.ChangePasswordMessage;
import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;
import com.namnguyenmoihoc.realworldapp.exception.custom.Message;
import com.namnguyenmoihoc.realworldapp.model.feedback.dto.FeedbackDTO;
import com.namnguyenmoihoc.realworldapp.model.feedback.dto.FeedbackDTOCreate;

public interface FeedbackService {

    Map<String, List<FeedbackDTO>> getListFeedback(int movieid) throws CustomNotFoundException;

    Map<String, FeedbackDTO> getFeedback(FeedbackDTOCreate feedbackCreate) throws CustomNotFoundException;

    Map<String, Message> deleteComment(int feadbackid) throws CustomNotFoundException;

    Map<String, FeedbackDTO> updateComment(int feadbackid, String content) throws CustomNotFoundException;
    
}
