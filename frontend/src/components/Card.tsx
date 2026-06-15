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
};

export default function Card({ card }: Props) {
  return (
    <div className={styles.card}>
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
      </div>
    </div>
  );
}
