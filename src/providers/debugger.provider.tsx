import { FloatingDevTools } from '@react-buoy/core';

export default function DebuggerProvider() {
  return <FloatingDevTools disableHints environment="local" userRole="admin" />;
}
