import { useBudgetStore } from '@/stores/budgetStore';
import { CATEGORY_LABELS } from '@/types/budget';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const CHART_COLORS = [
  'hsl(222, 47%, 35%)',   // bills
  'hsl(160, 84%, 39%)',   // food
  'hsl(217, 91%, 60%)',   // transport
  'hsl(280, 68%, 50%)',   // subscriptions
  'hsl(38, 92%, 50%)',    // misc
];

export function CategoryChart() {
  const { budget, isHydrated } = useBudgetStore();

  if (!isHydrated) {
    return (
      <div className="glass-card p-6 h-[400px] flex items-center justify-center">
        <div className="animate-pulse w-48 h-48 rounded-full bg-muted" />
      </div>
    );
  }

  const data = [
    { name: 'Bills', value: budget.bills, color: CHART_COLORS[0] },
    { name: 'Food', value: budget.food, color: CHART_COLORS[1] },
    { name: 'Transport', value: budget.transport, color: CHART_COLORS[2] },
    { name: 'Subscriptions', value: budget.subscriptions, color: CHART_COLORS[3] },
    { name: 'Misc', value: budget.misc, color: CHART_COLORS[4] },
  ].filter(item => item.value > 0);

  const totalExpenses = data.reduce((sum, item) => sum + item.value, 0);

  if (totalExpenses === 0) {
    return (
      <div className="glass-card p-6 h-[400px] flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mb-4">
          <span className="text-4xl">📊</span>
        </div>
        <h3 className="text-lg font-display font-semibold mb-2">No Expenses Yet</h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Add your monthly expenses to see a breakdown of your spending by category.
        </p>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / totalExpenses) * 100).toFixed(1);
      return (
        <div className="glass-card p-3 min-w-[150px]">
          <p className="font-medium text-sm">{data.name}</p>
          <p className="text-lg font-display font-bold">${data.value.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">{percentage}% of total</p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-muted-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-display font-semibold mb-4">Spending Breakdown</h3>
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
              animationBegin={0}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  stroke="transparent"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center mt-2">
        <p className="text-sm text-muted-foreground">Total Expenses</p>
        <p className="text-2xl font-display font-bold">${totalExpenses.toLocaleString()}</p>
      </div>
    </div>
  );
}
