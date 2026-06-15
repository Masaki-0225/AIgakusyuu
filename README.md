# MyTrelloアプリ１号

Trelloライクなタスク管理ボードアプリ。React + Spring Boot + PostgreSQL によるフルスタック構成。

---

## 技術スタック

| レイヤー | 技術 | バージョン |
|----------|------|-----------|
| フロントエンド | React + TypeScript + Vite | 18.3.1 / 5.8.3 / 6.4.3 |
| バックエンド | Java + Spring Boot | 25 / 4.0.0 |
| データベース | PostgreSQL | 15 |
| インフラ | Docker / Docker Compose | — |

詳細は [docs/tech-stack.md](docs/tech-stack.md) を参照。

---

## ローカル開発環境のセットアップ

### 前提条件

- Docker Desktop がインストール・起動済みであること
- Java 25 がインストール済みであること
- Node.js（npm）がインストール済みであること

### 1. リポジトリのクローン

```bash
git clone https://github.com/Masaki-0225/AIgakusyuu.git
cd AIgakusyuu
```

### 2. PostgreSQL の起動

```bash
docker compose up -d
```

| 項目 | 値 |
|------|----|
| ホスト | localhost |
| ポート | 5432 |
| データベース名 | trello_db |
| ユーザー | trello_user |
| パスワード | trello_pass |

### 3. バックエンドの起動

```bash
cd backend
./gradlew bootRun
```

起動後、`http://localhost:8080` で待ち受けます。  
Flyway により DB マイグレーションとサンプルデータの投入が自動実行されます。

### 4. フロントエンドの起動

```bash
cd frontend
npm install   # 初回のみ
npm run dev
```

起動後、`http://localhost:5173` をブラウザで開きます。

---

## ディレクトリ構成

```
/
├── backend/                        # Spring Boot バックエンド
│   └── src/main/java/com/example/trello/
│       ├── controller/             # REST コントローラー
│       ├── service/                # ビジネスロジック
│       ├── repository/             # Spring Data JPA リポジトリ
│       ├── entity/                 # JPA エンティティ
│       ├── dto/                    # レスポンス DTO
│       └── config/                 # CORS 設定
│   └── src/main/resources/
│       └── db/migration/           # Flyway マイグレーション SQL
├── frontend/                       # React フロントエンド
│   └── src/
│       ├── components/             # Board / Column / Card / FilterBar
│       ├── api/                    # Axios API クライアント
│       └── types/                  # TypeScript 型定義
├── docs/                           # 設計ドキュメント
│   ├── requirements.md             # 要件定義
│   ├── functional-requirements.md  # 機能要件・ユースケース
│   ├── screen-design.md            # 画面設計
│   ├── database-design.md          # DB 設計・ER 図
│   └── tech-stack.md               # 技術スタック
├── docker-compose.yml              # PostgreSQL Docker 設定
└── CLAUDE.md                       # Claude Code 行動規約
```

---

## API エンドポイント（実装済み）

| メソッド | パス | 説明 |
|----------|------|------|
| GET | `/api/boards/{boardId}/cards` | ボードのカード一覧を取得 |
| GET | `/api/boards/{boardId}/cards?status={status}` | ステータスでフィルタリング（`todo` / `in_progress` / `done`） |
| GET | `/api/cards/{id}` | カード詳細を取得 |

---

## 機能一覧

### 実装済み

- カンバンボード表示（未着手 / 進行中 / 完了 の3カラム）
- ステータスフィルター（全て / 未着手 / 進行中 / 完了）
- カードのデータ永続化（PostgreSQL）

### 今後実装予定

- カードの追加 / 編集 / 削除
- ドラッグ&ドロップによるカードの列間移動・並び替え
- 優先度・期日によるソート

詳細は [docs/functional-requirements.md](docs/functional-requirements.md) を参照。

---

## ドキュメント

| ドキュメント | 内容 |
|-------------|------|
| [要件定義](docs/requirements.md) | プロジェクト概要・非機能要件・制約 |
| [機能要件](docs/functional-requirements.md) | 機能要件・ユースケース・操作フロー |
| [画面設計](docs/screen-design.md) | 画面構成・UI 要素定義 |
| [データベース設計](docs/database-design.md) | ER 図・テーブル定義 |
| [技術スタック](docs/tech-stack.md) | 使用技術・バージョン・システム構成 |

---

## 開発ルール

Issue 先行・ブランチ戦略・コミットメッセージ規則などの開発ルールは [CLAUDE.md](CLAUDE.md) を参照。
