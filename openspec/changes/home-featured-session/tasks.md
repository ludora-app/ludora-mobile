## 1. OpenSpec and shared code

- [ ] 1.1 Sync the `complete-onboarding-first-session` specs into `openspec/specs/` (compatible-players, onboarding-first-session, session-recommendations). Verify with `openspec validate --specs`
- [ ] 1.2 Move `prepared-session.utils.ts` (+ test) to `src/utils/` and its constants to `src/constants/prepared-session.constants.ts`; update the on-boarding imports. Verify with `bun ts:check` and `bun test`
- [ ] 1.3 Move `get-compatible-players.query.ts` to `src/queries/` with a `sessionUid` argument; the on-boarding passes its published uid. Verify with `bun ts:check`
- [ ] 1.4 Widen the invalidation of `useJoinSession` and `useCreateSession` (list, recommendations, my-list, my-stats)

## 2. Home data

- [ ] 2.1 Home constants (`HOME_MAX_SUGGESTIONS`, distances, recommended and my-list limits)
- [ ] 2.2 `useHomeFeaturedStore` ("Pas pour moi", memory) and `useHomeWelcomeStore` (first visit, persisted, MMKV key); register both in `reset-caches.utils.ts`
- [ ] 2.3 Home filters store: drop the day carousel date, add `sports` from the chips and `maxDistance` (10 km, 20 km when widened)
- [ ] 2.4 Queries: recommended sessions, my upcoming sessions, has sessions around, prepared session (values + nearest field), sessions list params
- [ ] 2.5 `getMatchReasons` util with tests (level, slot, distance)
- [ ] 2.6 `getHomeFeaturedState` util with tests (priority of the spec), and `useGetHomeFeatured` hook

## 3. Home UI

- [ ] 3.1 Screen on the cream background; yellow header with greeting, subtitle, mascot and cream rounded edge; Ludo's bubble on the first visit
- [ ] 3.2 Featured matching session card: 9c content, green reason pills, "Rejoindre", "Pas pour moi"
- [ ] 3.3 Featured prepared session card: content, compatible players hint, "Modifier", "Publier ma session", "Choisir où jouer" without field
- [ ] 3.4 Next match card: joined (team, "Inscrit") and organised ("Tu organises", n/capacity)
- [ ] 3.5 Empty profile and idle headers with "Créer un match"; loading placeholder
- [ ] 3.6 List header: "Toutes les sessions", "Filtres", sport chips; remove the search input, the week carousel and the reminder card
- [ ] 3.7 `SessionCard` top slot; list items with "Pour toi" and "Tu es inscrit" badges; fixed sizes
- [ ] 3.8 "No session around" empty state with "Élargir à 20 km"
- [ ] 3.9 "Pour toi" star icon from Iconsax (`bun generate:icons`)

## 4. Analytics, translations, checks

- [ ] 4.1 Analytics events: featured join / not for me / publish (success and failed) / edit, widen area, sport chip
- [ ] 4.2 Create the `home.*` Tolgee keys (FR and EN)
- [ ] 4.3 Run `bun lint:fix && bun ts:check && bun test`, and verify all pass
- [ ] 4.4 Walk the R1 to R11 states on iOS and Android (not possible in the CI: left to the review)
