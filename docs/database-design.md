# データベース設計

## ER図

```mermaid
erDiagram
    BOARD ||--o{ COLUMN : has
    COLUMN ||--o{ CARD : contains

    BOARD {
        int id PK
        string name
    }
    COLUMN {
        int id PK
        int board_id FK
        string name
        int order_index
    }
    CARD {
        int id PK
        int column_id FK
        string title
        string description
        date due_date
        string priority
        int order_index
    }
```

---

## テーブル定義

### boards テーブル

| カラム名 | 型 | 制約 | 説明 |
|----------|----|------|------|
| id | INTEGER | PK, AUTO INCREMENT | ボードID |
| name | TEXT | NOT NULL | ボード名 |

### columns テーブル

| カラム名 | 型 | 制約 | 説明 |
|----------|----|------|------|
| id | INTEGER | PK, AUTO INCREMENT | 列ID |
| board_id | INTEGER | FK → boards.id | 所属ボードID |
| name | TEXT | NOT NULL | 列名（未着手 / 進行中 / 完了） |
| order_index | INTEGER | NOT NULL | 列の表示順 |

### cards テーブル

| カラム名 | 型 | 制約 | 説明 |
|----------|----|------|------|
| id | INTEGER | PK, AUTO INCREMENT | カードID |
| column_id | INTEGER | FK → columns.id | 所属列ID |
| title | TEXT | NOT NULL | タスクのタイトル |
| description | TEXT | | 説明文（任意） |
| due_date | DATE | | 期限日（任意） |
| priority | TEXT | | 優先度：high / medium / low（任意） |
| order_index | INTEGER | NOT NULL | 列内での表示順 |

---

## 補足

- データベースエンジンは PostgreSQL 15 を使用する
- マイグレーションは Flyway で管理し、Spring Boot 起動時に自動実行される
  - `V1__create_tables.sql`: boards / columns / cards テーブル作成
  - `V2__insert_initial_data.sql`: board 1件・column 3件（未着手/進行中/完了）の初期データ投入
- 初期データ挿入後は boards・columns テーブルは追加・変更しない前提（固定3列）
- 詳細なインデックス設計は実装フェーズで定義する
