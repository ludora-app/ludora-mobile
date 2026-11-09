## 1. OpenSpec and shared code

- [x] 1.1 Sync the `complete-onboarding-first-session` specs into `openspec/specs/` (compatible-players, onboarding-first-session, session-recommendations). Verify with `openspec validate --specs`
- [x] 1.2 Move `prepared-session.utils.ts` (+ test) to `src/utils/` and its constants to `src/constants/prepared-session.constants.ts`; update the on-boarding imports. Verify with `bun ts:check` and `bun test`
- [x] 1.3 Move `get-compatible-players.query.ts` to `src/queries/` with a `sessionUid` argument; the on-boarding passes its published uid. Verify with `bun ts:check`
- [x] 1.4 Widen the invalidation of `useJoinSession` and `useCreateSession` (list, recommendations, my-list, my-stats)

## 2. Home data

- [x] 2.1 Home constants (`HOME_MAX_SUGGESTIONS`, distances, recommended and my-list limits)
- [x] 2.2 `useHomeFeaturedStore` ("Pas pour moi", memory) and `useHomeWelcomeStore` (first visit, persisted, MMKV key); register both in `reset-caches.utils.ts`
- [x] 2.3 Home filters store: drop the day carousel date, add `sports` from the chips and `maxDistance` (10 km, 20 km when widened)
- [x] 2.4 Queries: recommended sessions, my upcoming sessions, has sessions around, prepared session (values + nearest field), sessions list params
- [x] 2.5 `getMatchReasons` util with tests (level, slot, distance)
- [x] 2.6 `getHomeFeaturedState` util with tests (priority of the spec), and `useGetHomeFeatured` hook

## 3. Home UI

- [x] 3.1 Screen on the cream background; yellow header with greeting, subtitle, mascot and cream rounded edge; Ludo's bubble on the first visit
- [x] 3.2 Featured matching session card: 9c content, green reason pills, "Rejoindre", "Pas pour moi"
- [x] 3.3 Featured prepared session card: content, compatible players hint, "Modifier", "Publier ma session", "Choisir où jouer" without field
- [x] 3.4 Next match card: joined (team, "Inscrit") and organised ("Tu organises", n/capacity)
- [x] 3.5 Empty profile and idle headers with "Créer un match"; loading placeholder
- [x] 3.6 List header: "Toutes les sessions", "Filtres", sport chips; remove the search input, the week carousel and the reminder card
- [x] 3.7 `SessionCard` top slot; list items with "Pour toi" and "Tu es inscrit" badges; fixed sizes
- [x] 3.8 "No session around" empty state with "Élargir à 20 km"
- [x] 3.9 "Pour toi" star icon from Iconsax (`bun generate:icons`)

## 4. Analytics, translations, checks

- [x] 4.1 Analytics events: featured join / not for me / publish (success and failed) / edit, widen area, sport chip
- [x] 4.2 Create the `home.*` Tolgee keys (FR and EN)
- [x] 4.3 Run `bun lint:fix && bun ts:check && bun test`, and verify all pass
- [x] 4.4 List in the PR the R1 to R11 states to walk on iOS and Android during the review (no device in the CI)
