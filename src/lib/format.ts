export function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatDate(date: string) {
  if (date.includes("/")) {
    const [d, m, y] = date.split("/");
    if (d?.length <= 2 && m?.length <= 2 && y?.length === 4) {
      return date;
    }
  }
  const d = new Date(date);
  return isNaN(d.getTime()) ? date : new Intl.DateTimeFormat("pt-BR").format(d);
}
