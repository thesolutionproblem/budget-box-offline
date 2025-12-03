import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { BudgetForm } from '@/components/BudgetForm';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

const Index = () => {
  // Initialize network status monitoring
  useNetworkStatus();

  return (
    <div className="min-h-screen bg-background pb-24 sm:pb-8">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Page Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2">
              Your Monthly Budget
            </h1>
            <p className="text-muted-foreground">
              Track your income and expenses. Changes save automatically — even offline.
            </p>
          </div>

          {/* Budget Form */}
          <BudgetForm />

          {/* Info Banner */}
          <div className="mt-8 p-4 rounded-xl bg-muted/50 border border-border/50 animate-slide-up" style={{ animationDelay: '400ms' }}>
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <p className="text-sm font-medium">Auto-save enabled</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Your budget saves instantly to your device. When you're back online, it syncs to the cloud automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Navigation />
    </div>
  );
};

export default Index;
