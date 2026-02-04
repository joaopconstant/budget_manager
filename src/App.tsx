import { useEffect } from "react";
import { getBudgetData } from "@/services/budgetService";
import type { BudgetItem } from "@/types/budget";
import { useState } from "react";

// const USER_ID = "test";

function App() {
  const [budgets, setBudgets] = useState<BudgetItem[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getBudgetData();
      const filteredData = data
        // .filter((item) => item.UserID === USER_ID)
        .map((item) => ({
          ...item,
          Value: Number(item.Value),
        }));
      setBudgets(filteredData);
      console.log(filteredData);
    }
    load();
  }, []);

  return (
    <div className="flex min-h-svh flex-col">
      <h1>Budget Manager</h1>
    </div>
  );
}

export default App;
