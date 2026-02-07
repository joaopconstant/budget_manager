import { useState, useCallback } from "react";
import type { BudgetItem } from "@/types/budget";
import {
  getBudgetData,
  addBudgetItem,
  removeBudgetItem,
} from "@/services/budgetService";
import { normalizeBudgetData } from "@/lib/budgetUtils";

// Custom hook for managing budget data
// Handles fetching, adding, and removing budget items

export function useBudgetData(userId: string) {
  const [budgets, setBudgets] = useState<BudgetItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Loads budget data from the API
  const loadBudgets = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await getBudgetData(userId);
      const normalized = normalizeBudgetData(data);
      setBudgets(normalized);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load budget data";
      setError(errorMessage);
      console.error("Dashboard load failed:", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Adds a new budget item
  const addItem = useCallback(
    async (item: Omit<BudgetItem, "ItemID" | "UserID">) => {
      try {
        await addBudgetItem({
          ItemID: Date.now(), // Temporary ID for frontend use
          UserID: userId,
          ...item,
        });
        await loadBudgets();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to add budget item";
        setError(errorMessage);
        console.error("Failed to add budget item:", err);
        throw err; // Re-throw to allow component to handle
      }
    },
    [userId, loadBudgets],
  );

  // Removes a budget item by ID
  const removeItem = useCallback(async (id: number) => {
    if (!id) return;

    try {
      await removeBudgetItem(id.toString());
      setBudgets((prev) => prev.filter((b) => b.ItemID !== id));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to remove budget item";
      setError(errorMessage);
      console.error("Failed to remove budget item:", err);
      throw err; // Re-throw to allow component to handle
    }
  }, []);

  return {
    budgets,
    loading,
    error,
    loadBudgets,
    addItem,
    removeItem,
  };
}
