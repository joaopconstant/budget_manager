import type { BudgetItem } from "@/types/budget";
import { useState, useEffect, useMemo } from "react";
import { getBudgetData, addBudgetItem } from "@/services/budgetService";
import { BudgetTable } from "@/components/common/BudgetTable";
import { BudgetForm } from "@/components/common/BudgetForm";
import { BudgetStats } from "@/components/common/BudgetStats";
import { DateRangeFilter } from "@/components/common/DateRageFilter";
import { CategoryPieChart } from "@/components/common/CategoryPieChart";
import { Spinner } from "@/components/ui/spinner";
import { Header } from "@/components/common/Header";
import { Button } from "@/components/ui/button";

interface DashboardProps {
  userId: string;
  onLogout: () => void;
}

export function Dashboard({ userId, onLogout }: DashboardProps) {
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
    <div className="min-h-svh bg-background font-sans antialiased">
      <Header>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="text-muted-foreground hover:text-foreground"
          >
            Sair
          </Button>
        </div>
      </Header>

      <main className="container mx-auto px-4 md:px-6 lg:px-8 pb-10 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Visão Geral</h2>
            <p className="text-muted-foreground">
              Acompanhe seus gastos e estatísticas.
            </p>
          </div>
          <DateRangeFilter
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 border border-dashed rounded-xl bg-card/50">
            <Spinner className="size-10 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground animate-pulse font-medium">
              Atualizando dados...
            </p>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in-50 duration-500 slide-in-from-bottom-5">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="lg:col-span-4">
                <CategoryPieChart items={filteredBudgets} />
              </div>
              <div className="lg:col-span-3">
                <BudgetStats items={filteredBudgets} />
              </div>
            </div>

            <div className="grid gap-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold tracking-tight">
                  Lançamentos
                </h3>
              </div>
              <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
                <div className="p-6 border-b bg-muted/20">
                  <BudgetForm onAdd={handleAddItem} />
                </div>
                <BudgetTable userId={userId} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
