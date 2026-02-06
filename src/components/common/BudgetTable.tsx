import type { BudgetItem } from "@/types/budget";
import { formatCurrency, formatDate } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
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
  items: BudgetItem[];
  onDelete: (id: number) => Promise<void>;
};

export function BudgetTable({ items, onDelete }: Props) {
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
          <TableHead className="w-12.5"></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {items.map((item, index) => (
          <TableRow key={index} className="hover:bg-muted/50 transition-colors">
            <TableCell className="font-medium text-foreground">
              {item.Title}
            </TableCell>
            <TableCell>
              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                {item.Category}
              </span>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {formatDate(item.Date)}
            </TableCell>
            <TableCell className="text-right font-medium">
              {formatCurrency(item.Value)}
            </TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive transition-colors"
                onClick={() => onDelete(item.ItemID!)}
                title="Remover item"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remover</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
