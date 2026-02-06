import type { BudgetItem } from "@/types/budget";
import { useState, useEffect, useMemo, useCallback } from "react";
import { BudgetTable } from "@/components/common/BudgetTable";
import { BudgetForm } from "@/components/common/BudgetForm";
import { BudgetStats } from "@/components/common/BudgetStats";
import { DateRangeFilter } from "@/components/common/DateRangeFilter";
import { CategoryPieChart } from "@/components/common/CategoryPieChart";
import { Spinner } from "@/components/ui/spinner";
import { Header } from "@/components/common/Header";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import {
  getBudgetData,
  addBudgetItem,
  removeBudgetItem,
} from "@/services/budgetService";

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

  const parseDate = (dateStr: string): string => {
    if (dateStr.includes("/")) {
      const [d, m, y] = dateStr.split("/");
      return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
    }
    return dateStr.split("T")[0];
  };

  const filteredBudgets = useMemo(() => {
    return budgets.filter((item) => {
      const itemDate = parseDate(item.Date);
      if (startDate && itemDate < startDate) return false;
      if (endDate && itemDate > endDate) return false;
      return true;
    });
  }, [budgets, startDate, endDate]);

  const load = useCallback(async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const data = await getBudgetData(userId);
      const normalizedData: BudgetItem[] = data.map((item) => ({
        ItemID: item.ItemID || 0,
        UserID: item.UserID,
        Title: item.Title || "No title",
        Category: item.Category || "General",
        Date: item.Date || new Date().toISOString(),
        Value: Number(item.Value) || 0,
      }));
      setBudgets(
        normalizedData.sort(
          (a, b) =>
            new Date(parseDate(b.Date)).getTime() -
            new Date(parseDate(a.Date)).getTime(),
        ),
      );
    } catch (err) {
      console.error("Dashboard load failed:", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    load();
  }, [load]);

  const handleAddItem = async (item: Omit<BudgetItem, "ItemID" | "UserID">) => {
    try {
      await addBudgetItem({
        ItemID: Date.now(), // More reliable ID for temporary frontend use
        UserID: userId,
        ...item,
      });
      await load();
    } catch (err) {
      console.error("Failed to add budget item:", err);
      // Fallback for user feedback could be added here
    }
  };

  const handleRemoveItem = async (id: number) => {
    try {
      if (!id) return;
      await removeBudgetItem(id.toString());
      setBudgets((prev) => prev.filter((b) => b.ItemID !== id));
    } catch (err) {
      console.error("Failed to remove budget item:", err);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans antialiased selection:bg-primary/10">
      <Header>
        <Button
          variant="ghost"
          size="sm"
          onClick={onLogout}
          className="text-muted-foreground hover:text-foreground transition-colors gap-2"
        >
          <LogOut className="size-4" />
          <span>Logout</span>
        </Button>
      </Header>

      <main className="container mx-auto px-4 md:px-6 lg:px-8 pb-10 space-y-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Dashboard
            </h2>
            <p className="text-muted-foreground">
              Manage your finances and track spending trends.
            </p>
          </div>
          <DateRangeFilter
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <div className="lg:col-span-4 h-full">
            <CategoryPieChart items={filteredBudgets} />
          </div>
          <div className="lg:col-span-3">
            <BudgetStats items={filteredBudgets} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold tracking-tight">
              Recent Transactions
            </h3>
          </div>

          <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden border-muted/40">
            <div className="p-6 border-b bg-muted/30 backdrop-blur-sm">
              <BudgetForm onAdd={handleAddItem} />
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4 bg-muted/5">
                <Spinner className="size-10 text-primary animate-spin" />
                <p className="text-sm text-muted-foreground font-medium animate-pulse">
                  Synchronizing with Google Sheets...
                </p>
              </div>
            ) : (
              <div className="animate-in fade-in duration-500">
                <BudgetTable
                  items={filteredBudgets}
                  onDelete={handleRemoveItem}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
