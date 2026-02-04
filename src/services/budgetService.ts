const API_URL = import.meta.env.VITE_SHEETS_API_URL as string;

export type APIBudgetItem = {
  UserID: string;
  Title: string;
  Category: string;
  Date: string;
  Value: number | string;
};

export async function getBudgetData(): Promise<APIBudgetItem[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Erro ao buscar dados do Sheets");
  }

  const data = await response.json();
  return data;
}

export async function addBudgetItem(item: APIBudgetItem) {
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
