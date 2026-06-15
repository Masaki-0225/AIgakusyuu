import { useState } from "react";
import { createCard } from "../api/cardApi";
import styles from "./CardCreateModal.module.css";

type Props = {
  boardId: number;
  onCreated: () => void;
  onClose: () => void;
};

export default function CardCreateModal({ boardId, onCreated, onClose }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      await createCard(boardId, {
        title: title.trim(),
        description: description.trim() || undefined,
        dueDate: dueDate || undefined,
        priority: priority || undefined,
      });
      onCreated();
      onClose();
    } catch {
      setError("登録に失敗しました。もう一度お試しください。");
    } finally {
      setSubmitting(false);
    }
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>カードを追加</h2>
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
              {submitting ? "登録中..." : "登録"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
