import type { BudgetItem } from "@/types/budget";
import { useEffect } from "react";
import { getBudgetData, addBudgetItem } from "@/services/budgetService";
import { useState } from "react";
import { BudgetTable } from "@/components/budgetTable";
import { BudgetForm } from "@/components/budgetForm";
import { BudgetStats } from "./components/budgetStats";

const USER_ID = "test";

function App() {
  const [budgets, setBudgets] = useState<BudgetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getBudgetData();
      const filteredData: BudgetItem[] = data
        .filter((item) => item.UserID === USER_ID)
        .map((item, index) => ({
          id: String(index),
          title: item.Title || "Sem título",
          category: item.Category || "Geral",
          date: item.Date || new Date().toISOString(),
          value: Number(item.Value) || 0,
        }));
      setBudgets(filteredData);
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar os dados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAddItem = async (item: Omit<BudgetItem, "id">) => {
    try {
      await addBudgetItem({
        UserID: USER_ID,
        Title: item.title,
        Category: item.category,
        Value: item.value,
        Date: item.date,
      });
      await load();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <div className="flex min-h-svh flex-col p-20">
      <h1>Budget Manager</h1>
      <BudgetStats items={budgets} />
      <BudgetForm onAdd={handleAddItem} />
      {!loading && <BudgetTable items={budgets} />}
    </div>
  );
}

export default App;
