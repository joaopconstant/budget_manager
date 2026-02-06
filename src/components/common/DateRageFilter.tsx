import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  startDate: string | null;
  endDate: string | null;
  onStartDateChange: (value: string | null) => void;
  onEndDateChange: (value: string | null) => void;
};

export function DateRangeFilter({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Período</CardTitle>
      </CardHeader>

      <CardContent className="flex gap-4">
        <Input
          type="date"
          max={new Date().toISOString().split("T")[0]}
          value={startDate ?? ""}
          onChange={(e) => onStartDateChange(e.target.value || null)}
        />

        <Input
          type="date"
          max={new Date().toISOString().split("T")[0]}
          value={endDate ?? ""}
          onChange={(e) => onEndDateChange(e.target.value || null)}
        />
      </CardContent>
    </Card>
  );
}
