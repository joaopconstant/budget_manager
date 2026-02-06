import { ModeToggle } from "@/components/ui/mode-toggle";

interface HeaderProps {
  children?: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60 mb-8">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <div className="size-4 rounded-full bg-primary" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Budget Manager</h1>
        </div>
        <div className="flex items-center gap-4">
          {children}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
