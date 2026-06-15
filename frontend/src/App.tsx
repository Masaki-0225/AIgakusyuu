import Board from "./components/Board";
import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>MyTrelloアプリ１号</header>
      <main className={styles.main}>
        <Board />
      </main>
    </div>
  );
}
