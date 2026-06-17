import { useState } from "react";
import type { Card as CardType, CardStatus } from "../types/card";
import Card from "./Card";
import CardCreateModal from "./CardCreateModal";
import styles from "./Column.module.css";

type Props = {
  title: string;
  status: CardStatus;
  cards: CardType[];
  boardId: number;
  onCardCreated: () => void;
  onCardClick: (card: CardType) => void;
  onDragStart: (cardId: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (targetStatus: CardStatus) => void;
};

export default function Column({
  title,
  status,
  cards,
  boardId,
  onCardCreated,
  onCardClick,
  onDragStart,
  onDragOver,
  onDrop,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  return (
    <div className={styles.column}>
      <div className={styles.header}>
        <span className={styles.columnTitle}>{title}</span>
        <span className={styles.count}>{cards.length}</span>
        {status === "todo" && (
          <button
            className={styles.addBtn}
            onClick={() => setShowModal(true)}
            title="カードを追加"
          >
            ＋
          </button>
        )}
      </div>
      <div
        className={`${styles.cardList} ${isDragOver ? styles.dragOver : ""}`}
        onDragOver={onDragOver}
        onDragEnter={() => setIsDragOver(true)}
        onDragLeave={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsDragOver(false);
          }
        }}
        onDrop={() => {
          setIsDragOver(false);
          onDrop(status);
        }}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => onCardClick(card)}
            onDragStart={onDragStart}
          />
        ))}
      </div>
      {showModal && (
        <CardCreateModal
          boardId={boardId}
          onCreated={onCardCreated}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
