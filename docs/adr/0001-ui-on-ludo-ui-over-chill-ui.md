# 1. Build the screens on `@ludo/ui`, an app layer over chill-ui

- **Status**: Accepted
- **Date**: 2025-12-13
- **Source**: existing code, transcribed in SCRUM-699

## Context

The app needs a set of primitives (layout boxes, text, buttons, inputs, lists, sheets) styled with the
Ludora design system ("Soleil & Terrain"). The generic primitives come from the chill-ui library,
whose source lives in the repository (`src/components/chill-ui-library`, alias `@chillui/ui`).
Ludora-specific needs (colors, fonts, the `List` wrapper around LegendList, `Autocomplete`, `MapView`,
`Slider`, `ProgressStepper`…) must not leak into the generic library.

## Decision

- `@ludo/ui` (`src/components/ludo-ui`) is the app layer: it wraps chill-ui with Ludora's defaults
  and adds the components the app needs.
- **Features import their primitives from `@ludo/ui`.** They import from `@chillui/ui` only what
  `@ludo/ui` does not wrap (`cn`, `useToast`, `ScalePressable`, `Dialog*`…).
- chill-ui internals are never edited for a feature need: the change goes into `@ludo/ui` instead.
- Composed components shared by several features (`SessionCard`, `FooterWrapper`, `FormSheet*`…)
  live in `src/components/ui`.

## Consequences

- A design change is made once, in `@ludo/ui`, and every screen follows.
- chill-ui can be updated from its upstream without merging Ludora-specific changes.
- One more layer to know: the list of what `@ludo/ui` wraps is in the `ludora-ui` skill.

## Alternatives considered

- **Use chill-ui directly in features**: every screen would repeat the Ludora defaults, and app
  needs would end up as edits in the generic library.
