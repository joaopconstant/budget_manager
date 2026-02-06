import { Input } from "@/components/ui/input";
import { Calendar as CalendarIcon } from "lucide-react";

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
    <div className="flex gap-2">
      <div className="relative">
        <Input
          type="date"
          className="[&::-webkit-calendar-picker-indicator]:opacity-0"
          max={new Date().toISOString().split("T")[0]}
          value={startDate ?? ""}
          onChange={(e) => onStartDateChange(e.target.value || null)}
        />
        <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary pointer-events-none" />
      </div>

      <div className="relative">
        <Input
          type="date"
          className="[&::-webkit-calendar-picker-indicator]:opacity-0"
          max={new Date().toISOString().split("T")[0]}
          value={endDate ?? ""}
          onChange={(e) => onEndDateChange(e.target.value || null)}
        />
        <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary pointer-events-none" />
      </div>
    </div>
  );
}
