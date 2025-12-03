import { useEffect, useCallback } from 'react';
import { useBudgetStore } from '@/stores/budgetStore';

export function useNetworkStatus() {
  const { setOnlineStatus, syncStatus, syncToServer, isOnline } = useBudgetStore();

  const handleOnline = useCallback(() => {
    setOnlineStatus(true);
    // Auto-sync when coming back online
    if (syncStatus === 'pending') {
      syncToServer();
    }
  }, [setOnlineStatus, syncStatus, syncToServer]);

  const handleOffline = useCallback(() => {
    setOnlineStatus(false);
  }, [setOnlineStatus]);

  useEffect(() => {
    // Set initial status
    setOnlineStatus(navigator.onLine);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [handleOnline, handleOffline, setOnlineStatus]);

  return { isOnline };
}
