package com.example.trello.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@Entity
@Table(name = "cards")
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id", nullable = false)
    private Board board;

    @Column(nullable = false)
    private String title;

    @Column
    private String description;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column
    private String priority;

    @Column(nullable = false)
    private String status;

    @Column(name = "order_index", nullable = false)
    private Integer orderIndex;

    @Column(name = "completed_at")
    private LocalDate completedAt;
}
