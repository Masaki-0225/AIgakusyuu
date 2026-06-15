package com.example.trello.dto;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class CardCreateRequest {
    private String title;
    private String description;
    private LocalDate dueDate;
    private String priority;
}
