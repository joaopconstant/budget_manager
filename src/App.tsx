import type { BudgetItem } from "@/types/budget";
import { useEffect, useMemo } from "react";
import { getBudgetData, addBudgetItem } from "@/services/budgetService";
import { useState } from "react";
import { BudgetTable } from "@/components/budgetTable";
import { BudgetForm } from "@/components/budgetForm";
import { BudgetStats } from "./components/budgetStats";
import { DateRangeFilter } from "./components/dateRageFilter";

const USER_ID = "test";

function App() {
  const [budgets, setBudgets] = useState<BudgetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(
    new Date().toISOString().split("T")[0],
  );

  const filteredBudgets = useMemo(() => {
    return budgets.filter((item) => {
      let itemDate = item.date;

      // Convert DD/MM/YYYY to YYYY-MM-DD for comparison
      if (itemDate.includes("/")) {
        const [d, m, y] = itemDate.split("/");
        itemDate = `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
      } else {
        itemDate = itemDate.split("T")[0];
      }

      if (startDate && itemDate < startDate) return false;
      if (endDate && itemDate > endDate) return false;
      return true;
    });
  }, [budgets, startDate, endDate]);

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
          date: item.Date || new Date().toLocaleDateString("pt-BR"),
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
      <DateRangeFilter
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />
      <BudgetStats items={filteredBudgets} />
      <BudgetForm onAdd={handleAddItem} />
      {!loading && <BudgetTable items={filteredBudgets} />}
    </div>
  );
}

export default App;
