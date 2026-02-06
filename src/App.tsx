import { useState } from "react";
import { useAuth } from "@/services/authService";
import { LoginScreen } from "@/components/LoginScreen";
import { Dashboard } from "@/components/Dashboard";
import { ThemeProvider } from "@/components/ui/theme-provider";

function App() {
  const { authenticateUser } = useAuth();
  const [userId, setUserId] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const id = await authenticateUser();
      setUserId(id);
    } catch (err) {
      console.error("Auth failed", err);
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {!userId ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <Dashboard userId={userId} />
      )}
    </ThemeProvider>
  );
}

export default App;
