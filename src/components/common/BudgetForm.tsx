import type { BudgetItem } from "@/types/budget";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  onAdd: (item: Omit<BudgetItem, "ItemID" | "UserID">) => Promise<void>;
};

export function BudgetForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [value, setValue] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || value === "" || value <= 0) return;

    setLoading(true);
    try {
      await onAdd({
        Title: title.trim(),
        Category: category,
        Value: value,
        Date: new Date().toISOString(),
      });
      setTitle("");
      setCategory("");
      setValue("");
    } catch (error) {
      console.error("Failed to add item:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    if (!rawValue) {
      setValue("");
      return;
    }
    const numericValue = Number(rawValue) / 100;
    setValue(numericValue);
  };

  const displayValue =
    value === ""
      ? ""
      : new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(value);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col lg:flex-row gap-3 items-end lg:items-center"
    >
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className=""
      />

      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Housing">Housing</SelectItem>
          <SelectItem value="Food">Food</SelectItem>
          <SelectItem value="Transport">Transport</SelectItem>
          <SelectItem value="Leisure">Leisure</SelectItem>
          <SelectItem value="Health">Health</SelectItem>
          <SelectItem value="Others">Others</SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="text"
        placeholder="$0.00"
        value={displayValue}
        onChange={handleValueChange}
        required
        className="text-right font-medium"
      />

      <Button
        type="submit"
        disabled={loading || !title || !category || !value}
        className="w-full lg:w-auto px-6 font-semibold"
      >
        {loading ? (
          <Spinner className="size-4 animate-spin" />
        ) : (
          <div className="flex items-center gap-2">
            <Plus className="size-4" />
            <span>Add</span>
          </div>
        )}
      </Button>
    </form>
  );
}
