import { useState } from "react";
import { useAuth } from "@/services/authService";
import { LandingPage } from "@/components/LandingPage";
import { Dashboard } from "@/components/Dashboard";
import { ThemeProvider } from "@/components/ui/theme-provider";

function App() {
  const { authenticateUser } = useAuth();
  const [userId, setUserId] = useState<string | null>(() =>
    localStorage.getItem("budget_user_id"),
  );

  const handleLogin = async () => {
    try {
      const id = await authenticateUser();
      localStorage.setItem("budget_user_id", id);
      setUserId(id);
    } catch (err) {
      console.error("Auth failed", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("budget_user_id");
    setUserId(null);
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      {!userId ? (
        <LandingPage onLogin={handleLogin} />
      ) : (
        <Dashboard userId={userId} onLogout={handleLogout} />
      )}
    </ThemeProvider>
  );
}

export default App;
