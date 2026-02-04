import { useEffect } from "react";
import { getBudgetData } from "@/services/budgetService";

function App() {
  useEffect(() => {
    async function load() {
      const data = await getBudgetData();
      console.log(data);
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
