import { Button } from "@/components/ui/button";
import { Header } from "@/components/common/Header";

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  return (
    <div className="flex min-h-svh flex-col p-20">
      <Header>
        <Button onClick={onLogin}>Entrar com Google</Button>
      </Header>

      <div className="flex flex-col items-center justify-center py-20 border rounded-lg bg-card">
        <p className="mb-4">
          Para gerenciar seu orçamento, você precisa se autenticar.
        </p>
        <Button size="lg" onClick={onLogin}>
          Fazer Login
        </Button>
      </div>
    </div>
  );
}
