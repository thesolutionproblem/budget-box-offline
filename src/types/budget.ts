export interface BudgetData {
  income: number;
  bills: number;
  food: number;
  transport: number;
  subscriptions: number;
  misc: number;
  updatedAt: number;
}

export type SyncStatus = 'local' | 'pending' | 'synced';

export interface BudgetAnalytics {
  totalExpenses: number;
  burnRate: number;
  savingsPotential: number;
  monthEndPrediction: number;
  categoryPercentages: {
    bills: number;
    food: number;
    transport: number;
    subscriptions: number;
    misc: number;
  };
}

export interface BudgetWarning {
  type: 'danger' | 'warning' | 'info';
  message: string;
  category?: string;
}

export const DEFAULT_BUDGET: BudgetData = {
  income: 0,
  bills: 0,
  food: 0,
  transport: 0,
  subscriptions: 0,
  misc: 0,
  updatedAt: Date.now(),
};

export const CATEGORY_LABELS: Record<keyof Omit<BudgetData, 'income' | 'updatedAt'>, string> = {
  bills: 'Bills & Utilities',
  food: 'Food & Groceries',
  transport: 'Transportation',
  subscriptions: 'Subscriptions',
  misc: 'Miscellaneous',
};

export const CATEGORY_ICONS: Record<keyof Omit<BudgetData, 'income' | 'updatedAt'>, string> = {
  bills: '🏠',
  food: '🍔',
  transport: '🚗',
  subscriptions: '📱',
  misc: '📦',
};
