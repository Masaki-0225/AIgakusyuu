package com.example.trello.service;

import com.example.trello.dto.CardResponseDto;
import com.example.trello.repository.CardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CardService {

    private final CardRepository cardRepository;

    public List<CardResponseDto> findAllByBoardId(Long boardId) {
        return cardRepository.findByBoardIdOrderByStatusAscOrderIndexAsc(boardId)
                .stream()
                .map(CardResponseDto::from)
                .toList();
    }

    public List<CardResponseDto> findAllByBoardIdAndStatus(Long boardId, String status) {
        return cardRepository.findByBoardIdAndStatusOrderByOrderIndexAsc(boardId, status)
                .stream()
                .map(CardResponseDto::from)
                .toList();
    }

    public CardResponseDto findById(Long id) {
        return cardRepository.findById(id)
                .map(CardResponseDto::from)
                .orElseThrow(() -> new IllegalArgumentException("Card not found: " + id));
    }
}
