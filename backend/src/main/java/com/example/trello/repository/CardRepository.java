package com.example.trello.repository;

import com.example.trello.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CardRepository extends JpaRepository<Card, Long> {
    List<Card> findByBoardIdOrderByStatusAscOrderIndexAsc(Long boardId);
    List<Card> findByBoardIdAndStatusOrderByOrderIndexAsc(Long boardId, String status);
}
