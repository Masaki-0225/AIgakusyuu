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
};

export default function Column({ title, status, cards, boardId, onCardCreated }: Props) {
  const [showModal, setShowModal] = useState(false);

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
      <div className={styles.cardList}>
        {cards.map((card) => (
          <Card key={card.id} card={card} />
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
