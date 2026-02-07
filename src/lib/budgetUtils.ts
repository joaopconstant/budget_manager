import type { BudgetItem } from "@/types/budget";
import { parseDate, compareDates } from "./dateUtils";


// Budget data utility functions
// Business logic for budget data manipulation


// Normalizes raw budget data from API
export function normalizeBudgetData(data: BudgetItem[]): BudgetItem[] {
  const normalized = data.map((item) => ({
    ItemID: item.ItemID || 0,
    UserID: item.UserID,
    Title: item.Title || "No title",
    Category: item.Category || "General",
    Date: item.Date || new Date().toISOString(),
    Value: Number(item.Value) || 0,
  }));

  return sortBudgetsByDate(normalized);
}


// Sorts budget items by date (newest first)
export function sortBudgetsByDate(budgets: BudgetItem[]): BudgetItem[] {
  return [...budgets].sort((a, b) => {
    const dateA = parseDate(a.Date);
    const dateB = parseDate(b.Date);
    return -compareDates(dateA, dateB); // Negative for descending order
  });
}

// Filters budget items by date range
export function filterBudgetsByDateRange(
  items: BudgetItem[],
  startDate: string | null,
  endDate: string | null,
): BudgetItem[] {
  return items.filter((item) => {
    const itemDate = parseDate(item.Date);
    if (startDate && itemDate < startDate) return false;
    if (endDate && itemDate > endDate) return false;
    return true;
  });
}

// Calculates total value of budget items
export function calculateTotal(items: BudgetItem[]): number {
  return items.reduce((acc, item) => acc + item.Value, 0);
}

// Calculates average value of budget items
export function calculateAverage(items: BudgetItem[]): number {
  if (items.length === 0) return 0;
  return calculateTotal(items) / items.length;
}

// Groups budget items by category with totals
export function groupByCategory(items: BudgetItem[]): Map<string, number> {
  const categoryMap = new Map<string, number>();

  items.forEach((item) => {
    const currentTotal = categoryMap.get(item.Category) ?? 0;
    categoryMap.set(item.Category, currentTotal + item.Value);
  });

  return categoryMap;
}
