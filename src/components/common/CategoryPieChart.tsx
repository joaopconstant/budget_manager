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
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export function CategoryPieChart({ items }: Props) {
  const dataMap = new Map<string, number>();

  items.forEach((item) => {
    dataMap.set(item.category, (dataMap.get(item.category) ?? 0) + item.value);
  });

  const data: ChartData[] = Array.from(dataMap, ([name, value]) => ({
    name,
    value,
  })).sort((a, b) => b.value - a.value);

  if (data.length === 0) {
    return (
      <Card className="h-full shadow-sm flex flex-col items-center justify-center p-6 text-center text-muted-foreground bg-muted/20 border-border/50">
        <p>Nenhum dado para o período</p>
      </Card>
    );
  }

  return (
    <Card className="h-full shadow-sm flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-base font-medium">
          Gastos por Categoria
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-0 min-h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={2}
              stroke="none"
              cornerRadius={4}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  className="stroke-background hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border bg-popover p-2 shadow-sm text-popover-foreground">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            {data.name}
                          </span>
                          <span className="font-bold text-sm">
                            R$ {Number(data.value).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value) => (
                <span className="text-xs text-muted-foreground ml-1">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
