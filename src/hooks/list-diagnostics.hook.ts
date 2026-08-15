import { useEffect, useRef } from 'react';
import { useRecyclingEffect, useViewability } from '@legendapp/list/react-native';

import { useListPerfDiagnosticFlags } from './list-perf-diagnostic-flags.hook';

type ListItemWithUid = { uid: string; name?: string | null };

type ListDiagnosticsOptions<T = unknown> = {
  /** Log every event. Default: false */
  logs?: boolean;
  /** Only warn when a problem is detected. Default: true */
  reason?: boolean;
  /** Extract a human-readable label from the item (shown in logs). Falls back to `item.name` then `uid`. */
  getLabel?: (item: T) => string;
};

const SLOW_RENDER_MS = 50;
const EXCESSIVE_SAME_ITEM_RENDERS = 3;
const EXCESSIVE_MOUNTS_THRESHOLD = 3;
const MOUNT_TRACKING_WINDOW_MS = 5_000;

const mountLog = new Map<string, number[]>();

function trackMount(key: string, effectiveReason: boolean, label: string, itemLabel: string, uid: string) {
  const now = performance.now();
  const timestamps = mountLog.get(key) ?? [];
  timestamps.push(now);

  const cutoff = now - MOUNT_TRACKING_WINDOW_MS;
  const recent = timestamps.filter(ts => ts > cutoff);
  mountLog.set(key, recent);

  if (effectiveReason && recent.length === EXCESSIVE_MOUNTS_THRESHOLD) {
    // eslint-disable-next-line no-console
    console.warn(
      `[PERF:REMOUNT] [${label}] uid=${uid} ${itemLabel} mounted ${recent.length}x in ${(MOUNT_TRACKING_WINDOW_MS / 1000).toFixed(0)}s -- component is being unmounted/remounted instead of re-rendered, likely unstable parent JSX or missing memoization`,
    );
  }
}

function useListItemRenderDiagnostics<T extends ListItemWithUid>(
  item: T,
  label: string,
  getLabel: ((i: T) => string) | undefined,
  effectiveLogs: boolean,
  effectiveReason: boolean,
) {
  const renderStart = useRef(performance.now());
  const currentUid = useRef(item.uid);
  const rendersForCurrentUid = useRef(0);
  const hasMountedRef = useRef(false);

  if (currentUid.current !== item.uid) {
    currentUid.current = item.uid;
    rendersForCurrentUid.current = 0;
    hasMountedRef.current = false;
  }

  rendersForCurrentUid.current += 1;
  renderStart.current = performance.now();

  const itemLabel = getLabel ? getLabel(item) : (item.name ?? item.uid);

  if ((effectiveLogs || effectiveReason) && !hasMountedRef.current) {
    hasMountedRef.current = true;
    trackMount(`${label}::${item.uid}`, effectiveReason, label, itemLabel, item.uid);
  }

  useEffect(() => {
    if (!effectiveLogs && !effectiveReason) return;

    const ms = performance.now() - renderStart.current;
    const renderNum = rendersForCurrentUid.current;

    if (effectiveLogs) {
      // eslint-disable-next-line no-console
      console.log(`[PERF:RENDER] [${label}] uid=${item.uid} ${itemLabel} #${renderNum} ${ms.toFixed(1)}ms`);
    }

    if (effectiveReason && renderNum > 1 && ms > SLOW_RENDER_MS) {
      // eslint-disable-next-line no-console
      console.warn(
        `[PERF:SLOW] [${label}] Slow render: ${ms.toFixed(1)}ms (>${SLOW_RENDER_MS}ms) | uid=${item.uid} ${itemLabel} render #${renderNum}`,
      );
    }

    if (effectiveReason && renderNum === EXCESSIVE_SAME_ITEM_RENDERS) {
      // eslint-disable-next-line no-console
      console.warn(
        `[PERF:EXCESSIVE_RENDERS] [${label}] ${renderNum} renders for same item uid=${item.uid} ${itemLabel} -- likely unstable context or parent re-renders bypassing memo`,
      );
    }
  });
}

/**
 * Basic render diagnostics for any list item. Works everywhere (inside or outside LegendList).
 * Gated by Dev Tools → List perf **enabled** (master switch), same as memo comparators.
 */
export function useListItemDiagnostics<T extends ListItemWithUid>(
  item: T,
  label = 'List',
  { getLabel, logs = false, reason = true }: ListDiagnosticsOptions<T> = {},
) {
  const { effectiveLogs, effectiveReason } = useListPerfDiagnosticFlags({ logs, reason });
  useListItemRenderDiagnostics(item, label, getLabel, effectiveLogs, effectiveReason);
}

/**
 * Full diagnostics for items rendered inside a LegendList with `recycleItems`.
 * **Only use inside a LegendList renderItem** -- will crash outside.
 */
export function useListItemRecyclingDiagnostics<T extends ListItemWithUid>(
  item: T,
  label = 'List',
  opts: ListDiagnosticsOptions<T> = {},
) {
  const { logs = false, reason = true } = opts;
  const { effectiveLogs, effectiveReason } = useListPerfDiagnosticFlags({ logs, reason });
  const selfRecycleCount = useRef(0);
  const prevUidForRecycle = useRef(item.uid);

  if (prevUidForRecycle.current !== item.uid) {
    selfRecycleCount.current = 0;
    prevUidForRecycle.current = item.uid;
  }

  useListItemRenderDiagnostics(item, label, opts.getLabel, effectiveLogs, effectiveReason);

  useRecyclingEffect(({ index, item: newItem, prevIndex, prevItem }) => {
    const prevUid = (prevItem as ListItemWithUid)?.uid ?? 'init';
    const newUid = (newItem as ListItemWithUid)?.uid;
    const isSelfRecycle = prevUid === newUid && prevIndex === index;

    if (isSelfRecycle) {
      selfRecycleCount.current += 1;
    }

    if (effectiveLogs) {
      // eslint-disable-next-line no-console
      console.log(
        `[PERF:RECYCLE] [${label}] idx ${prevIndex ?? '?'} -> ${index} | uid ${prevUid} -> ${newUid}${isSelfRecycle ? ' (SELF)' : ''}`,
      );
    }

    if (effectiveReason && isSelfRecycle && selfRecycleCount.current === 2) {
      // eslint-disable-next-line no-console
      console.warn(
        `[PERF:SELF_RECYCLE] [${label}] Item recycled to itself ${selfRecycleCount.current}x | uid=${newUid} idx=${index} -- likely unstable context or parent props bypassing memo`,
      );
    }
  });

  useViewability(viewToken => {
    if (effectiveLogs) {
      // eslint-disable-next-line no-console
      console.log(`[PERF:VISIBLE] [${label}] uid=${item.uid} idx=${viewToken.index} visible=${viewToken.isViewable}`);
    }
  }, 'main');
}
