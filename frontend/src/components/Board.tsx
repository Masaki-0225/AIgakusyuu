import { useEffect, useRef, useState } from "react";
import type { Card, CardStatus } from "../types/card";
import { getCardsByBoard, updateCardStatus } from "../api/cardApi";
import Column from "./Column";
import FilterBar, { type FilterValue } from "./FilterBar";
import CardEditModal from "./CardEditModal";
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
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const draggingCardId = useRef<number | null>(null);

  function fetchCards() {
    setLoading(true);
    setError(null);
    const status = filterStatus === "all" ? undefined : filterStatus;
    getCardsByBoard(BOARD_ID, status)
      .then(setCards)
      .catch(() => setError("カードの取得に失敗しました"))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchCards();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatus]);

  function handleCardClick(card: Card) {
    setEditingCard(card);
  }

  function handleDragStart(cardId: number) {
    draggingCardId.current = cardId;
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  async function handleDrop(targetStatus: CardStatus) {
    const cardId = draggingCardId.current;
    draggingCardId.current = null;
    if (cardId == null) return;
    const card = cards.find((c) => c.id === cardId);
    if (!card || card.status === targetStatus) return;
    try {
      await updateCardStatus(cardId, targetStatus);
      fetchCards();
    } catch {
      // ステータス更新失敗時は何もしない（UIは変化しない）
    }
  }

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
              status={key}
              cards={cards.filter((c) => c.status === key)}
              boardId={BOARD_ID}
              onCardCreated={fetchCards}
              onCardClick={handleCardClick}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
          ))}
        </div>
      )}
      {editingCard && (
        <CardEditModal
          card={editingCard}
          onUpdated={fetchCards}
          onClose={() => setEditingCard(null)}
          onDeleted={() => {
            setEditingCard(null);
            fetchCards();
          }}
        />
      )}
    </>
  );
}
