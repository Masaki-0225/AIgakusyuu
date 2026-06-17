import type { Card as CardType } from "../types/card";
import styles from "./Card.module.css";

const PRIORITY_LABEL: Record<string, string> = {
  高: "高",
  中: "中",
  低: "低",
};

const PRIORITY_CLASS: Record<string, string> = {
  高: styles.priorityHigh,
  中: styles.priorityMid,
  低: styles.priorityLow,
};

type Props = {
  card: CardType;
  onClick?: () => void;
  onDragStart?: (cardId: number) => void;
};

function getDueDateClass(dueDate: string | null): string {
  if (!dueDate) return "";
  const today = new Date().toISOString().slice(0, 10);
  if (dueDate < today) return styles.overdue;
  if (dueDate === today) return styles.dueToday;
  return "";
}

export default function Card({ card, onClick, onDragStart }: Props) {
  const dueDateClass = getDueDateClass(card.dueDate);

  return (
    <div
      className={`${styles.card} ${dueDateClass}`}
      onClick={onClick}
      draggable
      onDragStart={(e) => { e.dataTransfer.effectAllowed = "move"; onDragStart?.(card.id); }}
    >
      <p className={styles.title}>{card.title}</p>
      <div className={styles.meta}>
        {card.priority && (
          <span className={`${styles.badge} ${PRIORITY_CLASS[card.priority] ?? ""}`}>
            {PRIORITY_LABEL[card.priority] ?? card.priority}
          </span>
        )}
        {card.dueDate && (
          <span className={styles.dueDate}>期限: {card.dueDate}</span>
        )}
        {card.completedAt && (
          <span className={styles.completedAt}>完了: {card.completedAt}</span>
        )}
      </div>
    </div>
  );
}
