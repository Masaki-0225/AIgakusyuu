CREATE TABLE boards (
    id   BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE cards (
    id          BIGSERIAL PRIMARY KEY,
    board_id    BIGINT NOT NULL REFERENCES boards(id) ON DELETE CASCADE,
    title       TEXT NOT NULL,
    description TEXT,
    due_date    DATE,
    priority    TEXT,
    status      TEXT NOT NULL CHECK (status IN ('todo', 'in_progress', 'done')),
    order_index INTEGER NOT NULL
);

CREATE INDEX idx_cards_board_id ON cards(board_id);
CREATE INDEX idx_cards_status   ON cards(status);
