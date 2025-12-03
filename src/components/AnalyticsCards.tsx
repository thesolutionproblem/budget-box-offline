import { useBudgetStore } from '@/stores/budgetStore';
import { TrendingUp, TrendingDown, Percent, PiggyBank } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AnalyticsCards() {
  const { getAnalytics, budget, isHydrated } = useBudgetStore();
  
  if (!isHydrated) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-muted rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  const analytics = getAnalytics();
  const hasIncome = budget.income > 0;

  const cards = [
    {
      title: 'Total Expenses',
      value: `$${analytics.totalExpenses.toLocaleString()}`,
      icon: TrendingDown,
      iconBg: 'bg-destructive/10',
      iconColor: 'text-destructive',
      subtitle: hasIncome 
        ? `${((analytics.totalExpenses / budget.income) * 100).toFixed(0)}% of income`
        : 'Set income to see ratio',
    },
    {
      title: 'Burn Rate',
      value: `${(analytics.burnRate * 100).toFixed(0)}%`,
      icon: Percent,
      iconBg: analytics.burnRate > 0.9 ? 'bg-destructive/10' : analytics.burnRate > 0.7 ? 'bg-warning/10' : 'bg-success/10',
      iconColor: analytics.burnRate > 0.9 ? 'text-destructive' : analytics.burnRate > 0.7 ? 'text-warning' : 'text-success',
      subtitle: analytics.burnRate > 0.9 ? 'Critical' : analytics.burnRate > 0.7 ? 'High' : 'Healthy',
    },
    {
      title: 'Savings Potential',
      value: `$${Math.abs(analytics.savingsPotential).toLocaleString()}`,
      icon: PiggyBank,
      iconBg: analytics.savingsPotential >= 0 ? 'bg-success/10' : 'bg-destructive/10',
      iconColor: analytics.savingsPotential >= 0 ? 'text-success' : 'text-destructive',
      subtitle: analytics.savingsPotential >= 0 ? 'Monthly savings' : 'Monthly deficit',
      isNegative: analytics.savingsPotential < 0,
    },
    {
      title: 'Month-End Balance',
      value: `$${Math.abs(analytics.monthEndPrediction).toLocaleString()}`,
      icon: TrendingUp,
      iconBg: analytics.monthEndPrediction >= 0 ? 'bg-success/10' : 'bg-destructive/10',
      iconColor: analytics.monthEndPrediction >= 0 ? 'text-success' : 'text-destructive',
      subtitle: analytics.monthEndPrediction >= 0 ? 'Projected surplus' : 'Projected shortfall',
      isNegative: analytics.monthEndPrediction < 0,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <div
          key={card.title}
          className="stat-card animate-slide-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground font-medium">{card.title}</p>
              <p className={cn(
                'text-2xl font-display font-bold',
                card.isNegative && 'text-destructive'
              )}>
                {card.isNegative && '-'}{card.value}
              </p>
              <p className="text-xs text-muted-foreground">{card.subtitle}</p>
            </div>
            <div className={cn('p-3 rounded-xl', card.iconBg)}>
              <card.icon className={cn('w-5 h-5', card.iconColor)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
