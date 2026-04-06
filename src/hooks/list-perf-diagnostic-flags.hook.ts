import { useShallow } from 'zustand/react/shallow';

import { useListPerfDebugStore } from '@/stores/list-perf-debug.store';

type FlagsOpts = {
  logs?: boolean;
  reason?: boolean;
};

/**
 * Merges per-call options with Dev Tools store.
 * **`enabled` is the master switch** (same idea as memo comparators): when it is off, nothing runs
 * — including in `__DEV__` — so you can silence `[PERF:RENDER]` etc. from the Dev Tools.
 */
export function useListPerfDiagnosticFlags({ logs = false, reason = true }: FlagsOpts) {
  const { storeEnabled, storeLogs, storeReason } = useListPerfDebugStore(
    useShallow(s => ({
      storeEnabled: s.enabled,
      storeLogs: s.logs,
      storeReason: s.reason,
    })),
  );

  const active = storeEnabled;
  const effectiveLogs = active && (logs || storeLogs);
  const effectiveReason = active && reason && storeReason;

  return { active, effectiveLogs, effectiveReason };
}
