import { ModeToggle } from "@/components/ui/mode-toggle";

interface HeaderProps {
  children?: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
    <header className="flex justify-between items-center w-full mb-8">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Budget Manager</h1>
      </div>
      <div className="flex items-center gap-4">
        {children}
        <ModeToggle />
      </div>
    </header>
  );
}
