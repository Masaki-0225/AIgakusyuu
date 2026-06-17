package com.example.trello.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class CardUpdateRequest {
    @NotBlank(message = "タイトルは必須です")
    private String title;
    private String description;
    private LocalDate dueDate;
    private String priority;
}
