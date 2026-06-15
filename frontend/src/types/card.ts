export type CardStatus = "todo" | "in_progress" | "done";

export type Card = {
  id: number;
  boardId: number;
  title: string;
  description: string | null;
  dueDate: string | null;
  priority: string | null;
  status: CardStatus;
  orderIndex: number;
};
