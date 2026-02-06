import type { BudgetItem } from "@/types/budget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, ReceiptText, TrendingDown } from "lucide-react";
import { formatCurrency } from "@/lib/format";

type Props = {
  items: BudgetItem[];
};

export function BudgetStats({ items }: Props) {
  const total = items.reduce((acc, item) => acc + item.Value, 0);
  const average = items.length > 0 ? total / items.length : 0;

  return (
    <div className="flex flex-col gap-4">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total of Expenses</CardTitle>
          <Wallet className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(total)}</div>
          <p className="text-xs text-muted-foreground">
            Sum of all payments
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Transactions</CardTitle>
          <ReceiptText className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{items.length}</div>
          <p className="text-xs text-muted-foreground">Records in the period</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Value</CardTitle>
          <TrendingDown className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(average)}</div>
          <p className="text-xs text-muted-foreground">
            Average value of payments
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
