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
  const active = true;
  const effectiveLogs = active && (logs || false);
  const effectiveReason = active && reason && true;

  return { active, effectiveLogs, effectiveReason };
}
