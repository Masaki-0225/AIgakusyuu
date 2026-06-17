package com.example.trello.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class CardUpdateRequest {
    private String title;
    private String description;
    private LocalDate dueDate;
    private String priority;
}
