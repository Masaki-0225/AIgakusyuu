import { useState } from "react";
import { updateCard, deleteCard } from "../api/cardApi";
import type { Card } from "../types/card";
import styles from "./CardEditModal.module.css";

type Props = {
  card: Card;
  onUpdated: () => void;
  onClose: () => void;
  onDeleted: () => void;
};

export default function CardEditModal({ card, onUpdated, onClose, onDeleted }: Props) {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description ?? "");
  const [dueDate, setDueDate] = useState(card.dueDate ?? "");
  const [priority, setPriority] = useState(card.priority ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      await updateCard(card.id, {
        title: title.trim(),
        description: description.trim() || undefined,
        dueDate: dueDate || undefined,
        priority: priority || undefined,
      });
      onUpdated();
      onClose();
    } catch {
      setError("更新に失敗しました。もう一度お試しください。");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm("このカードを削除しますか？")) return;
    setDeleting(true);
    setError(null);
    try {
      await deleteCard(card.id);
      onDeleted();
      onClose();
    } catch {
      setError("削除に失敗しました。もう一度お試しください。");
    } finally {
      setDeleting(false);
    }
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>カードを編集</h2>
          <button
            type="button"
            className={styles.deleteBtn}
            onClick={handleDelete}
            disabled={deleting || submitting}
            title="カードを削除"
          >
            🗑️
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            タイトル <span className={styles.required}>*</span>
            <input
              className={styles.input}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="タイトルを入力"
              autoFocus
            />
          </label>
          <label className={styles.label}>
            説明
            <textarea
              className={styles.textarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="説明を入力（任意）"
              rows={3}
            />
          </label>
          <label className={styles.label}>
            期限日
            <input
              className={styles.input}
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </label>
          <label className={styles.label}>
            優先度
            <select
              className={styles.select}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="">なし</option>
              <option value="高">高</option>
              <option value="中">中</option>
              <option value="低">低</option>
            </select>
          </label>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              キャンセル
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={!title.trim() || submitting}
            >
              {submitting ? "保存中..." : "保存"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
