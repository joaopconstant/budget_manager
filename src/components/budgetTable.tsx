import type { BudgetItem } from "@/types/budget"

type Props = {
  items: BudgetItem[]
}

export function BudgetTable({ items }: Props) {
  if (items.length === 0) {
    return <p>Nenhum dado encontrado</p>
  }

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          {item.title} | {item.category} | {item.date} | {item.value}
        </li>
      ))}
    </ul>
  )
}
