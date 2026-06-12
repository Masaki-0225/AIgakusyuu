# CLAUDE.md — Claude Code 行動規約

このファイルはClaude Codeが本リポジトリで作業する際に必ず従うルールを定義します。

---

## 絶対ルール（違反禁止）

### ルール1: Issue先行原則

**いかなる実装・修正・ドキュメント変更においても、必ずGitHub Issueを先に作成すること。**

- コードを1行も書く前にIssueを作成する
- IssueにはやるべきことをTo-doリスト形式で明記する
- Issue番号が確定してからブランチを作成する

### ルール2: ブランチ命名規則

作業ブランチは必ず以下の形式で命名すること。`main` への直接コミットは禁止。

| 種別 | 命名形式 | 例 |
|------|----------|-----|
| 新機能 | `feature/#{issue番号}-{説明}` | `feature/#12-add-card-api` |
| バグ修正 | `fix/#{issue番号}-{説明}` | `fix/#15-card-delete-error` |
| ドキュメント | `docs/#{issue番号}-{説明}` | `docs/#8-update-readme` |
| リファクタリング | `refactor/#{issue番号}-{説明}` | `refactor/#20-extract-service` |

- `{説明}` は英語の小文字ケバブケース（例: `add-card-api`）
- スペース・日本語・大文字は使用しない

### ルール3: PRとIssueの紐づけ

PRの本文には必ず `Closes #Issue番号` を含めること。これによりPRマージ時にIssueが自動クローズされる。

---

## 開発ワークフロー

```
1. GitHub Issueを作成する（ラベル付け必須）
   ↓
2. Issue番号を確認してブランチを作成する
   git checkout -b feature/#{番号}-{説明}
   ↓
3. 実装・テスト
   ↓
4. コミット（Conventional Commits形式）
   git commit -m "feat: カード追加APIを実装 (#12)"
   ↓
5. プッシュしてPRを作成する
   gh pr create
   ↓
6. PRをレビュー（セルフレビューでも内容を確認）
   ↓
7. mainにマージ → Issueが自動クローズ
```

---

## コミットメッセージ規則

Conventional Commits形式を使用する。

| プレフィックス | 用途 |
|---------------|------|
| `feat:` | 新機能の追加 |
| `fix:` | バグ修正 |
| `docs:` | ドキュメント変更のみ |
| `refactor:` | 機能変更を伴わないリファクタリング |
| `test:` | テストコードの追加・変更 |
| `chore:` | ビルド設定・依存関係等の雑務 |

コミットメッセージは **日本語** で記述する。Issue番号を末尾に付与することを推奨。  
例: `feat: カード追加APIを実装 (#12)`

---

## プロジェクト概要（Claude Code 参照用）

| 項目 | 内容 |
|------|------|
| アプリ名 | MyTrelloアプリ１号 |
| フロントエンド | React 18 + Vite（未作成） |
| バックエンド | Java 25 + Spring Boot 4.0（`/backend`） |
| データベース | PostgreSQL 15（Docker Compose管理） |
| ORM | Spring Data JPA + Hibernate + Flyway |
| リポジトリ | https://github.com/Masaki-0225/AIgakusyuu |

### ディレクトリ構成

```
/
├── backend/          # Spring Boot バックエンド
│   ├── src/main/java/com/example/trello/
│   │   ├── entity/   # JPA エンティティ
│   │   └── repository/ # Spring Data JPA リポジトリ
│   └── src/main/resources/
│       └── db/migration/ # Flyway マイグレーション
├── docs/             # 設計ドキュメント
├── prototype/        # HTMLプロトタイプ
├── docker-compose.yml # PostgreSQL Docker設定
└── CLAUDE.md         # 本ファイル
```

### ローカル起動手順

```bash
# PostgreSQL起動
docker compose up -d

# バックエンド起動
cd backend && ./gradlew bootRun
```

---

## 禁止事項

- `main` ブランチへの直接 `git push` → PRを通すこと
- Issue番号なしのブランチ作成 → 必ずIssueを先に作る
- `git push --force` の使用 → 原則禁止（理由がある場合はユーザーに確認）
- 複数のIssue/機能を1つのブランチに混在させる → 1ブランチ1Issue原則

---

## GitHubラベル運用

| ラベル名 | 用途 |
|----------|------|
| `feature` | 新機能 |
| `bug` | バグ |
| `documentation` | ドキュメント |
| `refactor` | リファクタリング |
| `in-progress` | 作業中 |
