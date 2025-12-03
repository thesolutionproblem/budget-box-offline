import { useBudgetStore } from '@/stores/budgetStore';
import { AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap = {
  danger: AlertTriangle,
  warning: AlertCircle,
  info: Info,
};

const styleMap = {
  danger: {
    bg: 'bg-destructive/10',
    border: 'border-destructive/30',
    icon: 'text-destructive',
    text: 'text-destructive',
  },
  warning: {
    bg: 'bg-warning/10',
    border: 'border-warning/30',
    icon: 'text-warning',
    text: 'text-warning',
  },
  info: {
    bg: 'bg-success/10',
    border: 'border-success/30',
    icon: 'text-success',
    text: 'text-success',
  },
};

export function WarningsPanel() {
  const { getWarnings, isHydrated, budget } = useBudgetStore();

  if (!isHydrated) {
    return (
      <div className="glass-card p-6">
        <div className="animate-pulse space-y-3">
          <div className="h-5 bg-muted rounded w-32" />
          <div className="h-16 bg-muted rounded" />
        </div>
      </div>
    );
  }

  const warnings = getWarnings();
  const hasExpenses = budget.bills + budget.food + budget.transport + budget.subscriptions + budget.misc > 0;

  if (!hasExpenses) {
    return (
      <div className="glass-card p-6">
        <h3 className="text-lg font-display font-semibold mb-4">Smart Insights</h3>
        <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
          <div className="p-2 rounded-full bg-muted">
            <Info className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">
            Add your income and expenses to receive personalized budget insights.
          </p>
        </div>
      </div>
    );
  }

  if (warnings.length === 0) {
    return (
      <div className="glass-card p-6">
        <h3 className="text-lg font-display font-semibold mb-4">Smart Insights</h3>
        <div className="flex items-center gap-3 p-4 rounded-lg bg-success/10 border border-success/30">
          <div className="p-2 rounded-full bg-success/20">
            <CheckCircle className="w-5 h-5 text-success" />
          </div>
          <p className="text-sm text-success">
            Your budget looks healthy! Keep up the good work.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-display font-semibold mb-4">Smart Insights</h3>
      <div className="space-y-3">
        {warnings.map((warning, index) => {
          const Icon = iconMap[warning.type];
          const styles = styleMap[warning.type];

          return (
            <div
              key={index}
              className={cn(
                'flex items-start gap-3 p-4 rounded-lg border animate-slide-up',
                styles.bg,
                styles.border
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={cn('p-2 rounded-full', styles.bg)}>
                <Icon className={cn('w-4 h-4', styles.icon)} />
              </div>
              <div className="flex-1">
                <p className={cn('text-sm font-medium', styles.text)}>
                  {warning.message}
                </p>
                {warning.category && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Category: {warning.category}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
