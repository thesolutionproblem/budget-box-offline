import { useCallback, useState, useEffect } from 'react';
import { useBudgetStore } from '@/stores/budgetStore';
import { BudgetData } from '@/types/budget';
import { cn } from '@/lib/utils';
import { DollarSign } from 'lucide-react';

interface BudgetInputProps {
  field: keyof Omit<BudgetData, 'updatedAt'>;
  label: string;
  icon?: string;
  placeholder?: string;
  isIncome?: boolean;
}

export function BudgetInput({ field, label, icon, placeholder = '0', isIncome = false }: BudgetInputProps) {
  const { budget, updateBudget } = useBudgetStore();
  const [localValue, setLocalValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);

  // Sync local value with store
  useEffect(() => {
    const storeValue = budget[field];
    if (storeValue === 0) {
      setLocalValue('');
    } else {
      setLocalValue(storeValue.toString());
    }
  }, [budget, field]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      
      // Allow empty string or valid numbers
      if (value === '' || /^\d*\.?\d*$/.test(value)) {
        setLocalValue(value);
        const numValue = parseFloat(value) || 0;
        updateBudget(field, numValue);
      }
    },
    [field, updateBudget]
  );

  return (
    <div
      className={cn(
        'relative group transition-all duration-300',
        isFocused && 'scale-[1.02]'
      )}
    >
      <div
        className={cn(
          'glass-card p-4 transition-all duration-300',
          isFocused && 'ring-2 ring-primary/20 shadow-lg',
          isIncome && 'border-success/30 bg-success/5'
        )}
      >
        <div className="flex items-center gap-3 mb-2">
          {icon && <span className="text-xl">{icon}</span>}
          <label className="text-sm font-medium text-muted-foreground">{label}</label>
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <DollarSign className={cn(
              'w-5 h-5 transition-colors',
              isFocused ? 'text-primary' : 'text-muted-foreground'
            )} />
          </div>
          <input
            type="text"
            inputMode="decimal"
            value={localValue}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className={cn(
              'w-full pl-12 pr-4 py-3 text-xl font-display font-semibold rounded-lg',
              'bg-background/50 border border-border/50',
              'focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary',
              'transition-all duration-200',
              isIncome && 'text-success'
            )}
          />
        </div>
      </div>
    </div>
  );
}
