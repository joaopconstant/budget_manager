import type { BudgetItem } from "@/types/budget";
import { useEffect, useMemo } from "react";
import { getBudgetData, addBudgetItem } from "@/services/budgetService";
import { useState } from "react";
import { BudgetTable } from "@/components/BudgetTable";
import { BudgetForm } from "@/components/BudgetForm";
import { BudgetStats } from "@/components/BudgetStats";
import { DateRangeFilter } from "@/components/DateRageFilter";
import { CategoryPieChart } from "@/components/CategoryPieChart";
import { useAuth } from "@/services/authService";
import { Button } from "@/components/ui/button";

function App() {
  const { authenticateUser } = useAuth();
  const [userId, setUserId] = useState<string | null>(null);
  const [budgets, setBudgets] = useState<BudgetItem[]>([]);
  const [loading, setLoading] = useState(false);
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
    if (!userId) return;
    try {
      setLoading(true);
      const data = await getBudgetData();
      const filteredData: BudgetItem[] = data
        .filter((item) => item.UserID === userId)
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
    if (userId) {
      load();
    }
  }, [userId]);

  const handleAddItem = async (item: Omit<BudgetItem, "id">) => {
    if (!userId) return;
    try {
      await addBudgetItem({
        UserID: userId,
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

  const handleLogin = async () => {
    try {
      const id = await authenticateUser();
      setUserId(id);
    } catch (err) {
      console.error("Auth failed", err);
    }
  };

  return (
    <div className="flex min-h-svh flex-col p-20 gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Budget Manager</h1>
        {!userId ? (
          <Button onClick={handleLogin}>Entrar com Google</Button>
        ) : (
          <div className="text-sm text-muted-foreground">
            Logado como: {userId}
          </div>
        )}
      </div>

      {!userId ? (
        <div className="flex flex-col items-center justify-center py-20 border rounded-lg bg-slate-50">
          <p className="mb-4">
            Para gerenciar seu orçamento, você precisa se autenticar.
          </p>
          <Button size="lg" onClick={handleLogin}>
            Fazer Login
          </Button>
        </div>
      ) : (
        <>
          <DateRangeFilter
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CategoryPieChart items={filteredBudgets} />
            <BudgetStats items={filteredBudgets} />
          </div>
          <BudgetForm onAdd={handleAddItem} />
          <BudgetTable userId={userId} />
        </>
      )}
    </div>
  );
}

export default App;
