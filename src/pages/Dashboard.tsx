import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { AnalyticsCards } from '@/components/AnalyticsCards';
import { CategoryChart } from '@/components/CategoryChart';
import { WarningsPanel } from '@/components/WarningsPanel';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

const Dashboard = () => {
  useNetworkStatus();

  return (
    <div className="min-h-screen bg-background pb-24 sm:pb-8">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Analyze your spending patterns and get smart insights.
          </p>
        </div>

        {/* Analytics Cards */}
        <section className="mb-8">
          <AnalyticsCards />
        </section>

        {/* Charts and Insights Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Category Breakdown */}
          <section className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            <CategoryChart />
          </section>

          {/* Warnings and Insights */}
          <section className="animate-slide-up" style={{ animationDelay: '300ms' }}>
            <WarningsPanel />
          </section>
        </div>

        {/* Tips Section */}
        <section className="mt-8 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <div className="glass-card p-6">
            <h3 className="text-lg font-display font-semibold mb-4">Budget Tips</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="p-4 rounded-lg bg-muted/50">
                <span className="text-2xl mb-2 block">🎯</span>
                <p className="text-sm font-medium">50/30/20 Rule</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Aim for 50% needs, 30% wants, 20% savings.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <span className="text-2xl mb-2 block">🔔</span>
                <p className="text-sm font-medium">Set Alerts</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Review your budget weekly to stay on track.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <span className="text-2xl mb-2 block">📈</span>
                <p className="text-sm font-medium">Track Trends</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Compare month-over-month to find patterns.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Navigation />
    </div>
  );
};

export default Dashboard;
