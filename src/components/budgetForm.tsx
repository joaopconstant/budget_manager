import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  onAdd: (item: {
    title: string;
    category: string;
    value: number;
    date: string;
  }) => Promise<void>;
};

export function BudgetForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!title || !category || !value) return;

    setLoading(true);
    try {
      await onAdd({
        title,
        category,
        value: Number(value),
        date: new Date().toISOString().split("T")[0],
      });
      setTitle("");
      setCategory("");
      setValue("");
    } catch (error) {
      console.error(error);
      alert("Erro ao adicionar item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <Input
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Select value={category} onValueChange={setCategory} required>
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
        type="number"
        step="0.01"
        placeholder="Valor"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Adicionando..." : "Adicionar"}
      </Button>
    </form>
  );
}
