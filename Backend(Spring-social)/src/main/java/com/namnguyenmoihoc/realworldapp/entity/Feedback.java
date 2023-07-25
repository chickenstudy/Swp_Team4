package com.namnguyenmoihoc.realworldapp.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Builder
@Entity
@Table(name = "feedback")
@NoArgsConstructor
@AllArgsConstructor
@DynamicUpdate
@DynamicInsert
@Getter
@Setter
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int feedbackid;

    @CreatedDate
    private LocalDateTime createddate;

    private String content;

    @ManyToOne
    @JoinColumn(nullable = false,name="movieid")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Movie movieid;

    @ManyToOne
    @JoinColumn(nullable = false,name="userid")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Account userid;
}
