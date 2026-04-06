import { Switch } from 'react-native';
import { Box, BoxRowCenterBetween, Separator, String } from '@ludo/ui';

import { useListPerfDebugStore } from '@/stores/list-perf-debug.store';

/**
 * Toggles persisted in MMKV — works in preview / release builds, not only __DEV__.
 * Warnings: filter Metro / Logcat / Xcode console by `[PERF:` or log level WARN.
 */
export default function DevToolsListPerfSection() {
  const enabled = useListPerfDebugStore(s => s.enabled);
  const logs = useListPerfDebugStore(s => s.logs);
  const reason = useListPerfDebugStore(s => s.reason);
  const setEnabled = useListPerfDebugStore(s => s.setEnabled);
  const setLogs = useListPerfDebugStore(s => s.setLogs);
  const setReason = useListPerfDebugStore(s => s.setReason);

  return (
    <>
      <Box className="gap-3">
        <String variant="body-2" font="primaryBold">
          Perf listes (LegendList)
        </String>
        <String variant="body-sm" colorVariant="muted">
          Active les logs / warnings `[PERF:…]` pour les composants de liste qui utilisent les hooks de diagnostic.
          Persisté sur l’appareil.
        </String>
        <BoxRowCenterBetween>
          <String variant="body-sm">Activer</String>
          <Switch value={enabled} onValueChange={setEnabled} />
        </BoxRowCenterBetween>
        <BoxRowCenterBetween>
          <String variant="body-sm">Logs verbeux</String>
          <Switch value={logs} onValueChange={setLogs} disabled={!enabled} />
        </BoxRowCenterBetween>
        <BoxRowCenterBetween>
          <String variant="body-sm">Warnings (reason)</String>
          <Switch value={reason} onValueChange={setReason} disabled={!enabled} />
        </BoxRowCenterBetween>
      </Box>
      <Separator />
    </>
  );
}
