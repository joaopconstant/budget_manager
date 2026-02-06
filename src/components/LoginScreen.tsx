import { Button } from "@/components/ui/button";

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  return (
    <div className="flex min-h-svh flex-col p-20 gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Budget Manager</h1>
        <Button onClick={onLogin}>Entrar com Google</Button>
      </div>

      <div className="flex flex-col items-center justify-center py-20 border rounded-lg bg-slate-50">
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
