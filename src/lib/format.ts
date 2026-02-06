export function formatCurrency(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export function formatDate(dateStr: string) {
  if (!dateStr) return "N/A";

  // Handle DD/MM/YYYY format from Sheets
  if (dateStr.includes("/")) {
    const [d, m, y] = dateStr.split("/");
    if (d?.length <= 2 && m?.length <= 2 && y?.length === 4) {
      // Create a valid date object to ensure it's a real date
      const date = new Date(Number(y), Number(m) - 1, Number(d));
      if (!isNaN(date.getTime())) {
        return new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).format(date);
      }
    }
  }

  const d = new Date(dateStr);
  return isNaN(d.getTime())
    ? dateStr
    : new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(d);
}
