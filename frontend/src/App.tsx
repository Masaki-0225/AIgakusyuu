import Board from "./components/Board";
import styles from "./App.module.css";

const TODAY = new Date().toLocaleDateString("ja-JP", {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "short",
});

export default function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <span>MyTrelloアプリ１号</span>
        <span className={styles.today}>{TODAY}</span>
      </header>
      <main className={styles.main}>
        <Board />
      </main>
    </div>
  );
}
