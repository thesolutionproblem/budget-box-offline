import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import localforage from 'localforage';
import { BudgetData, SyncStatus, DEFAULT_BUDGET, BudgetAnalytics, BudgetWarning } from '@/types/budget';

// Configure localforage
localforage.config({
  name: 'BudgetBox',
  storeName: 'budgets',
  description: 'Offline-first budget storage',
});

// Custom storage adapter for localforage
const localforageStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const value = await localforage.getItem<string>(name);
    return value ?? null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await localforage.setItem(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await localforage.removeItem(name);
  },
};

interface BudgetStore {
  budget: BudgetData;
  syncStatus: SyncStatus;
  isOnline: boolean;
  lastSyncedAt: number | null;
  isHydrated: boolean;
  
  // Actions
  updateBudget: (field: keyof Omit<BudgetData, 'updatedAt'>, value: number) => void;
  setBudget: (budget: BudgetData) => void;
  setOnlineStatus: (isOnline: boolean) => void;
  setSyncStatus: (status: SyncStatus) => void;
  setLastSyncedAt: (timestamp: number) => void;
  setHydrated: (hydrated: boolean) => void;
  syncToServer: () => Promise<boolean>;
  
  // Computed
  getAnalytics: () => BudgetAnalytics;
  getWarnings: () => BudgetWarning[];
}

export const useBudgetStore = create<BudgetStore>()(
  persist(
    (set, get) => ({
      budget: DEFAULT_BUDGET,
      syncStatus: 'local',
      isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
      lastSyncedAt: null,
      isHydrated: false,

      updateBudget: (field, value) => {
        set((state) => ({
          budget: {
            ...state.budget,
            [field]: value,
            updatedAt: Date.now(),
          },
          syncStatus: 'pending',
        }));
      },

      setBudget: (budget) => {
        set({ budget, syncStatus: 'synced' });
      },

      setOnlineStatus: (isOnline) => {
        set({ isOnline });
      },

      setSyncStatus: (status) => {
        set({ syncStatus: status });
      },

      setLastSyncedAt: (timestamp) => {
        set({ lastSyncedAt: timestamp });
      },

      setHydrated: (hydrated) => {
        set({ isHydrated: hydrated });
      },

      syncToServer: async () => {
        const { budget, isOnline } = get();
        
        if (!isOnline) {
          set({ syncStatus: 'pending' });
          return false;
        }

        try {
          // Simulate API call - in real app, this would call your backend
          // For now, we'll just simulate a successful sync
          await new Promise((resolve) => setTimeout(resolve, 1000));
          
          set({ 
            syncStatus: 'synced',
            lastSyncedAt: Date.now(),
          });
          
          return true;
        } catch (error) {
          console.error('Sync failed:', error);
          set({ syncStatus: 'pending' });
          return false;
        }
      },

      getAnalytics: () => {
        const { budget } = get();
        const totalExpenses = budget.bills + budget.food + budget.transport + budget.subscriptions + budget.misc;
        const burnRate = budget.income > 0 ? totalExpenses / budget.income : 0;
        const savingsPotential = budget.income - totalExpenses;
        const monthEndPrediction = savingsPotential;

        const categoryPercentages = {
          bills: budget.income > 0 ? (budget.bills / budget.income) * 100 : 0,
          food: budget.income > 0 ? (budget.food / budget.income) * 100 : 0,
          transport: budget.income > 0 ? (budget.transport / budget.income) * 100 : 0,
          subscriptions: budget.income > 0 ? (budget.subscriptions / budget.income) * 100 : 0,
          misc: budget.income > 0 ? (budget.misc / budget.income) * 100 : 0,
        };

        return {
          totalExpenses,
          burnRate,
          savingsPotential,
          monthEndPrediction,
          categoryPercentages,
        };
      },

      getWarnings: () => {
        const { budget } = get();
        const warnings: BudgetWarning[] = [];
        const analytics = get().getAnalytics();

        // Food warning
        if (analytics.categoryPercentages.food > 40) {
          warnings.push({
            type: 'warning',
            message: 'Your food spending is over 40% of income. Consider meal planning to reduce costs.',
            category: 'food',
          });
        }

        // Subscriptions warning
        if (analytics.categoryPercentages.subscriptions > 30) {
          warnings.push({
            type: 'warning',
            message: 'Subscriptions exceed 30% of income. Review and cancel unused services.',
            category: 'subscriptions',
          });
        }

        // Negative savings
        if (analytics.savingsPotential < 0) {
          warnings.push({
            type: 'danger',
            message: 'Your expenses exceed your income! Review your budget urgently.',
          });
        }

        // High burn rate
        if (analytics.burnRate > 0.9 && analytics.savingsPotential >= 0) {
          warnings.push({
            type: 'warning',
            message: 'You\'re spending over 90% of your income. Try to build an emergency fund.',
          });
        }

        // Good savings
        if (analytics.savingsPotential > 0 && analytics.burnRate < 0.7) {
          warnings.push({
            type: 'info',
            message: 'Great job! You\'re saving over 30% of your income.',
          });
        }

        return warnings;
      },
    }),
    {
      name: 'budgetbox-storage',
      storage: createJSONStorage(() => localforageStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
