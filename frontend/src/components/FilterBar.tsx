import type { CardStatus } from "../types/card";
import styles from "./FilterBar.module.css";

export type FilterValue = CardStatus | "all";

type Props = {
  current: FilterValue;
  onChange: (value: FilterValue) => void;
};

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: "all",         label: "全て" },
  { value: "todo",        label: "未着手" },
  { value: "in_progress", label: "進行中" },
  { value: "done",        label: "完了" },
];

export default function FilterBar({ current, onChange }: Props) {
  return (
    <div className={styles.filterBar}>
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          className={`${styles.btn} ${current === value ? styles.active : ""}`}
          onClick={() => onChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
