import type { BudgetItem } from "@/types/budget";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
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
  const [value, setValue] = useState<number>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!title || !category || !value) return;

    setLoading(true);
    try {
      await onAdd({
        Title: title,
        Category: category,
        Value: value,
        Date: new Date().toLocaleDateString("en-US"),
      });
      setTitle("");
      setCategory("");
      setValue(undefined);
    } catch (error) {
      console.error(error);
      alert("Error adding item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Category" />
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
        placeholder="Value"
        value={
          value !== undefined
            ? new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(value)
            : ""
        }
        onChange={(e) => {
          const numericValue = Number(e.target.value.replace(/\D/g, "")) / 100;
          setValue(numericValue);
        }}
        required
      />
      <Button
        type="submit"
        disabled={loading}
        className="w-full md:w-auto flex items-center gap-2"
      >
        {loading ? (
          <>
            <Spinner className="size-4 animate-spin text-current" />
            <span>Adding...</span>
          </>
        ) : (
          "Add"
        )}
      </Button>
    </form>
  );
}
