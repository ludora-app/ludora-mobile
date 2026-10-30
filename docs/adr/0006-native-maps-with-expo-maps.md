# 6. Render maps natively with expo-maps

- **Status**: Accepted
- **Date**: 2026-10-29
- **Source**: SCRUM-697 (play area map)

## Context

The on-boarding shows the play area on a map: a center, a circle for the radius, a marker. The app is
on Expo SDK 57 / React Native 0.86 with the new architecture.

## Decision

- Maps use **expo-maps**: Apple Maps on iOS (`AppleMaps.View`, no key), Google Maps on Android
  (`GoogleMaps.View`, key `GOOGLE_MAPS_ANDROID_API_KEY` from Vault, set in `app.config.ts`).
- Features use the `MapView` component of `@ludo/ui`, which picks the platform view, draws the circle
  and fits the zoom to the radius (`getMapZoomForRadius`).

## Consequences

- Maintained by Expo and aligned with the SDK version: upgrades follow the SDK.
- Adding or upgrading it needs a native rebuild.
- iOS and Android do not show the same map provider.

## Alternatives considered

- **react-native-maps**: third-party, its support of the latest SDK and new architecture lags behind.
- **A web map in a WebView**: no native gestures, heavier.
