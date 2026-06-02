/**
 * Global test setup.
 *
 * `ky` relies on the WHATWG Fetch primitives (fetch/Request/Response/Headers).
 * Node 18+ exposes them on `globalThis`, but the React Native Jest environment
 * runs in a sandbox that does not always re-expose them on `global`, so we
 * bridge them across before any test runs.
 */
['fetch', 'Request', 'Response', 'Headers', 'AbortController'].forEach(name => {
  if (typeof global[name] === 'undefined' && typeof globalThis[name] !== 'undefined') {
    global[name] = globalThis[name];
  }
});
