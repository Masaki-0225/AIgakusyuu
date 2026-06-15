import axios from "axios";
import type { Card, CardStatus } from "../types/card";

export async function getCardsByBoard(boardId: number, status?: CardStatus): Promise<Card[]> {
  const params = status ? { status } : {};
  const { data } = await axios.get<Card[]>(`/api/boards/${boardId}/cards`, { params });
  return data;
}

export async function createCard(
  boardId: number,
  body: { title: string; description?: string; dueDate?: string; priority?: string }
): Promise<Card> {
  const { data } = await axios.post<Card>(`/api/boards/${boardId}/cards`, body);
  return data;
}
