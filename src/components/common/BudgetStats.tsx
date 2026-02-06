import type { BudgetItem } from "@/types/budget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, ReceiptText, TrendingDown } from "lucide-react";
import { formatCurrency } from "@/lib/format";

type Props = {
  items: BudgetItem[];
};

export function BudgetStats({ items }: Props) {
  const total = items.reduce((acc, item) => acc + item.value, 0);
  const average = items.length > 0 ? total / items.length : 0;

  return (
    <div className="flex flex-col gap-4">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Gastos</CardTitle>
          <Wallet className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(total)}</div>
          <p className="text-xs text-muted-foreground">
            Soma de todos os registros
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Lançamentos</CardTitle>
          <ReceiptText className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{items.length}</div>
          <p className="text-xs text-muted-foreground">Registros no período</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Média por Gasto</CardTitle>
          <TrendingDown className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(average)}</div>
          <p className="text-xs text-muted-foreground">
            Valor médio das transações
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
