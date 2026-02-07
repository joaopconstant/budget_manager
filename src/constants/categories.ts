// Budget categories configuration
// Centralized list of available budget categories

export const BUDGET_CATEGORIES = [
  "Housing",
  "Food",
  "Transport",
  "Leisure",
  "Health",
  "Others",
] as const;

export type BudgetCategory = (typeof BUDGET_CATEGORIES)[number];
