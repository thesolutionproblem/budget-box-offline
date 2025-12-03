import { NetworkStatus } from './NetworkStatus';
import { Box } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary">
            <Box className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold tracking-tight">BudgetBox</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">Offline-First Budgeting</p>
          </div>
        </div>
        
        <NetworkStatus />
      </div>
    </header>
  );
}
