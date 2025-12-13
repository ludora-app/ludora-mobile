import { PlausibleProvider as PlausibleProviderNative } from 'expo-plausible';

export default function PlausibleProvider({ children }: { children: React.ReactNode }) {
  return (
    <PlausibleProviderNative
      config={{ domain: 'test.app.ludora.fr', batch: true, apiHost: 'https://eye-of-all.ludora.fr' }}
    >
      {children}
    </PlausibleProviderNative>
  );
}
