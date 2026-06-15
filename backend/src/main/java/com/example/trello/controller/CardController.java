package com.example.trello.controller;

import com.example.trello.dto.CardCreateRequest;
import com.example.trello.dto.CardResponseDto;
import com.example.trello.service.CardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CardController {

    private final CardService cardService;

    @GetMapping("/boards/{boardId}/cards")
    public List<CardResponseDto> getCardsByBoard(
            @PathVariable Long boardId,
            @RequestParam(required = false) String status) {
        if (status != null) {
            return cardService.findAllByBoardIdAndStatus(boardId, status);
        }
        return cardService.findAllByBoardId(boardId);
    }

    @GetMapping("/cards/{id}")
    public CardResponseDto getCard(@PathVariable Long id) {
        return cardService.findById(id);
    }

    @PostMapping("/boards/{boardId}/cards")
    @ResponseStatus(HttpStatus.CREATED)
    public CardResponseDto createCard(
            @PathVariable Long boardId,
            @RequestBody CardCreateRequest request) {
        return cardService.createCard(boardId, request);
    }
}
