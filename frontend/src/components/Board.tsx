import { useEffect, useState } from "react";
import type { Card, CardStatus } from "../types/card";
import { getCardsByBoard } from "../api/cardApi";
import Column from "./Column";
import FilterBar, { type FilterValue } from "./FilterBar";
import styles from "./Board.module.css";

const BOARD_ID = 1;

const COLUMNS: { key: CardStatus; label: string }[] = [
  { key: "todo",        label: "未着手" },
  { key: "in_progress", label: "進行中" },
  { key: "done",        label: "完了" },
];

export default function Board() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<FilterValue>("all");

  useEffect(() => {
    setLoading(true);
    setError(null);
    const status = filterStatus === "all" ? undefined : filterStatus;
    getCardsByBoard(BOARD_ID, status)
      .then(setCards)
      .catch(() => setError("カードの取得に失敗しました"))
      .finally(() => setLoading(false));
  }, [filterStatus]);

  const visibleColumns =
    filterStatus === "all"
      ? COLUMNS
      : COLUMNS.filter((col) => col.key === filterStatus);

  return (
    <>
      <FilterBar current={filterStatus} onChange={setFilterStatus} />
      {loading && <p className={styles.message}>読み込み中...</p>}
      {error && <p className={styles.message}>{error}</p>}
      {!loading && !error && (
        <div className={styles.board}>
          {visibleColumns.map(({ key, label }) => (
            <Column
              key={key}
              title={label}
              cards={cards.filter((c) => c.status === key)}
            />
          ))}
        </div>
      )}
    </>
  );
}
