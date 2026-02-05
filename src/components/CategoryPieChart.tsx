import type { BudgetItem } from "@/types/budget";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  items: BudgetItem[];
};

type ChartData = {
  name: string;
  value: number;
};

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

export function CategoryPieChart({ items }: Props) {
  const dataMap = new Map<string, number>();

  items.forEach((item) => {
    dataMap.set(item.category, (dataMap.get(item.category) ?? 0) + item.value);
  });

  const data: ChartData[] = Array.from(dataMap, ([name, value]) => ({
    name,
    value,
  }));

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gastos por categoria</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Nenhum dado para o período selecionado
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gastos por categoria</CardTitle>
      </CardHeader>

      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: any) => `R$ ${Number(value).toFixed(2)}`}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
