package com.example.trello.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class CardCreateRequest {
    @NotBlank(message = "タイトルは必須です")
    private String title;
    private String description;
    private LocalDate dueDate;
    private String priority;
}
