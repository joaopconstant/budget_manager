
// Date utility functions
// Centralized date parsing and manipulation logic


// Parses a date string in DD/MM/YYYY or ISO format to YYYY-MM-DD
export function parseDate(dateStr: string): string {
  if (!dateStr) return "";

  // Handle DD/MM/YYYY format from Sheets
  if (dateStr.includes("/")) {
    const [d, m, y] = dateStr.split("/");
    return `${y}-${m?.padStart(2, "0")}-${d?.padStart(2, "0")}`;
  }

  // Handle ISO format
  return dateStr.split("T")[0];
}

// Gets today's date in YYYY-MM-DD format
export function getTodayString(): string {
  return new Date().toISOString().split("T")[0];
}

// Validates if a date string represents a valid date
export function isValidDate(dateStr: string): boolean {
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
}


// Compares two date strings
export function compareDates(date1: string, date2: string): number {
  return new Date(date1).getTime() - new Date(date2).getTime();
}
