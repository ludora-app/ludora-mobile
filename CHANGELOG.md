## [1.0.3-alpha.8](https://github.com/ludora-app/ludora-mobile/compare/v1.0.3-alpha.7...v1.0.3-alpha.8) (2026-03-02)

### Bug Fixes

* **SCRUM-429:** Implement an optimistic message queue system for chat, including real-time updates and improved conversation list cache management. ([97cc0e1](https://github.com/ludora-app/ludora-mobile/commit/97cc0e11236911a3a2b03a30727972648029f911))

## [1.0.3-alpha.7](https://github.com/ludora-app/ludora-mobile/compare/v1.0.3-alpha.6...v1.0.3-alpha.7) (2026-03-01)

### Bug Fixes

* **SCRUM-432:** use `getApiUrl` utility instead of a hardcoded local API URL for the refresh token endpoint. ([4e5cd21](https://github.com/ludora-app/ludora-mobile/commit/4e5cd21197dd3bf63c44c347ad686a4539078377))

## [1.0.3-alpha.6](https://github.com/ludora-app/ludora-mobile/compare/v1.0.3-alpha.5...v1.0.3-alpha.6) (2026-03-01)

### Bug Fixes

* add .easignore and firebase config ([d73e418](https://github.com/ludora-app/ludora-mobile/commit/d73e4184442e78a575130bdebcea4b538cdbc266))
* add .easignore and firebase config ([3850ca7](https://github.com/ludora-app/ludora-mobile/commit/3850ca700cc0c3e22323898816a18062a3035ae7))
* **ci:** Pin EAS version to latest in Expo GitHub Action. ([992c68c](https://github.com/ludora-app/ludora-mobile/commit/992c68c8eceb24de0b357814ab2a0bfc8bab92b3))

## [1.0.3-next.4](https://github.com/ludora-app/ludora-mobile/compare/v1.0.3-next.3...v1.0.3-next.4) (2026-03-01)

### Bug Fixes

* add .easignore and firebase config ([d73e418](https://github.com/ludora-app/ludora-mobile/commit/d73e4184442e78a575130bdebcea4b538cdbc266))

## [1.0.3-next.3](https://github.com/ludora-app/ludora-mobile/compare/v1.0.3-next.2...v1.0.3-next.3) (2026-03-01)

### Bug Fixes

* add .easignore and firebase config ([3850ca7](https://github.com/ludora-app/ludora-mobile/commit/3850ca700cc0c3e22323898816a18062a3035ae7))

## [1.0.3-next.2](https://github.com/ludora-app/ludora-mobile/compare/v1.0.3-next.1...v1.0.3-next.2) (2026-03-01)

### Bug Fixes

* **ci:** Pin EAS version to latest in Expo GitHub Action. ([992c68c](https://github.com/ludora-app/ludora-mobile/commit/992c68c8eceb24de0b357814ab2a0bfc8bab92b3))

## [1.0.3-next.1](https://github.com/ludora-app/ludora-mobile/compare/v1.0.2...v1.0.3-next.1) (2026-03-01)

### Bug Fixes

* **SCRUM-430:** Refine `List` component `paddingBottom` calculations across features to improve Android safe area handling and remove the `Wrapper` component from chat conversations. ([193c415](https://github.com/ludora-app/ludora-mobile/commit/193c4155a1ab9d32c3876567db41ea50b7ae060a))
* **SCRUM-436:** fix missing birthdate ([90d330f](https://github.com/ludora-app/ludora-mobile/commit/90d330f78bfc0dc4fb9a8f9eb373e3f9161e4b46))
* **SCRUM-440:** Reduce next step delay to 200ms using a named constant. ([970dc8e](https://github.com/ludora-app/ludora-mobile/commit/970dc8e8cb5ba8bde8e4c12652829bf0e8ca113a))
* **SCRUM-441:** Move public field duration form sheet to the root layout and enhance the session step 2 list component with draw distance and empty state options. ([17ecd97](https://github.com/ludora-app/ludora-mobile/commit/17ecd97e11b4e910531db88985b6c693999a2357))
* **SCRUM-441:** Remove `CreateSessionStep2FieldCardWrapper` and apply minor UI/styling adjustments to field cards and list components. ([63d027d](https://github.com/ludora-app/ludora-mobile/commit/63d027dd9c4c1228a153d486949e32d3c9f3d6fd))

### ♻️ Code Refactoring

* **SCRUM-448:** Implement store-based state management for session creation step 3, update team name validation, and enhance session detail analytics. ([e17b614](https://github.com/ludora-app/ludora-mobile/commit/e17b614dbaf849aac97915ffba763a5af6555469))

## [1.0.3-alpha.5](https://github.com/ludora-app/ludora-mobile/compare/v1.0.3-alpha.4...v1.0.3-alpha.5) (2026-03-01)

### ♻️ Code Refactoring

* **SCRUM-448:** Implement store-based state management for session creation step 3, update team name validation, and enhance session detail analytics. ([e17b614](https://github.com/ludora-app/ludora-mobile/commit/e17b614dbaf849aac97915ffba763a5af6555469))

## [1.0.3-alpha.4](https://github.com/ludora-app/ludora-mobile/compare/v1.0.3-alpha.3...v1.0.3-alpha.4) (2026-03-01)

### Bug Fixes

* **SCRUM-441:** Move public field duration form sheet to the root layout and enhance the session step 2 list component with draw distance and empty state options. ([17ecd97](https://github.com/ludora-app/ludora-mobile/commit/17ecd97e11b4e910531db88985b6c693999a2357))

## [1.0.3-alpha.3](https://github.com/ludora-app/ludora-mobile/compare/v1.0.3-alpha.2...v1.0.3-alpha.3) (2026-02-28)

### Bug Fixes

* **SCRUM-440:** Reduce next step delay to 200ms using a named constant. ([970dc8e](https://github.com/ludora-app/ludora-mobile/commit/970dc8e8cb5ba8bde8e4c12652829bf0e8ca113a))
* **SCRUM-441:** Remove `CreateSessionStep2FieldCardWrapper` and apply minor UI/styling adjustments to field cards and list components. ([63d027d](https://github.com/ludora-app/ludora-mobile/commit/63d027dd9c4c1228a153d486949e32d3c9f3d6fd))

## [1.0.3-alpha.2](https://github.com/ludora-app/ludora-mobile/compare/v1.0.3-alpha.1...v1.0.3-alpha.2) (2026-02-28)

### Bug Fixes

* **SCRUM-430:** Refine `List` component `paddingBottom` calculations across features to improve Android safe area handling and remove the `Wrapper` component from chat conversations. ([193c415](https://github.com/ludora-app/ludora-mobile/commit/193c4155a1ab9d32c3876567db41ea50b7ae060a))

## [1.0.3-alpha.1](https://github.com/ludora-app/ludora-mobile/compare/v1.0.2...v1.0.3-alpha.1) (2026-02-28)

### Bug Fixes

* **SCRUM-436:** fix missing birthdate ([90d330f](https://github.com/ludora-app/ludora-mobile/commit/90d330f78bfc0dc4fb9a8f9eb373e3f9161e4b46))
