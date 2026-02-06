import type { BudgetItem } from "@/types/budget";

const API_URL = import.meta.env.VITE_SHEETS_API_URL as string;

export async function getBudgetData(userId: string): Promise<BudgetItem[]> {
  const url = `${API_URL}?UserID=${encodeURIComponent(userId)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Erro ao buscar dados do Sheets");
  }

  const data = await response.json();
  return data;
}

export async function addBudgetItem(item: BudgetItem) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error("Erro ao adicionar item ao Sheets");
  }

  return response.json();
}

export async function removeBudgetItem(id: string) {
  const response = await fetch(`${API_URL}?ItemID=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao remover item do Sheets");
  }

  return response.text();
}
