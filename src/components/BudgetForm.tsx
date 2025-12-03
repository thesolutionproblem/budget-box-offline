import { BudgetInput } from './BudgetInput';
import { CATEGORY_LABELS, CATEGORY_ICONS } from '@/types/budget';
import { useBudgetStore } from '@/stores/budgetStore';
import { Wallet, TrendingDown } from 'lucide-react';

export function BudgetForm() {
  const { budget, isHydrated } = useBudgetStore();

  if (!isHydrated) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-24 bg-muted rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const totalExpenses = budget.bills + budget.food + budget.transport + budget.subscriptions + budget.misc;

  return (
    <div className="space-y-8">
      {/* Income Section */}
      <div className="animate-slide-up" style={{ animationDelay: '0ms' }}>
        <div className="flex items-center gap-2 mb-4">
          <Wallet className="w-5 h-5 text-success" />
          <h2 className="text-lg font-display font-semibold">Monthly Income</h2>
        </div>
        <BudgetInput
          field="income"
          label="Total Income"
          icon="💰"
          placeholder="Enter your monthly income"
          isIncome
        />
      </div>

      {/* Expenses Section */}
      <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-destructive" />
            <h2 className="text-lg font-display font-semibold">Monthly Expenses</h2>
          </div>
          <span className="text-sm text-muted-foreground">
            Total: <span className="font-semibold text-foreground">${totalExpenses.toLocaleString()}</span>
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {(Object.keys(CATEGORY_LABELS) as Array<keyof typeof CATEGORY_LABELS>).map((category, index) => (
            <div
              key={category}
              className="animate-slide-up"
              style={{ animationDelay: `${(index + 2) * 50}ms` }}
            >
              <BudgetInput
                field={category}
                label={CATEGORY_LABELS[category]}
                icon={CATEGORY_ICONS[category]}
                placeholder="0"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
