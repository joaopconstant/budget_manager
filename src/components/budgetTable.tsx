import type { BudgetItem } from "@/types/budget";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/format";

type Props = {
  items: BudgetItem[];
};

export function BudgetTable({ items }: Props) {
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
