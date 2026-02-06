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
        Date: new Date().toLocaleDateString("pt-BR"),
      });
      setTitle("");
      setCategory("");
      setValue(undefined);
    } catch (error) {
      console.error(error);
      alert("Erro ao adicionar item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
      <Input
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Categoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Moradia">Moradia</SelectItem>
          <SelectItem value="Alimentação">Alimentação</SelectItem>
          <SelectItem value="Transporte">Transporte</SelectItem>
          <SelectItem value="Lazer">Lazer</SelectItem>
          <SelectItem value="Saúde">Saúde</SelectItem>
          <SelectItem value="Outros">Outros</SelectItem>
        </SelectContent>
      </Select>
      <Input
        type="text"
        placeholder="Valor"
        value={
          value !== undefined
            ? new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
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
            <span>Adicionando...</span>
          </>
        ) : (
          "Adicionar"
        )}
      </Button>
    </form>
  );
}
