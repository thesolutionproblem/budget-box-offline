import { NavLink } from '@/components/NavLink';
import { FileEdit, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', label: 'Budget', icon: FileEdit },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

export function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-background/80 backdrop-blur-lg sm:static sm:border-t-0 sm:bg-transparent sm:backdrop-blur-0">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 py-3 sm:justify-start sm:py-0">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
              activeClassName="bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
