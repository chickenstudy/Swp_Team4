package com.namnguyenmoihoc.realworldapp.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.namnguyenmoihoc.realworldapp.entity.Account;
import com.namnguyenmoihoc.realworldapp.entity.Feedback;
import com.namnguyenmoihoc.realworldapp.entity.Movie;
import com.namnguyenmoihoc.realworldapp.exception.custom.ChangePasswordMessage;
import com.namnguyenmoihoc.realworldapp.exception.custom.CustomNotFoundException;
import com.namnguyenmoihoc.realworldapp.exception.custom.Message;
import com.namnguyenmoihoc.realworldapp.model.feedback.dto.FeedbackDTO;
import com.namnguyenmoihoc.realworldapp.model.feedback.dto.FeedbackDTOCreate;
import com.namnguyenmoihoc.realworldapp.model.feedback.mapper.FeedbackMapper;
import com.namnguyenmoihoc.realworldapp.model.user.CustomError;
import com.namnguyenmoihoc.realworldapp.model.user.dto.UserDTOResponse;
import com.namnguyenmoihoc.realworldapp.model.user.mapper.UserMapper;
import com.namnguyenmoihoc.realworldapp.repository.FeedbackRepository;
import com.namnguyenmoihoc.realworldapp.repository.MovieRepository;
import com.namnguyenmoihoc.realworldapp.repository.UserRepository;
import com.namnguyenmoihoc.realworldapp.service.FeedbackService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedbackServiceImpl implements FeedbackService {
    private final MovieRepository movieRepository;
    private final FeedbackRepository feedbackRepository;
    private final UserRepository userRepository;

    @Override
    public Map<String, List<FeedbackDTO>> getListFeedback(int movieid) throws CustomNotFoundException {
        // TODO Auto-generated method stub

        Optional<Movie> movieop = movieRepository.findByMovieid(movieid);
        if (movieop.isEmpty()) {
            throw new CustomNotFoundException(CustomError.builder().code("404").message("Movie not found").build());
        }

        Movie movie = movieop.get();
        List<Feedback> listFeedback = feedbackRepository.findFeedbackByMovieid(movieid);
        return buidListFeedbackDTOResponse(listFeedback);

    }

    private Map<String, List<FeedbackDTO>> buidListFeedbackDTOResponse(List<Feedback> feedbacks) {
        Map<String, List<FeedbackDTO>> wrapper = new HashMap<>();
        List<FeedbackDTO> listfFeedbackDTOs = new ArrayList<>();
        for (Feedback feedback : feedbacks) {
            listfFeedbackDTOs.add(FeedbackMapper.toUserDTOResponse(feedback));
        }
        wrapper.put("feedback", listfFeedbackDTOs);
        return wrapper;
    }

    @Override
    public Map<String, FeedbackDTO> getFeedback(FeedbackDTOCreate feedbackCreate) throws CustomNotFoundException {
        // TODO Auto-generated method stub
        Optional<Movie> movieOp = movieRepository.findByMovieid(feedbackCreate.getMovieid());
        if (movieOp.isEmpty()) {
            throw new CustomNotFoundException(CustomError.builder().code("404").message("Movie not found").build());
        }

        Optional<Account> accountOp = userRepository.findById(feedbackCreate.getUserid());

        Feedback newFeedback = new Feedback();
        newFeedback.setCreateddate(LocalDateTime.now());
        newFeedback.setContent(feedbackCreate.getContent());
        newFeedback.setMovieid(movieOp.get());
        newFeedback.setUserid(accountOp.get());

        feedbackRepository.save(newFeedback);
        return buidDTOResponse(newFeedback);

    }

    private Map<String, FeedbackDTO> buidDTOResponse(Feedback feedbacks) {
        Map<String, FeedbackDTO> wrapper = new HashMap<>();
        FeedbackDTO feedbackDTO = FeedbackMapper.toUserDTOResponse(feedbacks);
        wrapper.put("feedback", feedbackDTO);
        return wrapper;
    }

    @Override
    public Map<String, Message> deleteComment(int feadbackid) throws CustomNotFoundException {
        // TODO Auto-generated method stub
        Optional<Feedback> feedbackOptional = feedbackRepository.findById(feadbackid);

        if (feedbackOptional.isEmpty()) {
            throw new CustomNotFoundException(CustomError.builder().code("404").message("Feedback not found").build());
        }
        feedbackRepository.deleteById(feadbackid);
        return successMessage();
    }

    @Override
    public Map<String, FeedbackDTO> updateComment(int feadbackid, String content) throws CustomNotFoundException {
        // TODO Auto-generated method stub
        Optional<Feedback> feedbackOptional = feedbackRepository.findById(feadbackid);

        if (feedbackOptional.isEmpty()) {
            throw new CustomNotFoundException(CustomError.builder().code("404")
            .message("Feedback not found").build());
        }

        Feedback newFeedbackContent = feedbackOptional.get();
        newFeedbackContent.setContent(content);
        feedbackRepository.save(newFeedbackContent);
        return buidDTOResponse(newFeedbackContent);
    }

    private Map<String, Message> successMessage() {
        Map<String, Message> wrapper = new HashMap<>();
        Message successMessage = new Message(
                CustomError.builder().code("200").message("Delete Feedback Success!!!").build());
        wrapper.put("message", successMessage);
        return wrapper;
    }

}
