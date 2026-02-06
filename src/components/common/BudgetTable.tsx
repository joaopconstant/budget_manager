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
  userId: number | null;
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
          <TableRow key={index}>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.category}</TableCell>
            <TableCell>{formatDate(item.date)}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(item.value)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
