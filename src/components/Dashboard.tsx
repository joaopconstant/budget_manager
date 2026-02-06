import type { BudgetItem } from "@/types/budget";
import { useState, useEffect, useMemo } from "react";
import { getBudgetData, addBudgetItem } from "@/services/budgetService";
import { BudgetTable } from "@/components/common/BudgetTable";
import { BudgetForm } from "@/components/common/BudgetForm";
import { BudgetStats } from "@/components/common/BudgetStats";
import { DateRangeFilter } from "@/components/common/DateRageFilter";
import { CategoryPieChart } from "@/components/common/CategoryPieChart";
import { Spinner } from "@/components/ui/spinner";

interface DashboardProps {
  userId: string;
}

export function Dashboard({ userId }: DashboardProps) {
  const [budgets, setBudgets] = useState<BudgetItem[]>([]);
  const [loading, setLoading] = useState(false);
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
      const data = await getBudgetData(userId);
      const filteredData: BudgetItem[] = data.map((item, index) => ({
        id: index,
        title: item.Title || "Sem título",
        category: item.Category || "Geral",
        date: item.Date || new Date().toLocaleDateString("pt-BR"),
        value: Number(item.Value) || 0,
      }));
      setBudgets(filteredData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [userId]);

  const handleAddItem = async (item: Omit<BudgetItem, "id">) => {
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

  return (
    <div className="flex min-h-svh flex-col p-20 gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Budget Manager</h1>
        <div className="text-sm text-muted-foreground">
          Logado como: {userId}
        </div>
      </div>

      <DateRangeFilter
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 gap-3 border rounded-xl bg-slate-50/50">
          <Spinner className="size-10 text-primary" />
          <p className="text-sm text-muted-foreground animate-pulse font-medium">
            Carregando painel...
          </p>
        </div>
      ) : (
        <>
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
