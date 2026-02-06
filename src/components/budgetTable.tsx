import type { BudgetItem } from "@/types/budget";
import { formatCurrency, formatDate } from "@/lib/format";
import { useEffect, useState } from "react";
import { getBudgetData } from "@/services/budgetService";
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
        const data = await getBudgetData();
        const filteredData: BudgetItem[] = data
          .filter((item) => item.UserID === userId)
          .map((item, index) => ({
            id: String(index),
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
  if (loading) return <div className="p-4 text-center">Carregando...</div>;

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
