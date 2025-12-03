import { useBudgetStore } from '@/stores/budgetStore';
import { Wifi, WifiOff, Cloud, CloudOff, RefreshCw, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function NetworkStatus() {
  const { isOnline, syncStatus, syncToServer, lastSyncedAt } = useBudgetStore();

  const handleSync = async () => {
    await syncToServer();
  };

  const formatLastSync = (timestamp: number | null) => {
    if (!timestamp) return 'Never';
    const diff = Date.now() - timestamp;
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    return `${Math.floor(diff / 3600000)}h ago`;
  };

  return (
    <div className="flex items-center gap-4">
      {/* Network Status */}
      <div className="flex items-center gap-2">
        {isOnline ? (
          <>
            <div className="status-dot-online" />
            <span className="text-sm text-muted-foreground">Online</span>
          </>
        ) : (
          <>
            <div className="status-dot-offline" />
            <span className="text-sm text-warning">Offline</span>
          </>
        )}
      </div>

      {/* Sync Status Badge */}
      <button
        onClick={handleSync}
        disabled={!isOnline || syncStatus === 'synced'}
        className={cn(
          'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200',
          syncStatus === 'local' && 'bg-muted text-muted-foreground',
          syncStatus === 'pending' && 'bg-warning/10 text-warning hover:bg-warning/20 cursor-pointer',
          syncStatus === 'synced' && 'bg-success/10 text-success'
        )}
      >
        {syncStatus === 'local' && (
          <>
            <CloudOff className="w-3.5 h-3.5" />
            <span>Local Only</span>
          </>
        )}
        {syncStatus === 'pending' && (
          <>
            <RefreshCw className={cn('w-3.5 h-3.5', isOnline && 'animate-spin-slow')} />
            <span>Sync Pending</span>
          </>
        )}
        {syncStatus === 'synced' && (
          <>
            <Check className="w-3.5 h-3.5" />
            <span>Synced</span>
          </>
        )}
      </button>

      {/* Last Sync Time */}
      {lastSyncedAt && (
        <span className="text-xs text-muted-foreground hidden sm:inline">
          Last sync: {formatLastSync(lastSyncedAt)}
        </span>
      )}
    </div>
  );
}
