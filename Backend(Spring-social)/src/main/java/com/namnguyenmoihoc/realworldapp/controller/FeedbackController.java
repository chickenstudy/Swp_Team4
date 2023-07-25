package com.namnguyenmoihoc.realworldapp.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.namnguyenmoihoc.realworldapp.entity.Feedback;
import com.namnguyenmoihoc.realworldapp.entity.Movie;
import com.namnguyenmoihoc.realworldapp.exception.custom.ChangePasswordMessage;
import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;
import com.namnguyenmoihoc.realworldapp.exception.custom.Message;
import com.namnguyenmoihoc.realworldapp.model.cinema.CinemaDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.feedback.dto.FeedbackDTO;
import com.namnguyenmoihoc.realworldapp.model.feedback.dto.FeedbackDTOCreate;
import com.namnguyenmoihoc.realworldapp.model.feedback.dto.FeedbackDTOUpdate;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOResponseCreate;
import com.namnguyenmoihoc.realworldapp.model.movie.MovieDTOUpdate;
import com.namnguyenmoihoc.realworldapp.model.user.dto.UserDTOCreateAccount;
import com.namnguyenmoihoc.realworldapp.repository.FeedbackRepository;
import com.namnguyenmoihoc.realworldapp.repository.MovieRepository;
import com.namnguyenmoihoc.realworldapp.service.FeedbackService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin
@RequiredArgsConstructor
public class FeedbackController {
    private final FeedbackService feedbackService;

    @GetMapping("/listFeedback/{movieid}")
    public Map<String, List<FeedbackDTO>> getListFeedback(@PathVariable(value = "movieid") int movieid)
            throws CustomNotFoundException {

        return feedbackService.getListFeedback(movieid);
    }

    @PostMapping("/comment/{movieid}")
    public Map<String, FeedbackDTO> getFeedback(@PathVariable(value = "movieid") int movieid,
            @RequestBody Map<String, FeedbackDTOCreate> feedbackDTOCreate)
            throws CustomNotFoundException {
                FeedbackDTOCreate feedbackCreate = feedbackDTOCreate.get("feedback");
                feedbackCreate.setMovieid(movieid);
                
        return feedbackService.getFeedback(feedbackCreate);
    }

    @DeleteMapping("/deleteComment/{feadbackid}")
    public Map<String, Message> deleteComment(@PathVariable(value = "feadbackid") int feadbackid)
            throws CustomNotFoundException {
        return feedbackService.deleteComment(feadbackid);
    }

    @PutMapping("/updateComment/{feadbackid}")
    public Map<String, FeedbackDTO> updateComment(@PathVariable(value = "feadbackid") int feadbackid,
            @RequestBody Map<String, FeedbackDTOUpdate> feedbackDTOUpdate)
            throws CustomNotFoundException {
                FeedbackDTOUpdate feedbackUpdate = feedbackDTOUpdate.get("feedback");
                String content = feedbackUpdate.getContent();
                
        return feedbackService.updateComment(feadbackid, content);
    }
}
