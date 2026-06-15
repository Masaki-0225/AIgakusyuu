import type { Card as CardType } from "../types/card";
import Card from "./Card";
import styles from "./Column.module.css";

type Props = {
  title: string;
  cards: CardType[];
};

export default function Column({ title, cards }: Props) {
  return (
    <div className={styles.column}>
      <div className={styles.header}>
        <span className={styles.columnTitle}>{title}</span>
        <span className={styles.count}>{cards.length}</span>
      </div>
      <div className={styles.cardList}>
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
