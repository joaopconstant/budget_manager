const API_URL = import.meta.env.VITE_SHEETS_API_URL as string;

export type BudgetItem = {
  UserID: string;
  Title: string;
  Category: string;
  Date: string;
  Value: number | string;
};

export async function getBudgetData(): Promise<BudgetItem[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Erro ao buscar dados do Sheets");
  }

  const data = await response.json();
  return data;
}
