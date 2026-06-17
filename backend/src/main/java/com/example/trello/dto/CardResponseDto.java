package com.example.trello.dto;

import com.example.trello.entity.Card;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class CardResponseDto {

    private final Long id;
    private final Long boardId;
    private final String title;
    private final String description;
    private final LocalDate dueDate;
    private final String priority;
    private final String status;
    private final Integer orderIndex;
    private final LocalDate completedAt;

    private CardResponseDto(Card card) {
        this.id = card.getId();
        this.boardId = card.getBoard().getId();
        this.title = card.getTitle();
        this.description = card.getDescription();
        this.dueDate = card.getDueDate();
        this.priority = card.getPriority();
        this.status = card.getStatus();
        this.orderIndex = card.getOrderIndex();
        this.completedAt = card.getCompletedAt();
    }

    public static CardResponseDto from(Card card) {
        return new CardResponseDto(card);
    }
}
