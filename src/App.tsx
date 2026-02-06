import { useState } from "react";
import { useAuth } from "@/services/authService";
import { LoginScreen } from "@/components/LoginScreen";
import { Dashboard } from "@/components/Dashboard";

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

  if (!userId) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return <Dashboard userId={userId} />;
}

export default App;
