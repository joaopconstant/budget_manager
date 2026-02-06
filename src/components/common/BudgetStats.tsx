import type { BudgetItem } from "@/types/budget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  items: BudgetItem[];
};

export function BudgetStats({ items }: Props) {
  const total = items.reduce((acc, item) => acc + item.value, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p>
          Total de gastos: <strong>R$ {total.toFixed(2)}</strong>
        </p>
        <p>
          Registros: <strong>{items.length}</strong>
        </p>
      </CardContent>
    </Card>
  );
}
