package com.example.trello.service;

import com.example.trello.dto.CardCreateRequest;
import com.example.trello.dto.CardResponseDto;
import com.example.trello.entity.Board;
import com.example.trello.entity.Card;
import com.example.trello.repository.BoardRepository;
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
    private final BoardRepository boardRepository;

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

    @Transactional
    public CardResponseDto createCard(Long boardId, CardCreateRequest request) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new IllegalArgumentException("Board not found: " + boardId));

        List<Card> existing = cardRepository.findByBoardIdAndStatusOrderByOrderIndexAsc(boardId, "todo");
        int nextIndex = existing.isEmpty() ? 0 : existing.getLast().getOrderIndex() + 1;

        Card card = new Card();
        card.setBoard(board);
        card.setTitle(request.getTitle());
        card.setDescription(request.getDescription());
        card.setDueDate(request.getDueDate());
        card.setPriority(request.getPriority());
        card.setStatus("todo");
        card.setOrderIndex(nextIndex);

        return CardResponseDto.from(cardRepository.save(card));
    }
}
