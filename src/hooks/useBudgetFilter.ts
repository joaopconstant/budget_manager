import { useState, useMemo } from "react";
import type { BudgetItem } from "@/types/budget";
import { filterBudgetsByDateRange } from "@/lib/budgetUtils";
import { getTodayString } from "@/lib/dateUtils";

// Custom hook for managing budget date range filtering
// Handles date filter state and filtered results
export function useBudgetFilter(budgets: BudgetItem[]) {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(getTodayString());

  // Memoized filtered budgets based on date range
  const filteredBudgets = useMemo(() => {
    return filterBudgetsByDateRange(budgets, startDate, endDate);
  }, [budgets, startDate, endDate]);

  return {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    filteredBudgets,
  };
}
