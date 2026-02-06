import type { BudgetItem } from "@/types/budget";
import { formatCurrency, formatDate } from "@/lib/format";
import { useEffect, useState } from "react";
import { getBudgetData } from "@/services/budgetService";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  userId: string | null;
  items?: BudgetItem[]; // Optional if we want to still support passing items
};

export function BudgetTable({ userId }: Props) {
  const [items, setItems] = useState<BudgetItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const load = async () => {
      try {
        setLoading(true);
        const data = await getBudgetData(userId!);
        const filteredData: BudgetItem[] = data.map((item, index) => ({
          id: index,
          title: item.Title || "Sem título",
          category: item.Category || "Geral",
          date: item.Date || new Date().toLocaleDateString("pt-BR"),
          value: Number(item.Value) || 0,
        }));
        setItems(filteredData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [userId]);

  if (!userId)
    return (
      <div className="p-4 text-center">Faça login para ver seu orçamento.</div>
    );
  if (loading)
    return (
      <div className="flex flex-col items-center justify-center p-8 gap-2">
        <Spinner className="size-8 text-primary" />
        <p className="text-sm text-muted-foreground animate-pulse">
          Carregando orçamento...
        </p>
      </div>
    );

  return (
    <Table>
      {items.length === 0 && (
        <TableCaption>Nenhum dado encontrado</TableCaption>
      )}
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Data</TableHead>
          <TableHead className="text-right">Valor</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {items.map((item, index) => (
          <TableRow key={index} className="hover:bg-muted/50 transition-colors">
            <TableCell className="font-medium text-foreground">
              {item.title}
            </TableCell>
            <TableCell>
              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                {item.category}
              </span>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {formatDate(item.date)}
            </TableCell>
            <TableCell className="text-right font-medium">
              {formatCurrency(item.value)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
