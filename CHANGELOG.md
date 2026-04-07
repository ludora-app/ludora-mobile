## [1.6.1-alpha.1](https://github.com/ludora-app/ludora-mobile/compare/v1.6.0...v1.6.1-alpha.1) (2026-04-07)

### Bug Fixes

* **SCRUM-635:** optimize profile screen loading, fix date picker validation, and clean up dev tools ([#151](https://github.com/ludora-app/ludora-mobile/issues/151)) ([43a5efa](https://github.com/ludora-app/ludora-mobile/commit/43a5efa04199dd96a80b5e9b90509bac6780881d))

## [1.6.0](https://github.com/ludora-app/ludora-mobile/compare/v1.5.1...v1.6.0) (2026-04-07)

### ✨ Features

* **SCRUM-617:** enhance chat room message handling and UI components ([#133](https://github.com/ludora-app/ludora-mobile/issues/133)) ([452f38b](https://github.com/ludora-app/ludora-mobile/commit/452f38bedefb7984f79ebd1c38e8b2f4a89f1d51))
* **SCRUM-631:** introduce ComingSoon component and integrate it into create-session screen and profile badges section ([#146](https://github.com/ludora-app/ludora-mobile/issues/146)) ([c35536d](https://github.com/ludora-app/ludora-mobile/commit/c35536d65901c2f6af9ce31ca1c1599ae33335d8))
* **SCRUM-632:** add session teams route with finish status tracking ([#145](https://github.com/ludora-app/ludora-mobile/issues/145)) ([d837354](https://github.com/ludora-app/ludora-mobile/commit/d83735416156112b256a286a8bf872d27f1dca15))

### Bug Fixes

* **SCRUM-613:** introduce HeaderOutlined component and standardize header heights across features ([#131](https://github.com/ludora-app/ludora-mobile/issues/131)) ([0284cd0](https://github.com/ludora-app/ludora-mobile/commit/0284cd0368502e8e378972fe09308c890bc60dc9))
* **SCRUM-614:** improve error handling and type safety across various components ([#130](https://github.com/ludora-app/ludora-mobile/issues/130)) ([6958661](https://github.com/ludora-app/ludora-mobile/commit/69586619e35152f3851b84088cb5d21b12e603cc))
* **SCRUM-619:** enhance chat room initializer logic and fix scroll down button position ([#129](https://github.com/ludora-app/ludora-mobile/issues/129)) ([a3261f2](https://github.com/ludora-app/ludora-mobile/commit/a3261f278539b4a8480fa28f6bf31475df911add))
* **SCRUM-624:** update expo and related dependencies to improve compatibility ([#139](https://github.com/ludora-app/ludora-mobile/issues/139)) ([186afaa](https://github.com/ludora-app/ludora-mobile/commit/186afaa6993be1715e8842ba42cbfd1ba5baa400))
* **SCRUM-628:** correct spelling of "PADDEL" to "PADEL" across multiple constants and components ([#140](https://github.com/ludora-app/ludora-mobile/issues/140)) ([b8b079c](https://github.com/ludora-app/ludora-mobile/commit/b8b079c63a491de5a45c8744fcf52a59fa4b6dbb))
* **SCRUM-629:** standardize profile header height using safe area top padding across components ([#142](https://github.com/ludora-app/ludora-mobile/issues/142)) ([9226a21](https://github.com/ludora-app/ludora-mobile/commit/9226a21475f8dcf88cfb5be0f11082e938dae7fc))
* **SCRUM-633:** ignore additional Google sign-in error message when user data is missing ([#148](https://github.com/ludora-app/ludora-mobile/issues/148)) ([7830eda](https://github.com/ludora-app/ludora-mobile/commit/7830eda447486c9922c3b7f4da99319c7e957cab))

### ♻️ Code Refactoring

* **SCRUM-621:** remove bio field from session team list item component ([#135](https://github.com/ludora-app/ludora-mobile/issues/135)) ([af45918](https://github.com/ludora-app/ludora-mobile/commit/af45918608267a6a1de8da85163563b0d04be587))
* **SCRUM-625:** abstract session expiration logic to isAfterNow utility and restrict session actions to active sessions ([#144](https://github.com/ludora-app/ludora-mobile/issues/144)) ([a4d5716](https://github.com/ludora-app/ludora-mobile/commit/a4d5716cda22508566e34c8bb9bbe56556a812db))
* **SCRUM-630:** optimize list components with memoization and improve performance diagnostics ([#143](https://github.com/ludora-app/ludora-mobile/issues/143)) ([f823fbd](https://github.com/ludora-app/ludora-mobile/commit/f823fbd1098ed4888c72c4a8e2118a19470a1704))

## [1.6.0-next.3](https://github.com/ludora-app/ludora-mobile/compare/v1.6.0-next.2...v1.6.0-next.3) (2026-04-06)

### ✨ Features

* **SCRUM-631:** introduce ComingSoon component and integrate it into create-session screen and profile badges section ([#146](https://github.com/ludora-app/ludora-mobile/issues/146)) ([c35536d](https://github.com/ludora-app/ludora-mobile/commit/c35536d65901c2f6af9ce31ca1c1599ae33335d8))
* **SCRUM-632:** add session teams route with finish status tracking ([#145](https://github.com/ludora-app/ludora-mobile/issues/145)) ([d837354](https://github.com/ludora-app/ludora-mobile/commit/d83735416156112b256a286a8bf872d27f1dca15))

### Bug Fixes

* **SCRUM-629:** standardize profile header height using safe area top padding across components ([#142](https://github.com/ludora-app/ludora-mobile/issues/142)) ([9226a21](https://github.com/ludora-app/ludora-mobile/commit/9226a21475f8dcf88cfb5be0f11082e938dae7fc))
* **SCRUM-633:** ignore additional Google sign-in error message when user data is missing ([#148](https://github.com/ludora-app/ludora-mobile/issues/148)) ([7830eda](https://github.com/ludora-app/ludora-mobile/commit/7830eda447486c9922c3b7f4da99319c7e957cab))

### ♻️ Code Refactoring

* **SCRUM-625:** abstract session expiration logic to isAfterNow utility and restrict session actions to active sessions ([#144](https://github.com/ludora-app/ludora-mobile/issues/144)) ([a4d5716](https://github.com/ludora-app/ludora-mobile/commit/a4d5716cda22508566e34c8bb9bbe56556a812db))
* **SCRUM-630:** optimize list components with memoization and improve performance diagnostics ([#143](https://github.com/ludora-app/ludora-mobile/issues/143)) ([f823fbd](https://github.com/ludora-app/ludora-mobile/commit/f823fbd1098ed4888c72c4a8e2118a19470a1704))

## [1.6.0-alpha.9](https://github.com/ludora-app/ludora-mobile/compare/v1.6.0-alpha.8...v1.6.0-alpha.9) (2026-04-06)

### Bug Fixes

* **SCRUM-633:** ignore additional Google sign-in error message when user data is missing ([#148](https://github.com/ludora-app/ludora-mobile/issues/148)) ([7830eda](https://github.com/ludora-app/ludora-mobile/commit/7830eda447486c9922c3b7f4da99319c7e957cab))

## [1.6.0-alpha.8](https://github.com/ludora-app/ludora-mobile/compare/v1.6.0-alpha.7...v1.6.0-alpha.8) (2026-04-06)

### ✨ Features

* **SCRUM-631:** introduce ComingSoon component and integrate it into create-session screen and profile badges section ([#146](https://github.com/ludora-app/ludora-mobile/issues/146)) ([c35536d](https://github.com/ludora-app/ludora-mobile/commit/c35536d65901c2f6af9ce31ca1c1599ae33335d8))

## [1.6.0-alpha.7](https://github.com/ludora-app/ludora-mobile/compare/v1.6.0-alpha.6...v1.6.0-alpha.7) (2026-04-06)

### ✨ Features

* **SCRUM-632:** add session teams route with finish status tracking ([#145](https://github.com/ludora-app/ludora-mobile/issues/145)) ([d837354](https://github.com/ludora-app/ludora-mobile/commit/d83735416156112b256a286a8bf872d27f1dca15))

## [1.6.0-alpha.6](https://github.com/ludora-app/ludora-mobile/compare/v1.6.0-alpha.5...v1.6.0-alpha.6) (2026-04-06)

### ♻️ Code Refactoring

* **SCRUM-625:** abstract session expiration logic to isAfterNow utility and restrict session actions to active sessions ([#144](https://github.com/ludora-app/ludora-mobile/issues/144)) ([a4d5716](https://github.com/ludora-app/ludora-mobile/commit/a4d5716cda22508566e34c8bb9bbe56556a812db))

## [1.6.0-alpha.5](https://github.com/ludora-app/ludora-mobile/compare/v1.6.0-alpha.4...v1.6.0-alpha.5) (2026-04-06)

### ♻️ Code Refactoring

* **SCRUM-630:** optimize list components with memoization and improve performance diagnostics ([#143](https://github.com/ludora-app/ludora-mobile/issues/143)) ([f823fbd](https://github.com/ludora-app/ludora-mobile/commit/f823fbd1098ed4888c72c4a8e2118a19470a1704))

## [1.6.0-alpha.4](https://github.com/ludora-app/ludora-mobile/compare/v1.6.0-alpha.3...v1.6.0-alpha.4) (2026-04-06)

### Bug Fixes

* **SCRUM-629:** standardize profile header height using safe area top padding across components ([#142](https://github.com/ludora-app/ludora-mobile/issues/142)) ([9226a21](https://github.com/ludora-app/ludora-mobile/commit/9226a21475f8dcf88cfb5be0f11082e938dae7fc))

## [1.6.0-alpha.3](https://github.com/ludora-app/ludora-mobile/compare/v1.6.0-alpha.2...v1.6.0-alpha.3) (2026-04-06)

### Bug Fixes

* **SCRUM-624:** update expo and related dependencies to improve compatibility ([#139](https://github.com/ludora-app/ludora-mobile/issues/139)) ([186afaa](https://github.com/ludora-app/ludora-mobile/commit/186afaa6993be1715e8842ba42cbfd1ba5baa400))
* **SCRUM-628:** correct spelling of "PADDEL" to "PADEL" across multiple constants and components ([#140](https://github.com/ludora-app/ludora-mobile/issues/140)) ([b8b079c](https://github.com/ludora-app/ludora-mobile/commit/b8b079c63a491de5a45c8744fcf52a59fa4b6dbb))

## [1.6.0-alpha.2](https://github.com/ludora-app/ludora-mobile/compare/v1.6.0-alpha.1...v1.6.0-alpha.2) (2026-04-05)

### ♻️ Code Refactoring

* **SCRUM-621:** remove bio field from session team list item component ([#135](https://github.com/ludora-app/ludora-mobile/issues/135)) ([af45918](https://github.com/ludora-app/ludora-mobile/commit/af45918608267a6a1de8da85163563b0d04be587))

## [1.6.0-alpha.1](https://github.com/ludora-app/ludora-mobile/compare/v1.5.2-alpha.3...v1.6.0-alpha.1) (2026-04-05)

### ✨ Features

* **SCRUM-617:** enhance chat room message handling and UI components ([#133](https://github.com/ludora-app/ludora-mobile/issues/133)) ([452f38b](https://github.com/ludora-app/ludora-mobile/commit/452f38bedefb7984f79ebd1c38e8b2f4a89f1d51))

## [1.5.2-alpha.3](https://github.com/ludora-app/ludora-mobile/compare/v1.5.2-alpha.2...v1.5.2-alpha.3) (2026-04-04)

### Bug Fixes

* **SCRUM-613:** introduce HeaderOutlined component and standardize header heights across features ([#131](https://github.com/ludora-app/ludora-mobile/issues/131)) ([0284cd0](https://github.com/ludora-app/ludora-mobile/commit/0284cd0368502e8e378972fe09308c890bc60dc9))

## [1.5.2-alpha.2](https://github.com/ludora-app/ludora-mobile/compare/v1.5.2-alpha.1...v1.5.2-alpha.2) (2026-04-04)

### Bug Fixes

* **SCRUM-614:** improve error handling and type safety across various components ([#130](https://github.com/ludora-app/ludora-mobile/issues/130)) ([6958661](https://github.com/ludora-app/ludora-mobile/commit/69586619e35152f3851b84088cb5d21b12e603cc))

## [1.5.2-alpha.1](https://github.com/ludora-app/ludora-mobile/compare/v1.5.1...v1.5.2-alpha.1) (2026-04-04)

### Bug Fixes

* **SCRUM-619:** enhance chat room initializer logic and fix scroll down button position ([#129](https://github.com/ludora-app/ludora-mobile/issues/129)) ([a3261f2](https://github.com/ludora-app/ludora-mobile/commit/a3261f278539b4a8480fa28f6bf31475df911add))

## [1.5.1](https://github.com/ludora-app/ludora-mobile/compare/v1.5.0...v1.5.1) (2026-04-01)

### Bug Fixes

* **SCRUM-609:** update app.json settings, remove unused dependencies, and enhance version check functionality ([#126](https://github.com/ludora-app/ludora-mobile/issues/126)) ([2382979](https://github.com/ludora-app/ludora-mobile/commit/23829798e869fa89fa82fcb33c0eccfde7246d2b))

## [1.5.1-alpha.1](https://github.com/ludora-app/ludora-mobile/compare/v1.5.0...v1.5.1-alpha.1) (2026-04-01)

### Bug Fixes

* **SCRUM-609:** update app.json settings, remove unused dependencies, and enhance version check functionality ([#126](https://github.com/ludora-app/ludora-mobile/issues/126)) ([2382979](https://github.com/ludora-app/ludora-mobile/commit/23829798e869fa89fa82fcb33c0eccfde7246d2b))

## [1.5.0](https://github.com/ludora-app/ludora-mobile/compare/v1.4.0...v1.5.0) (2026-04-01)

### ✨ Features

* **SCRUM-599:** implement app version check and update modal with forced update support ([#118](https://github.com/ludora-app/ludora-mobile/issues/118)) ([74e0aad](https://github.com/ludora-app/ludora-mobile/commit/74e0aad8f7ed9c066f40f7b7a700beaf5c323e1b))
* **SCRUM-607:** add GlassView effect to DialogConfirm component for improved visual styling ([#120](https://github.com/ludora-app/ludora-mobile/issues/120)) ([c8d3092](https://github.com/ludora-app/ludora-mobile/commit/c8d3092c209d3fe63e62e999c0e902e03a51b40b))

### Bug Fixes

* force release for SCRUM-602 [skip ci] ([75b1e61](https://github.com/ludora-app/ludora-mobile/commit/75b1e61738f8992895963f4bd277c728dd62fea3))

### ♻️ Code Refactoring

* **SCRUM-605:** optimize query data processing with useMemo and memoize SessionCard component ([#121](https://github.com/ludora-app/ludora-mobile/issues/121)) ([7a767a5](https://github.com/ludora-app/ludora-mobile/commit/7a767a567eae39a6d44bfe859f287c5218ed5168))

## [1.5.0-alpha.3](https://github.com/ludora-app/ludora-mobile/compare/v1.5.0-alpha.2...v1.5.0-alpha.3) (2026-03-31)

### ♻️ Code Refactoring

* **SCRUM-605:** optimize query data processing with useMemo and memoize SessionCard component ([#121](https://github.com/ludora-app/ludora-mobile/issues/121)) ([7a767a5](https://github.com/ludora-app/ludora-mobile/commit/7a767a567eae39a6d44bfe859f287c5218ed5168))

## [1.5.0-alpha.2](https://github.com/ludora-app/ludora-mobile/compare/v1.5.0-alpha.1...v1.5.0-alpha.2) (2026-03-31)

### ✨ Features

* **SCRUM-607:** add GlassView effect to DialogConfirm component for improved visual styling ([#120](https://github.com/ludora-app/ludora-mobile/issues/120)) ([c8d3092](https://github.com/ludora-app/ludora-mobile/commit/c8d3092c209d3fe63e62e999c0e902e03a51b40b))

## [1.5.0-alpha.1](https://github.com/ludora-app/ludora-mobile/compare/v1.4.0...v1.5.0-alpha.1) (2026-03-31)

### ✨ Features

* **SCRUM-599:** implement app version check and update modal with forced update support ([#118](https://github.com/ludora-app/ludora-mobile/issues/118)) ([74e0aad](https://github.com/ludora-app/ludora-mobile/commit/74e0aad8f7ed9c066f40f7b7a700beaf5c323e1b))

### Bug Fixes

* force release for SCRUM-602 [skip ci] ([75b1e61](https://github.com/ludora-app/ludora-mobile/commit/75b1e61738f8992895963f4bd277c728dd62fea3))

## [1.4.0](https://github.com/ludora-app/ludora-mobile/compare/v1.3.0...v1.4.0) (2026-03-30)

### ✨ Features

* implement custom blur view component and refactor session team styling utilities, Change bubble message Colors to more clarity, add user name on message bubble for goupe messages and fix scroll bug on chat room ([8c73a14](https://github.com/ludora-app/ludora-mobile/commit/8c73a1484511219d88a0ca9dd501240e7a25cd38))
* **SCRUM-592:** enable tablet support, adjust orientation, and improve list padding for empty states ([#107](https://github.com/ludora-app/ludora-mobile/issues/107)) ([4c90831](https://github.com/ludora-app/ludora-mobile/commit/4c9083152acea48dff8f85d622245e876bba13c3))
* **SCRUM-594:** add block user dialog component and refactor user profile blocking logic ([#111](https://github.com/ludora-app/ludora-mobile/issues/111)) ([946b3b2](https://github.com/ludora-app/ludora-mobile/commit/946b3b2d64ef3a921e669dff7d5b784675a86ae3))
* **SCRUM-595:** migrate chat room store to context-based provider and implement user profile formsheet on group chat rooms ([#109](https://github.com/ludora-app/ludora-mobile/issues/109)) ([de952bd](https://github.com/ludora-app/ludora-mobile/commit/de952bdd5cfbad1534ae37893a6cfd7fc69bfd04))

### Bug Fixes

* **SCRUM-596:** update profil-header layout spacing ([#108](https://github.com/ludora-app/ludora-mobile/issues/108)) ([5e83226](https://github.com/ludora-app/ludora-mobile/commit/5e83226d584dfc8f0c054155839060ca085f355b))

### ♻️ Code Refactoring

* **SCRUM-597:** remove sheetCornerRadius from iOS stack screen configurations ([#110](https://github.com/ludora-app/ludora-mobile/issues/110)) ([eae9098](https://github.com/ludora-app/ludora-mobile/commit/eae9098e6eb52afadc0645c428a1ebd88a9ae20f))

## [1.3.0-next.2](https://github.com/ludora-app/ludora-mobile/compare/v1.3.0-next.1...v1.3.0-next.2) (2026-03-30)

### ✨ Features

* implement custom blur view component and refactor session team styling utilities, Change bubble message Colors to more clarity, add user name on message bubble for goupe messages and fix scroll bug on chat room ([8c73a14](https://github.com/ludora-app/ludora-mobile/commit/8c73a1484511219d88a0ca9dd501240e7a25cd38))
* **SCRUM-592:** enable tablet support, adjust orientation, and improve list padding for empty states ([#107](https://github.com/ludora-app/ludora-mobile/issues/107)) ([4c90831](https://github.com/ludora-app/ludora-mobile/commit/4c9083152acea48dff8f85d622245e876bba13c3))
* **SCRUM-594:** add block user dialog component and refactor user profile blocking logic ([#111](https://github.com/ludora-app/ludora-mobile/issues/111)) ([946b3b2](https://github.com/ludora-app/ludora-mobile/commit/946b3b2d64ef3a921e669dff7d5b784675a86ae3))
* **SCRUM-595:** migrate chat room store to context-based provider and implement user profile formsheet on group chat rooms ([#109](https://github.com/ludora-app/ludora-mobile/issues/109)) ([de952bd](https://github.com/ludora-app/ludora-mobile/commit/de952bdd5cfbad1534ae37893a6cfd7fc69bfd04))

### Bug Fixes

* **SCRUM-596:** update profil-header layout spacing ([#108](https://github.com/ludora-app/ludora-mobile/issues/108)) ([5e83226](https://github.com/ludora-app/ludora-mobile/commit/5e83226d584dfc8f0c054155839060ca085f355b))

### ♻️ Code Refactoring

* **SCRUM-597:** remove sheetCornerRadius from iOS stack screen configurations ([#110](https://github.com/ludora-app/ludora-mobile/issues/110)) ([eae9098](https://github.com/ludora-app/ludora-mobile/commit/eae9098e6eb52afadc0645c428a1ebd88a9ae20f))

## [1.3.0-alpha.28](https://github.com/ludora-app/ludora-mobile/compare/v1.3.0-alpha.27...v1.3.0-alpha.28) (2026-03-30)

### ✨ Features

* **SCRUM-594:** add block user dialog component and refactor user profile blocking logic ([#111](https://github.com/ludora-app/ludora-mobile/issues/111)) ([946b3b2](https://github.com/ludora-app/ludora-mobile/commit/946b3b2d64ef3a921e669dff7d5b784675a86ae3))

## [1.3.0-alpha.27](https://github.com/ludora-app/ludora-mobile/compare/v1.3.0-alpha.26...v1.3.0-alpha.27) (2026-03-30)

### ♻️ Code Refactoring

* **SCRUM-597:** remove sheetCornerRadius from iOS stack screen configurations ([#110](https://github.com/ludora-app/ludora-mobile/issues/110)) ([eae9098](https://github.com/ludora-app/ludora-mobile/commit/eae9098e6eb52afadc0645c428a1ebd88a9ae20f))

## [1.3.0-alpha.26](https://github.com/ludora-app/ludora-mobile/compare/v1.3.0-alpha.25...v1.3.0-alpha.26) (2026-03-30)

### ✨ Features

* **SCRUM-595:** migrate chat room store to context-based provider and implement user profile formsheet on group chat rooms ([#109](https://github.com/ludora-app/ludora-mobile/issues/109)) ([de952bd](https://github.com/ludora-app/ludora-mobile/commit/de952bdd5cfbad1534ae37893a6cfd7fc69bfd04))

## [1.3.0-alpha.25](https://github.com/ludora-app/ludora-mobile/compare/v1.3.0-alpha.24...v1.3.0-alpha.25) (2026-03-29)

### Bug Fixes

* **SCRUM-596:** update profil-header layout spacing ([#108](https://github.com/ludora-app/ludora-mobile/issues/108)) ([5e83226](https://github.com/ludora-app/ludora-mobile/commit/5e83226d584dfc8f0c054155839060ca085f355b))

## [1.3.0-alpha.24](https://github.com/ludora-app/ludora-mobile/compare/v1.3.0-alpha.23...v1.3.0-alpha.24) (2026-03-29)

### ✨ Features

* **SCRUM-592:** enable tablet support, adjust orientation, and improve list padding for empty states ([#107](https://github.com/ludora-app/ludora-mobile/issues/107)) ([4c90831](https://github.com/ludora-app/ludora-mobile/commit/4c9083152acea48dff8f85d622245e876bba13c3))

## [1.3.0-alpha.23](https://github.com/ludora-app/ludora-mobile/compare/v1.3.0-alpha.22...v1.3.0-alpha.23) (2026-03-29)

### ✨ Features

* implement custom blur view component and refactor session team styling utilities, Change bubble message Colors to more clarity, add user name on message bubble for goupe messages and fix scroll bug on chat room ([8c73a14](https://github.com/ludora-app/ludora-mobile/commit/8c73a1484511219d88a0ca9dd501240e7a25cd38))

## [1.3.0-alpha.22](https://github.com/ludora-app/ludora-mobile/compare/v1.3.0-alpha.21...v1.3.0-alpha.22) (2026-03-24)

### ♻️ Code Refactoring

* **SCRUM-581:** adjust button layout and styling in ProfilSection3Me component. ([#103](https://github.com/ludora-app/ludora-mobile/issues/103)) ([1d9e2a2](https://github.com/ludora-app/ludora-mobile/commit/1d9e2a28b36d0dbea5243bcc29939de9442f6020))

## [1.3.0-alpha.21](https://github.com/ludora-app/ludora-mobile/compare/v1.3.0-alpha.20...v1.3.0-alpha.21) (2026-03-24)

### ♻️ Code Refactoring

* **SCRUM-582:** dynamically apply bottom safe area padding using `useSafeArea` hook in login and register screens. ([#102](https://github.com/ludora-app/ludora-mobile/issues/102)) ([a4cfd4a](https://github.com/ludora-app/ludora-mobile/commit/a4cfd4a542973bbeaabe74f10825f234fde298a6))

## [1.3.0-alpha.20](https://github.com/ludora-app/ludora-mobile/compare/v1.3.0-alpha.19...v1.3.0-alpha.20) (2026-03-24)

### ✨ Features

* **scrum-580:** Display alert and link to settings when image picker permissions are rejected. ([#101](https://github.com/ludora-app/ludora-mobile/issues/101)) ([7e6373c](https://github.com/ludora-app/ludora-mobile/commit/7e6373c0644389aee4ddcceedc388f59dda9a69d))

## [1.3.0-alpha.19](https://github.com/ludora-app/ludora-mobile/compare/v1.3.0-alpha.18...v1.3.0-alpha.19) (2026-03-24)

### ✨ Features

* **SCRUM-585:** update permission messages for location, photos, and camera, and add iOS fullscreen requirement. ([#100](https://github.com/ludora-app/ludora-mobile/issues/100)) ([2d3d81f](https://github.com/ludora-app/ludora-mobile/commit/2d3d81ff8bdd53ed789897f419a8561797d67a80))

## [1.3.0-alpha.18](https://github.com/ludora-app/ludora-mobile/compare/v1.3.0-alpha.17...v1.3.0-alpha.18) (2026-03-23)

### ✨ Features

* **SCRUM-584:** replace `expo-blur` with `@sbaiahmed1/react-native-blur` for blur effects and adjust blur intensity. ([#99](https://github.com/ludora-app/ludora-mobile/issues/99)) ([061eef3](https://github.com/ludora-app/ludora-mobile/commit/061eef3555eb1004af485b5c6ab20a4891416ebf))

## [1.3.0-alpha.17](https://github.com/ludora-app/ludora-mobile/compare/v1.3.0-alpha.16...v1.3.0-alpha.17) (2026-03-23)

### ✨ Features

* **SCRUM-577:** Implement Apple social login and integrate it into a… ([#98](https://github.com/ludora-app/ludora-mobile/issues/98)) ([e050f74](https://github.com/ludora-app/ludora-mobile/commit/e050f74b726def0a15714677c706eb316a5ae410))

## [1.3.0-alpha.16](https://github.com/ludora-app/ludora-mobile/compare/v1.3.0-alpha.15...v1.3.0-alpha.16) (2026-03-23)

### ✨ Features

* **SCRUM-583:** update expo dependencies. ([#97](https://github.com/ludora-app/ludora-mobile/issues/97)) ([69680fa](https://github.com/ludora-app/ludora-mobile/commit/69680fad3a321fbc69d9eaa8663afda3d87255f8))

## [1.3.0-alpha.15](https://github.com/ludora-app/ludora-mobile/compare/v1.3.0-alpha.14...v1.3.0-alpha.15) (2026-03-22)

### ✨ Features

* **SCRUM-578:** Introduce token versioning to the WebSocket store to ensure re-authentication after token refresh. ([#96](https://github.com/ludora-app/ludora-mobile/issues/96)) ([da91d66](https://github.com/ludora-app/ludora-mobile/commit/da91d669441233f435fe1705aea9ff4e44b9c654))

## [1.3.0-alpha.14](https://github.com/ludora-app/ludora-mobile/compare/v1.3.0-alpha.13...v1.3.0-alpha.14) (2026-03-22)

### ✨ Features

* **SCRUM-568:** enhance button disabled state with opacity and refine input selection styling for iOS. ([#95](https://github.com/ludora-app/ludora-mobile/issues/95)) ([7792f6f](https://github.com/ludora-app/ludora-mobile/commit/7792f6f31c9cfb0a7f54a556604ccb9986c1bc00))

## [1.3.0-alpha.13](https://github.com/ludora-app/ludora-mobile/compare/v1.3.0-alpha.12...v1.3.0-alpha.13) (2026-03-22)

### ✨ Features

* **SCRUM-567:** update input cursor and selection colors. ([#94](https://github.com/ludora-app/ludora-mobile/issues/94)) ([ee4f4db](https://github.com/ludora-app/ludora-mobile/commit/ee4f4db9a3e77338c1a8ef132eb2a05c0672191e))

## [1.3.0-alpha.12](https://github.com/ludora-app/ludora-mobile/compare/v1.3.0-alpha.11...v1.3.0-alpha.12) (2026-03-22)

### ✨ Features

* **SCRUM-564:** Implement error tracking for several queries, add a chat room message read fallback initializer, and remove the rn-emoji-keyboard dependency. ([#93](https://github.com/ludora-app/ludora-mobile/issues/93)) ([71e4d6a](https://github.com/ludora-app/ludora-mobile/commit/71e4d6a66293076d8a4bd360067d5beae339e95c))

### ♻️ Code Refactoring

* **SCRUM-563:** update layout and styling for sport level card component; adjust padding in onboarding screens ([#91](https://github.com/ludora-app/ludora-mobile/issues/91)) ([4bf42bb](https://github.com/ludora-app/ludora-mobile/commit/4bf42bb630468c2f21f0c5ff131c2e102fed92ae))

## [1.3.0-alpha.11](https://github.com/ludora-app/ludora-mobile/compare/v1.3.0-alpha.10...v1.3.0-alpha.11) (2026-03-19)

### ♻️ Code Refactoring

* **SCRUM-561:** remove unused images and update imports in rating card component ([#90](https://github.com/ludora-app/ludora-mobile/issues/90)) ([7e5f5f7](https://github.com/ludora-app/ludora-mobile/commit/7e5f5f7f20608634f543e79228ccab1ef90b9eb6))

## [1.3.0-alpha.10](https://github.com/ludora-app/ludora-mobile/compare/v1.3.0-alpha.9...v1.3.0-alpha.10) (2026-03-19)

### ✨ Features

* **SCRUM-549:** Add associated domains for universal links ([#89](https://github.com/ludora-app/ludora-mobile/issues/89)) ([caea1c8](https://github.com/ludora-app/ludora-mobile/commit/caea1c80aee9e3d351c6f86a65aacb3ad4a64b22))

## [1.3.0-alpha.9](https://github.com/ludora-app/ludora-mobile/compare/v1.3.0-alpha.8...v1.3.0-alpha.9) (2026-03-19)

### ✨ Features

* **SCRUM-553:** Enhance emoji picker functionality by adding reset on conversation change and clearing pending emojis ([#88](https://github.com/ludora-app/ludora-mobile/issues/88)) ([19f02f0](https://github.com/ludora-app/ludora-mobile/commit/19f02f04f9f2af95fe4d6da12113f0ca54f9377e))

## [1.3.0-alpha.8](https://github.com/ludora-app/ludora-mobile/compare/v1.3.0-alpha.7...v1.3.0-alpha.8) (2026-03-19)

### Bug Fixes

* **SCRUM-559:** Update button titles in WelcomeFooter component for consistency with common translations ([#87](https://github.com/ludora-app/ludora-mobile/issues/87)) ([943ff46](https://github.com/ludora-app/ludora-mobile/commit/943ff46269e1d297c0078c1ccb27af69bbdfdc19))

## [1.3.0-alpha.7](https://github.com/ludora-app/ludora-mobile/compare/v1.3.0-alpha.6...v1.3.0-alpha.7) (2026-03-19)

### Bug Fixes

* **SCRUM-560:** Add digit requirement to password schema validation ([#86](https://github.com/ludora-app/ludora-mobile/issues/86)) ([c0dbcb2](https://github.com/ludora-app/ludora-mobile/commit/c0dbcb27f506cc515a7679fd6444118f581f91f7))

## [1.3.0-alpha.6](https://github.com/ludora-app/ludora-mobile/compare/v1.3.0-alpha.5...v1.3.0-alpha.6) (2026-03-19)

### ✨ Features

* **SCRUM-557:** Enhance HeaderScreen component with new props for left content styling and icon customization; adjust layout in home and players list components for improved UI consistency. ([#85](https://github.com/ludora-app/ludora-mobile/issues/85)) ([4ab100a](https://github.com/ludora-app/ludora-mobile/commit/4ab100a975ab3787a4134ea5f88e4015500c5e26))

## [1.3.0-alpha.5](https://github.com/ludora-app/ludora-mobile/compare/v1.3.0-alpha.4...v1.3.0-alpha.5) (2026-03-18)

### ✨ Features

* **SCRUM-556:** Enhance WrapperKeyboardAwareScrollView with keyboard toolbar support, update type definitions and add Keyboard tool to register screen ([#84](https://github.com/ludora-app/ludora-mobile/issues/84)) ([9e11403](https://github.com/ludora-app/ludora-mobile/commit/9e11403502017a6207ffffbb96f5ee1c0063ab91))

## [1.3.0-alpha.4](https://github.com/ludora-app/ludora-mobile/compare/v1.3.0-alpha.3...v1.3.0-alpha.4) (2026-03-18)

### ✨ Features

* **SCRUM-555:** Update keyboard behavior in List component, adjust EmptyResult margin, and enhance FormSheetFooter with layout support ([#83](https://github.com/ludora-app/ludora-mobile/issues/83)) ([c8e77b5](https://github.com/ludora-app/ludora-mobile/commit/c8e77b52fc8a20b80747f6a432316ce4e78620b6))

## [1.3.0-alpha.3](https://github.com/ludora-app/ludora-mobile/compare/v1.3.0-alpha.2...v1.3.0-alpha.3) (2026-03-18)

### ✨ Features

* **SCRUM-552:** Enhance image picker robustness by preventing concurrent calls, retaining selection on cancel, improving image validation, and handling camera availability. ([#82](https://github.com/ludora-app/ludora-mobile/issues/82)) ([9309076](https://github.com/ludora-app/ludora-mobile/commit/9309076fbbba9af830b3b966e6c1d712e2cf3871))

## [1.3.0-alpha.2](https://github.com/ludora-app/ludora-mobile/compare/v1.3.0-alpha.1...v1.3.0-alpha.2) (2026-03-18)

### ✨ Features

* **SCRUM-548:** implement internationalization for various UI components and error messages ([#81](https://github.com/ludora-app/ludora-mobile/issues/81)) ([c4930c7](https://github.com/ludora-app/ludora-mobile/commit/c4930c7bd9cb7e0e771fac977774d81b5cdefc3c))

## [1.3.0-alpha.1](https://github.com/ludora-app/ludora-mobile/compare/v1.2.4...v1.3.0-alpha.1) (2026-03-17)

### ✨ Features

* **SCRUM-546:** Update typography variants for notification list item ([#80](https://github.com/ludora-app/ludora-mobile/issues/80)) ([066cff9](https://github.com/ludora-app/ludora-mobile/commit/066cff9f0ef6b36ef29ed3725462e977a0aa687c))

## [1.2.1](https://github.com/ludora-app/ludora-mobile/compare/v1.2.0...v1.2.1) (2026-03-16)

### Bug Fixes

* **SCRUM-544:** Adjust time slot calculation to ensure proper availability handling for today ([#73](https://github.com/ludora-app/ludora-mobile/issues/73)) ([e2d706f](https://github.com/ludora-app/ludora-mobile/commit/e2d706f6417a71f4027603e3d4742edd6e1c2f08))
* **SCRUM-544:** Adjust time slot calculation to ensure proper availability handling for today ([#73](https://github.com/ludora-app/ludora-mobile/issues/73)) ([#74](https://github.com/ludora-app/ludora-mobile/issues/74)) ([b27c172](https://github.com/ludora-app/ludora-mobile/commit/b27c1729e07f39a8207d368980334c56487c1108))

## [1.2.0-next.2](https://github.com/ludora-app/ludora-mobile/compare/v1.2.0-next.1...v1.2.0-next.2) (2026-03-16)

### Bug Fixes

* **SCRUM-544:** Adjust time slot calculation to ensure proper availability handling for today ([#73](https://github.com/ludora-app/ludora-mobile/issues/73)) ([e2d706f](https://github.com/ludora-app/ludora-mobile/commit/e2d706f6417a71f4027603e3d4742edd6e1c2f08))
* **SCRUM-544:** Adjust time slot calculation to ensure proper availability handling for today ([#73](https://github.com/ludora-app/ludora-mobile/issues/73)) ([#74](https://github.com/ludora-app/ludora-mobile/issues/74)) ([b27c172](https://github.com/ludora-app/ludora-mobile/commit/b27c1729e07f39a8207d368980334c56487c1108))

## [1.2.0-next.1](https://github.com/ludora-app/ludora-mobile/compare/v1.1.0...v1.2.0-next.1) (2026-03-16)

### ✨ Features

* **SCRUM-539:** Prevent team selection and joining after a session has ended or started. ([#65](https://github.com/ludora-app/ludora-mobile/issues/65)) ([31b46b5](https://github.com/ludora-app/ludora-mobile/commit/31b46b5b7611051ed53698c0c6a14868a4d6f8c0))

### Bug Fixes

* **SCRUM-538:** update contact form loading state and simplify ludo-pen-border SVG by inlining styles. ([#64](https://github.com/ludora-app/ludora-mobile/issues/64)) ([1016de1](https://github.com/ludora-app/ludora-mobile/commit/1016de130c3737ef1f5bc6c3262d5b8dce97527e))

### ♻️ Code Refactoring

* **SCRUM-540:** Relocate legal settings section configuration. ([#66](https://github.com/ludora-app/ludora-mobile/issues/66)) ([cc31026](https://github.com/ludora-app/ludora-mobile/commit/cc3102603917715ed57f511ad9adff6fb4bff06f))
* **SCRUM-541:** Integrate Google Sign-In plugin and enhance Places API queries ([#67](https://github.com/ludora-app/ludora-mobile/issues/67)) ([46cd2b2](https://github.com/ludora-app/ludora-mobile/commit/46cd2b2173e3f8b6a5c1f018503139dc2b0be17a))
* **SCRUM-542:** Update sports placeholder images and session card component ([#68](https://github.com/ludora-app/ludora-mobile/issues/68)) ([bb65fcc](https://github.com/ludora-app/ludora-mobile/commit/bb65fcc2f34e67299d4f48b9c07849473bce8a63))

## [1.2.0-alpha.3](https://github.com/ludora-app/ludora-mobile/compare/v1.2.0-alpha.2...v1.2.0-alpha.3) (2026-03-16)

### ♻️ Code Refactoring

* **SCRUM-541:** Integrate Google Sign-In plugin and enhance Places API queries ([#67](https://github.com/ludora-app/ludora-mobile/issues/67)) ([46cd2b2](https://github.com/ludora-app/ludora-mobile/commit/46cd2b2173e3f8b6a5c1f018503139dc2b0be17a))

## [1.2.0-alpha.2](https://github.com/ludora-app/ludora-mobile/compare/v1.2.0-alpha.1...v1.2.0-alpha.2) (2026-03-15)

### ♻️ Code Refactoring

* **SCRUM-540:** Relocate legal settings section configuration. ([#66](https://github.com/ludora-app/ludora-mobile/issues/66)) ([cc31026](https://github.com/ludora-app/ludora-mobile/commit/cc3102603917715ed57f511ad9adff6fb4bff06f))

## [1.2.0-alpha.1](https://github.com/ludora-app/ludora-mobile/compare/v1.1.1-alpha.1...v1.2.0-alpha.1) (2026-03-15)

### ✨ Features

* **SCRUM-539:** Prevent team selection and joining after a session has ended or started. ([#65](https://github.com/ludora-app/ludora-mobile/issues/65)) ([31b46b5](https://github.com/ludora-app/ludora-mobile/commit/31b46b5b7611051ed53698c0c6a14868a4d6f8c0))

## [1.1.1-alpha.1](https://github.com/ludora-app/ludora-mobile/compare/v1.1.0...v1.1.1-alpha.1) (2026-03-15)

### Bug Fixes

* **SCRUM-538:** update contact form loading state and simplify ludo-pen-border SVG by inlining styles. ([#64](https://github.com/ludora-app/ludora-mobile/issues/64)) ([1016de1](https://github.com/ludora-app/ludora-mobile/commit/1016de130c3737ef1f5bc6c3262d5b8dce97527e))

## [1.1.0](https://github.com/ludora-app/ludora-mobile/compare/v1.0.2...v1.1.0) (2026-03-14)

### ✨ Features

* **SCRUM-455:** Implement a new Accordion component and integrate it into a new FAQ settings screen. ([#51](https://github.com/ludora-app/ludora-mobile/issues/51)) ([d891237](https://github.com/ludora-app/ludora-mobile/commit/d891237e87faa42e839e447231abcf6e78dac796))
* **SCRUM-456:** Add a contact support screen to settings with form validation and CRM integration, including input component enhancements. ([#50](https://github.com/ludora-app/ludora-mobile/issues/50)) ([0d9d1dd](https://github.com/ludora-app/ludora-mobile/commit/0d9d1dd654e93814395eb9691d5be9dd10e8b66e))
* **SCRUM-462:** Introduce multiple Android notification channels and centralize their common configuration. ([#54](https://github.com/ludora-app/ludora-mobile/issues/54)) ([6592f81](https://github.com/ludora-app/ludora-mobile/commit/6592f8122eba1f4a3aec14619e6cd5e96014eb78))
* **SCRUM-477:** Update app branding assets, refine environment configuration, and add Google Services file generation from Vault. ([#52](https://github.com/ludora-app/ludora-mobile/issues/52)) ([e1d949a](https://github.com/ludora-app/ludora-mobile/commit/e1d949a5879c456f7d7d268b5ea2c70d387a820b))
* **SCRUM-478:** Implement loading state for user location fetching and enable accuracy configuration for location requests. ([#38](https://github.com/ludora-app/ludora-mobile/issues/38)) ([8154fac](https://github.com/ludora-app/ludora-mobile/commit/8154fac027052b197f75447f7ce0dcc260325654))
* **SCRUM-479:** introduce new Dialog component and its sub-components, integrating it for confirmation flows in chat room info. ([#32](https://github.com/ludora-app/ludora-mobile/issues/32)) ([8b3ad45](https://github.com/ludora-app/ludora-mobile/commit/8b3ad45e98a2771f38aa247e1b29160362cbea28))
* **SCRUM-485:** Implement session team switching functionality and refactor session team display into a shared component. ([#47](https://github.com/ludora-app/ludora-mobile/issues/47)) ([94ab34b](https://github.com/ludora-app/ludora-mobile/commit/94ab34b5c4f9c3801b630cf523d03c274f5f56da))
* **SCRUM-486:** Cap displayed unread notification count at 99 and use a ROUTES constant for navigation. ([#45](https://github.com/ludora-app/ludora-mobile/issues/45)) ([fadcd02](https://github.com/ludora-app/ludora-mobile/commit/fadcd027f3c4a70e125ddc01a72d97ceca00c34e))
* **SCRUM-487:** Add profile navigation to friend request notifications and ensure friend list invalidation upon acceptance. ([#44](https://github.com/ludora-app/ludora-mobile/issues/44)) ([595fa72](https://github.com/ludora-app/ludora-mobile/commit/595fa726cb79bb56783f264c2349762ee715a592))
* **SCRUM-488:** Implement warning toast for leaving started sessions and update warning toast background color. ([#46](https://github.com/ludora-app/ludora-mobile/issues/46)) ([5559cb1](https://github.com/ludora-app/ludora-mobile/commit/5559cb152d60a6a849532d60dff206f7d3004101))
* **SCRUM-489:** Implement user blocking functionality, a profile actions formsheet, and a blocked users management screen in settings. ([#33](https://github.com/ludora-app/ludora-mobile/issues/33)) ([80de4ed](https://github.com/ludora-app/ludora-mobile/commit/80de4ed5106f67e0d40621b1e82dbf3511208781))
* **SCRUM-490:** add user reporting functionality including UI for reasons, confirmation, and API integration. ([#34](https://github.com/ludora-app/ludora-mobile/issues/34)) ([145e5e9](https://github.com/ludora-app/ludora-mobile/commit/145e5e955120f30ffc796134bd3b93d2dacbb4c6))
* **SCRUM-493:** Implement remove friend functionality and refine friend request handling with updated query invalidation. ([#37](https://github.com/ludora-app/ludora-mobile/issues/37)) ([dd3c7f3](https://github.com/ludora-app/ludora-mobile/commit/dd3c7f3047e2b2f401ccff96fed20a8bc5045ee3))
* **SCRUM-498:** Implement unblock user functionality in settings, including a new query, refactored list item component with a confirmation dialog, and a skeleton loader. ([#42](https://github.com/ludora-app/ludora-mobile/issues/42)) ([3c04d2a](https://github.com/ludora-app/ludora-mobile/commit/3c04d2a0dd193bb5d5b4c5daac121197773d593d))
* **SCRUM-502:** Add fordbidden-contact-regular SVG icon, update blocked users section to use it, and round settings menu item icon containers. ([#41](https://github.com/ludora-app/ludora-mobile/issues/41)) ([cfd1dca](https://github.com/ludora-app/ludora-mobile/commit/cfd1dcabb489bc94965f1291722bf635de759687))
* **SCRUM-507:** Implement reset methods for various stores and integrate them into the resetCaches utility. ([#39](https://github.com/ludora-app/ludora-mobile/issues/39)) ([dccd6f1](https://github.com/ludora-app/ludora-mobile/commit/dccd6f19c837f4f9f64b83ad33f258e6b01eb6c2))
* **SCRUM-510:** implement a dedicated Not Found screen and redirect to it for missing user or session data by handling 404 API responses. ([#43](https://github.com/ludora-app/ludora-mobile/issues/43)) ([727c87d](https://github.com/ludora-app/ludora-mobile/commit/727c87d0b63b28aadb130746709812f8c5f17d4b))
* **SCRUM-516:** Implement keyboard management and remove audio recording from chat input. ([#53](https://github.com/ludora-app/ludora-mobile/issues/53)) ([b864af6](https://github.com/ludora-app/ludora-mobile/commit/b864af6e34dd85e340b1b0257bd71398538c7f69))
* **SCRUM-532:** Introduce a dedicated staging API environment and URL configuration. ([#57](https://github.com/ludora-app/ludora-mobile/issues/57)) ([6015971](https://github.com/ludora-app/ludora-mobile/commit/60159715d9870722677aa281f6206021bd567239))
* **SCRUM-534:** update avatar ImageUrL prop to accept ImageSource and add sport placeholder images. ([#60](https://github.com/ludora-app/ludora-mobile/issues/60)) ([89e7a72](https://github.com/ludora-app/ludora-mobile/commit/89e7a72b364482fbe6ddda1e7d985e027c57ed3e))
* **SCRUM-537:** Implement auto-play and looping for the welcome carousel, initialize planning days with the selected date, and set a dark status bar style for specific screens. ([#61](https://github.com/ludora-app/ludora-mobile/issues/61)) ([3813998](https://github.com/ludora-app/ludora-mobile/commit/3813998e4326a8d1c0e0ac7b7ce38676e1c7fa28))

### Bug Fixes

* add .easignore and firebase config ([d73e418](https://github.com/ludora-app/ludora-mobile/commit/d73e4184442e78a575130bdebcea4b538cdbc266))
* add .easignore and firebase config ([3850ca7](https://github.com/ludora-app/ludora-mobile/commit/3850ca700cc0c3e22323898816a18062a3035ae7))
* **ci:** Pin EAS version to latest in Expo GitHub Action. ([992c68c](https://github.com/ludora-app/ludora-mobile/commit/992c68c8eceb24de0b357814ab2a0bfc8bab92b3))
* **SCRUM-306:** Trim user input strings, clean session data by removing empty values, and enable dev tools in development environments. ([9778beb](https://github.com/ludora-app/ludora-mobile/commit/9778beb7f86128f6c7c368f7b27a0cafd175dcad))
* **SCRUM-429:** Implement an optimistic message queue system for chat, including real-time updates and improved conversation list cache management. ([97cc0e1](https://github.com/ludora-app/ludora-mobile/commit/97cc0e11236911a3a2b03a30727972648029f911))
* **SCRUM-430:** Refine `List` component `paddingBottom` calculations across features to improve Android safe area handling and remove the `Wrapper` component from chat conversations. ([193c415](https://github.com/ludora-app/ludora-mobile/commit/193c4155a1ab9d32c3876567db41ea50b7ae060a))
* **SCRUM-432:** use `getApiUrl` utility instead of a hardcoded local API URL for the refresh token endpoint. ([4e5cd21](https://github.com/ludora-app/ludora-mobile/commit/4e5cd21197dd3bf63c44c347ad686a4539078377))
* **SCRUM-434:** Update optimistic message createdAt timestamp and re-insert into cache if evicted during retry. ([#30](https://github.com/ludora-app/ludora-mobile/issues/30)) ([f1c50fc](https://github.com/ludora-app/ludora-mobile/commit/f1c50fce3ccfc671ca2593e5154b2e7ac13184f3))
* **SCRUM-436:** fix missing birthdate ([90d330f](https://github.com/ludora-app/ludora-mobile/commit/90d330f78bfc0dc4fb9a8f9eb373e3f9161e4b46))
* **SCRUM-437:** Enhance profil edit screen with dynamic icons, conditional display, and routing based on user provider. ([#16](https://github.com/ludora-app/ludora-mobile/issues/16)) ([99a0b42](https://github.com/ludora-app/ludora-mobile/commit/99a0b4288454a0faddbeaac383ec320fad0f51d6))
* **SCRUM-440:** Reduce next step delay to 200ms using a named constant. ([970dc8e](https://github.com/ludora-app/ludora-mobile/commit/970dc8e8cb5ba8bde8e4c12652829bf0e8ca113a))
* **SCRUM-441:** Move public field duration form sheet to the root layout and enhance the session step 2 list component with draw distance and empty state options. ([17ecd97](https://github.com/ludora-app/ludora-mobile/commit/17ecd97e11b4e910531db88985b6c693999a2357))
* **SCRUM-441:** Remove `CreateSessionStep2FieldCardWrapper` and apply minor UI/styling adjustments to field cards and list components. ([63d027d](https://github.com/ludora-app/ludora-mobile/commit/63d027dd9c4c1228a153d486949e32d3c9f3d6fd))
* **SCRUM-443:** Update navigation from `router.push` to `router.navigate` and refresh app icons. ([a65435a](https://github.com/ludora-app/ludora-mobile/commit/a65435a9bb532ba612e563ab674e71b319a4a24f))
* **SCRUM-452:** Add GET method error tracking, ignoring 404s, and disable retries for the friend request query. ([#28](https://github.com/ludora-app/ludora-mobile/issues/28)) ([948b0f4](https://github.com/ludora-app/ludora-mobile/commit/948b0f4d3a593447ad656666f377792a23da1f51))
* **SCRUM-453:** Add danger color to the logout button loader and reorder logout logic to proactively clear authentication state and caches. ([39a2633](https://github.com/ludora-app/ludora-mobile/commit/39a2633b4d4ad08031f44f369a70c0735e10acf8))
* **SCRUM-453:** Implement onBlur form validation with manual triggering and refine birthdate schema using dayjs. ([14db4cd](https://github.com/ludora-app/ludora-mobile/commit/14db4cdf075afd7a016277fdb45812dcd079443a))
* **SCRUM-468:** restructure root stack screens with new grouping comments and update animations to fix modal to screen on ios ([#29](https://github.com/ludora-app/ludora-mobile/issues/29)) ([f380e24](https://github.com/ludora-app/ludora-mobile/commit/f380e2404b68e7129ae87388e320893d4aca6aef))
* **SCRUM-470:** fix flicking items on filters  due to the dynamic height of the icon levels  by adding fixed height and width ([99c78e8](https://github.com/ludora-app/ludora-mobile/commit/99c78e86fe2c033dfc50513c8b6e0c17023088a8))
* **SCRUM-471:** fix crash on notification page due to days plugins - centralize dayjs configuration and imports into a dedicated utility file. ([71eacd8](https://github.com/ludora-app/ludora-mobile/commit/71eacd85eeae92f4b105aef3c24f503677cd78cd))
* **SCRUM-474:** improve Discord notification script by using local variables and an environment variable for the webhook URL. ([075d7c9](https://github.com/ludora-app/ludora-mobile/commit/075d7c99ae341a98c743398a03de6be8d0ec9210))
* **SCRUM-480:** lift incoming session state to parent and add header title loading skeleton ([#31](https://github.com/ludora-app/ludora-mobile/issues/31)) ([a84b149](https://github.com/ludora-app/ludora-mobile/commit/a84b14972784081f07fe4c38a821bf51454fd6cf))
* **SCRUM-504:** Adjust safe area handling for the profil actions form sheet for android and reorder screen definitions in root layouts. ([#35](https://github.com/ludora-app/ludora-mobile/issues/35)) ([3445399](https://github.com/ludora-app/ludora-mobile/commit/34453993e03f79ec06399e358bc1da1abf6ae6d7))
* **SCRUM-513:** Reset game mode to null when a sport is selected during session creation. ([#49](https://github.com/ludora-app/ludora-mobile/issues/49)) ([e0f929d](https://github.com/ludora-app/ludora-mobile/commit/e0f929d028f32e7e9d14966c889a7c13c82c7c3c))
* **SCRUM-514:** Correctly display friend's 'already invited' and 'already joined' statuses. ([#48](https://github.com/ludora-app/ludora-mobile/issues/48)) ([f3c7692](https://github.com/ludora-app/ludora-mobile/commit/f3c7692081fca9ce64e5140c26a11da06e976e64))
* **SCRUM-531:** update auth-b2-c import paths to auth-b2c across authentication queries. ([#56](https://github.com/ludora-app/ludora-mobile/issues/56)) ([8325edb](https://github.com/ludora-app/ludora-mobile/commit/8325edb7d625e179f64429eece21b30bf118ff28))

### Performance Improvements

* **SCRUM-506:** Memoize ProfilSection1 component to optimize rendering performance. ([#40](https://github.com/ludora-app/ludora-mobile/issues/40)) ([537ebbe](https://github.com/ludora-app/ludora-mobile/commit/537ebbe07577fdce4572c53fee7fb56ce2e190c3))

### ♻️ Code Refactoring

* **SCRUM-448:** Implement store-based state management for session creation step 3, update team name validation, and enhance session detail analytics. ([e17b614](https://github.com/ludora-app/ludora-mobile/commit/e17b614dbaf849aac97915ffba763a5af6555469))

## [1.1.0-next.1](https://github.com/ludora-app/ludora-mobile/compare/v1.0.3-next.4...v1.1.0-next.1) (2026-03-14)

### ✨ Features

* **SCRUM-455:** Implement a new Accordion component and integrate it into a new FAQ settings screen. ([#51](https://github.com/ludora-app/ludora-mobile/issues/51)) ([d891237](https://github.com/ludora-app/ludora-mobile/commit/d891237e87faa42e839e447231abcf6e78dac796))
* **SCRUM-456:** Add a contact support screen to settings with form validation and CRM integration, including input component enhancements. ([#50](https://github.com/ludora-app/ludora-mobile/issues/50)) ([0d9d1dd](https://github.com/ludora-app/ludora-mobile/commit/0d9d1dd654e93814395eb9691d5be9dd10e8b66e))
* **SCRUM-462:** Introduce multiple Android notification channels and centralize their common configuration. ([#54](https://github.com/ludora-app/ludora-mobile/issues/54)) ([6592f81](https://github.com/ludora-app/ludora-mobile/commit/6592f8122eba1f4a3aec14619e6cd5e96014eb78))
* **SCRUM-477:** Update app branding assets, refine environment configuration, and add Google Services file generation from Vault. ([#52](https://github.com/ludora-app/ludora-mobile/issues/52)) ([e1d949a](https://github.com/ludora-app/ludora-mobile/commit/e1d949a5879c456f7d7d268b5ea2c70d387a820b))
* **SCRUM-478:** Implement loading state for user location fetching and enable accuracy configuration for location requests. ([#38](https://github.com/ludora-app/ludora-mobile/issues/38)) ([8154fac](https://github.com/ludora-app/ludora-mobile/commit/8154fac027052b197f75447f7ce0dcc260325654))
* **SCRUM-479:** introduce new Dialog component and its sub-components, integrating it for confirmation flows in chat room info. ([#32](https://github.com/ludora-app/ludora-mobile/issues/32)) ([8b3ad45](https://github.com/ludora-app/ludora-mobile/commit/8b3ad45e98a2771f38aa247e1b29160362cbea28))
* **SCRUM-485:** Implement session team switching functionality and refactor session team display into a shared component. ([#47](https://github.com/ludora-app/ludora-mobile/issues/47)) ([94ab34b](https://github.com/ludora-app/ludora-mobile/commit/94ab34b5c4f9c3801b630cf523d03c274f5f56da))
* **SCRUM-486:** Cap displayed unread notification count at 99 and use a ROUTES constant for navigation. ([#45](https://github.com/ludora-app/ludora-mobile/issues/45)) ([fadcd02](https://github.com/ludora-app/ludora-mobile/commit/fadcd027f3c4a70e125ddc01a72d97ceca00c34e))
* **SCRUM-487:** Add profile navigation to friend request notifications and ensure friend list invalidation upon acceptance. ([#44](https://github.com/ludora-app/ludora-mobile/issues/44)) ([595fa72](https://github.com/ludora-app/ludora-mobile/commit/595fa726cb79bb56783f264c2349762ee715a592))
* **SCRUM-488:** Implement warning toast for leaving started sessions and update warning toast background color. ([#46](https://github.com/ludora-app/ludora-mobile/issues/46)) ([5559cb1](https://github.com/ludora-app/ludora-mobile/commit/5559cb152d60a6a849532d60dff206f7d3004101))
* **SCRUM-489:** Implement user blocking functionality, a profile actions formsheet, and a blocked users management screen in settings. ([#33](https://github.com/ludora-app/ludora-mobile/issues/33)) ([80de4ed](https://github.com/ludora-app/ludora-mobile/commit/80de4ed5106f67e0d40621b1e82dbf3511208781))
* **SCRUM-490:** add user reporting functionality including UI for reasons, confirmation, and API integration. ([#34](https://github.com/ludora-app/ludora-mobile/issues/34)) ([145e5e9](https://github.com/ludora-app/ludora-mobile/commit/145e5e955120f30ffc796134bd3b93d2dacbb4c6))
* **SCRUM-493:** Implement remove friend functionality and refine friend request handling with updated query invalidation. ([#37](https://github.com/ludora-app/ludora-mobile/issues/37)) ([dd3c7f3](https://github.com/ludora-app/ludora-mobile/commit/dd3c7f3047e2b2f401ccff96fed20a8bc5045ee3))
* **SCRUM-498:** Implement unblock user functionality in settings, including a new query, refactored list item component with a confirmation dialog, and a skeleton loader. ([#42](https://github.com/ludora-app/ludora-mobile/issues/42)) ([3c04d2a](https://github.com/ludora-app/ludora-mobile/commit/3c04d2a0dd193bb5d5b4c5daac121197773d593d))
* **SCRUM-502:** Add fordbidden-contact-regular SVG icon, update blocked users section to use it, and round settings menu item icon containers. ([#41](https://github.com/ludora-app/ludora-mobile/issues/41)) ([cfd1dca](https://github.com/ludora-app/ludora-mobile/commit/cfd1dcabb489bc94965f1291722bf635de759687))
* **SCRUM-507:** Implement reset methods for various stores and integrate them into the resetCaches utility. ([#39](https://github.com/ludora-app/ludora-mobile/issues/39)) ([dccd6f1](https://github.com/ludora-app/ludora-mobile/commit/dccd6f19c837f4f9f64b83ad33f258e6b01eb6c2))
* **SCRUM-510:** implement a dedicated Not Found screen and redirect to it for missing user or session data by handling 404 API responses. ([#43](https://github.com/ludora-app/ludora-mobile/issues/43)) ([727c87d](https://github.com/ludora-app/ludora-mobile/commit/727c87d0b63b28aadb130746709812f8c5f17d4b))
* **SCRUM-516:** Implement keyboard management and remove audio recording from chat input. ([#53](https://github.com/ludora-app/ludora-mobile/issues/53)) ([b864af6](https://github.com/ludora-app/ludora-mobile/commit/b864af6e34dd85e340b1b0257bd71398538c7f69))
* **SCRUM-532:** Introduce a dedicated staging API environment and URL configuration. ([#57](https://github.com/ludora-app/ludora-mobile/issues/57)) ([6015971](https://github.com/ludora-app/ludora-mobile/commit/60159715d9870722677aa281f6206021bd567239))
* **SCRUM-534:** update avatar ImageUrL prop to accept ImageSource and add sport placeholder images. ([#60](https://github.com/ludora-app/ludora-mobile/issues/60)) ([89e7a72](https://github.com/ludora-app/ludora-mobile/commit/89e7a72b364482fbe6ddda1e7d985e027c57ed3e))
* **SCRUM-537:** Implement auto-play and looping for the welcome carousel, initialize planning days with the selected date, and set a dark status bar style for specific screens. ([#61](https://github.com/ludora-app/ludora-mobile/issues/61)) ([3813998](https://github.com/ludora-app/ludora-mobile/commit/3813998e4326a8d1c0e0ac7b7ce38676e1c7fa28))

### Bug Fixes

* **SCRUM-306:** Trim user input strings, clean session data by removing empty values, and enable dev tools in development environments. ([9778beb](https://github.com/ludora-app/ludora-mobile/commit/9778beb7f86128f6c7c368f7b27a0cafd175dcad))
* **SCRUM-429:** Implement an optimistic message queue system for chat, including real-time updates and improved conversation list cache management. ([97cc0e1](https://github.com/ludora-app/ludora-mobile/commit/97cc0e11236911a3a2b03a30727972648029f911))
* **SCRUM-432:** use `getApiUrl` utility instead of a hardcoded local API URL for the refresh token endpoint. ([4e5cd21](https://github.com/ludora-app/ludora-mobile/commit/4e5cd21197dd3bf63c44c347ad686a4539078377))
* **SCRUM-434:** Update optimistic message createdAt timestamp and re-insert into cache if evicted during retry. ([#30](https://github.com/ludora-app/ludora-mobile/issues/30)) ([f1c50fc](https://github.com/ludora-app/ludora-mobile/commit/f1c50fce3ccfc671ca2593e5154b2e7ac13184f3))
* **SCRUM-437:** Enhance profil edit screen with dynamic icons, conditional display, and routing based on user provider. ([#16](https://github.com/ludora-app/ludora-mobile/issues/16)) ([99a0b42](https://github.com/ludora-app/ludora-mobile/commit/99a0b4288454a0faddbeaac383ec320fad0f51d6))
* **SCRUM-443:** Update navigation from `router.push` to `router.navigate` and refresh app icons. ([a65435a](https://github.com/ludora-app/ludora-mobile/commit/a65435a9bb532ba612e563ab674e71b319a4a24f))
* **SCRUM-452:** Add GET method error tracking, ignoring 404s, and disable retries for the friend request query. ([#28](https://github.com/ludora-app/ludora-mobile/issues/28)) ([948b0f4](https://github.com/ludora-app/ludora-mobile/commit/948b0f4d3a593447ad656666f377792a23da1f51))
* **SCRUM-453:** Add danger color to the logout button loader and reorder logout logic to proactively clear authentication state and caches. ([39a2633](https://github.com/ludora-app/ludora-mobile/commit/39a2633b4d4ad08031f44f369a70c0735e10acf8))
* **SCRUM-453:** Implement onBlur form validation with manual triggering and refine birthdate schema using dayjs. ([14db4cd](https://github.com/ludora-app/ludora-mobile/commit/14db4cdf075afd7a016277fdb45812dcd079443a))
* **SCRUM-468:** restructure root stack screens with new grouping comments and update animations to fix modal to screen on ios ([#29](https://github.com/ludora-app/ludora-mobile/issues/29)) ([f380e24](https://github.com/ludora-app/ludora-mobile/commit/f380e2404b68e7129ae87388e320893d4aca6aef))
* **SCRUM-470:** fix flicking items on filters  due to the dynamic height of the icon levels  by adding fixed height and width ([99c78e8](https://github.com/ludora-app/ludora-mobile/commit/99c78e86fe2c033dfc50513c8b6e0c17023088a8))
* **SCRUM-471:** fix crash on notification page due to days plugins - centralize dayjs configuration and imports into a dedicated utility file. ([71eacd8](https://github.com/ludora-app/ludora-mobile/commit/71eacd85eeae92f4b105aef3c24f503677cd78cd))
* **SCRUM-474:** improve Discord notification script by using local variables and an environment variable for the webhook URL. ([075d7c9](https://github.com/ludora-app/ludora-mobile/commit/075d7c99ae341a98c743398a03de6be8d0ec9210))
* **SCRUM-480:** lift incoming session state to parent and add header title loading skeleton ([#31](https://github.com/ludora-app/ludora-mobile/issues/31)) ([a84b149](https://github.com/ludora-app/ludora-mobile/commit/a84b14972784081f07fe4c38a821bf51454fd6cf))
* **SCRUM-504:** Adjust safe area handling for the profil actions form sheet for android and reorder screen definitions in root layouts. ([#35](https://github.com/ludora-app/ludora-mobile/issues/35)) ([3445399](https://github.com/ludora-app/ludora-mobile/commit/34453993e03f79ec06399e358bc1da1abf6ae6d7))
* **SCRUM-513:** Reset game mode to null when a sport is selected during session creation. ([#49](https://github.com/ludora-app/ludora-mobile/issues/49)) ([e0f929d](https://github.com/ludora-app/ludora-mobile/commit/e0f929d028f32e7e9d14966c889a7c13c82c7c3c))
* **SCRUM-514:** Correctly display friend's 'already invited' and 'already joined' statuses. ([#48](https://github.com/ludora-app/ludora-mobile/issues/48)) ([f3c7692](https://github.com/ludora-app/ludora-mobile/commit/f3c7692081fca9ce64e5140c26a11da06e976e64))
* **SCRUM-531:** update auth-b2-c import paths to auth-b2c across authentication queries. ([#56](https://github.com/ludora-app/ludora-mobile/issues/56)) ([8325edb](https://github.com/ludora-app/ludora-mobile/commit/8325edb7d625e179f64429eece21b30bf118ff28))

### Performance Improvements

* **SCRUM-506:** Memoize ProfilSection1 component to optimize rendering performance. ([#40](https://github.com/ludora-app/ludora-mobile/issues/40)) ([537ebbe](https://github.com/ludora-app/ludora-mobile/commit/537ebbe07577fdce4572c53fee7fb56ce2e190c3))

## [1.1.0-alpha.26](https://github.com/ludora-app/ludora-mobile/compare/v1.1.0-alpha.25...v1.1.0-alpha.26) (2026-03-14)

### ✨ Features

* **SCRUM-537:** Implement auto-play and looping for the welcome carousel, initialize planning days with the selected date, and set a dark status bar style for specific screens. ([#61](https://github.com/ludora-app/ludora-mobile/issues/61)) ([3813998](https://github.com/ludora-app/ludora-mobile/commit/3813998e4326a8d1c0e0ac7b7ce38676e1c7fa28))

## [1.1.0-alpha.25](https://github.com/ludora-app/ludora-mobile/compare/v1.1.0-alpha.24...v1.1.0-alpha.25) (2026-03-13)

### ✨ Features

* **SCRUM-534:** update avatar ImageUrL prop to accept ImageSource and add sport placeholder images. ([#60](https://github.com/ludora-app/ludora-mobile/issues/60)) ([89e7a72](https://github.com/ludora-app/ludora-mobile/commit/89e7a72b364482fbe6ddda1e7d985e027c57ed3e))

## [1.1.0-alpha.24](https://github.com/ludora-app/ludora-mobile/compare/v1.1.0-alpha.23...v1.1.0-alpha.24) (2026-03-13)

### ✨ Features

* **SCRUM-532:** Introduce a dedicated staging API environment and URL configuration. ([#57](https://github.com/ludora-app/ludora-mobile/issues/57)) ([6015971](https://github.com/ludora-app/ludora-mobile/commit/60159715d9870722677aa281f6206021bd567239))

## [1.1.0-alpha.23](https://github.com/ludora-app/ludora-mobile/compare/v1.1.0-alpha.22...v1.1.0-alpha.23) (2026-03-13)

### Bug Fixes

* **SCRUM-531:** update auth-b2-c import paths to auth-b2c across authentication queries. ([#56](https://github.com/ludora-app/ludora-mobile/issues/56)) ([8325edb](https://github.com/ludora-app/ludora-mobile/commit/8325edb7d625e179f64429eece21b30bf118ff28))

## [1.1.0-alpha.22](https://github.com/ludora-app/ludora-mobile/compare/v1.1.0-alpha.21...v1.1.0-alpha.22) (2026-03-09)

### ✨ Features

* **SCRUM-462:** Introduce multiple Android notification channels and centralize their common configuration. ([#54](https://github.com/ludora-app/ludora-mobile/issues/54)) ([6592f81](https://github.com/ludora-app/ludora-mobile/commit/6592f8122eba1f4a3aec14619e6cd5e96014eb78))

## [1.1.0-alpha.21](https://github.com/ludora-app/ludora-mobile/compare/v1.1.0-alpha.20...v1.1.0-alpha.21) (2026-03-09)

### ✨ Features

* **SCRUM-516:** Implement keyboard management and remove audio recording from chat input. ([#53](https://github.com/ludora-app/ludora-mobile/issues/53)) ([b864af6](https://github.com/ludora-app/ludora-mobile/commit/b864af6e34dd85e340b1b0257bd71398538c7f69))

## [1.1.0-alpha.20](https://github.com/ludora-app/ludora-mobile/compare/v1.1.0-alpha.19...v1.1.0-alpha.20) (2026-03-09)

### ✨ Features

* **SCRUM-477:** Update app branding assets, refine environment configuration, and add Google Services file generation from Vault. ([#52](https://github.com/ludora-app/ludora-mobile/issues/52)) ([e1d949a](https://github.com/ludora-app/ludora-mobile/commit/e1d949a5879c456f7d7d268b5ea2c70d387a820b))

## [1.1.0-alpha.19](https://github.com/ludora-app/ludora-mobile/compare/v1.1.0-alpha.18...v1.1.0-alpha.19) (2026-03-08)

### ✨ Features

* **SCRUM-455:** Implement a new Accordion component and integrate it into a new FAQ settings screen. ([#51](https://github.com/ludora-app/ludora-mobile/issues/51)) ([d891237](https://github.com/ludora-app/ludora-mobile/commit/d891237e87faa42e839e447231abcf6e78dac796))

## [1.1.0-alpha.18](https://github.com/ludora-app/ludora-mobile/compare/v1.1.0-alpha.17...v1.1.0-alpha.18) (2026-03-08)

### ✨ Features

* **SCRUM-456:** Add a contact support screen to settings with form validation and CRM integration, including input component enhancements. ([#50](https://github.com/ludora-app/ludora-mobile/issues/50)) ([0d9d1dd](https://github.com/ludora-app/ludora-mobile/commit/0d9d1dd654e93814395eb9691d5be9dd10e8b66e))

## [1.1.0-alpha.17](https://github.com/ludora-app/ludora-mobile/compare/v1.1.0-alpha.16...v1.1.0-alpha.17) (2026-03-08)

### Bug Fixes

* **SCRUM-513:** Reset game mode to null when a sport is selected during session creation. ([#49](https://github.com/ludora-app/ludora-mobile/issues/49)) ([e0f929d](https://github.com/ludora-app/ludora-mobile/commit/e0f929d028f32e7e9d14966c889a7c13c82c7c3c))

## [1.1.0-alpha.16](https://github.com/ludora-app/ludora-mobile/compare/v1.1.0-alpha.15...v1.1.0-alpha.16) (2026-03-08)

### Bug Fixes

* **SCRUM-514:** Correctly display friend's 'already invited' and 'already joined' statuses. ([#48](https://github.com/ludora-app/ludora-mobile/issues/48)) ([f3c7692](https://github.com/ludora-app/ludora-mobile/commit/f3c7692081fca9ce64e5140c26a11da06e976e64))

## [1.1.0-alpha.15](https://github.com/ludora-app/ludora-mobile/compare/v1.1.0-alpha.14...v1.1.0-alpha.15) (2026-03-08)

### ✨ Features

* **SCRUM-485:** Implement session team switching functionality and refactor session team display into a shared component. ([#47](https://github.com/ludora-app/ludora-mobile/issues/47)) ([94ab34b](https://github.com/ludora-app/ludora-mobile/commit/94ab34b5c4f9c3801b630cf523d03c274f5f56da))

## [1.1.0-alpha.14](https://github.com/ludora-app/ludora-mobile/compare/v1.1.0-alpha.13...v1.1.0-alpha.14) (2026-03-08)

### ✨ Features

* **SCRUM-488:** Implement warning toast for leaving started sessions and update warning toast background color. ([#46](https://github.com/ludora-app/ludora-mobile/issues/46)) ([5559cb1](https://github.com/ludora-app/ludora-mobile/commit/5559cb152d60a6a849532d60dff206f7d3004101))

## [1.1.0-alpha.13](https://github.com/ludora-app/ludora-mobile/compare/v1.1.0-alpha.12...v1.1.0-alpha.13) (2026-03-08)

### ✨ Features

* **SCRUM-486:** Cap displayed unread notification count at 99 and use a ROUTES constant for navigation. ([#45](https://github.com/ludora-app/ludora-mobile/issues/45)) ([fadcd02](https://github.com/ludora-app/ludora-mobile/commit/fadcd027f3c4a70e125ddc01a72d97ceca00c34e))

## [1.1.0-alpha.12](https://github.com/ludora-app/ludora-mobile/compare/v1.1.0-alpha.11...v1.1.0-alpha.12) (2026-03-08)

### ✨ Features

* **SCRUM-487:** Add profile navigation to friend request notifications and ensure friend list invalidation upon acceptance. ([#44](https://github.com/ludora-app/ludora-mobile/issues/44)) ([595fa72](https://github.com/ludora-app/ludora-mobile/commit/595fa726cb79bb56783f264c2349762ee715a592))

## [1.1.0-alpha.11](https://github.com/ludora-app/ludora-mobile/compare/v1.1.0-alpha.10...v1.1.0-alpha.11) (2026-03-08)

### ✨ Features

* **SCRUM-510:** implement a dedicated Not Found screen and redirect to it for missing user or session data by handling 404 API responses. ([#43](https://github.com/ludora-app/ludora-mobile/issues/43)) ([727c87d](https://github.com/ludora-app/ludora-mobile/commit/727c87d0b63b28aadb130746709812f8c5f17d4b))

## [1.1.0-alpha.10](https://github.com/ludora-app/ludora-mobile/compare/v1.1.0-alpha.9...v1.1.0-alpha.10) (2026-03-08)

### ✨ Features

* **SCRUM-498:** Implement unblock user functionality in settings, including a new query, refactored list item component with a confirmation dialog, and a skeleton loader. ([#42](https://github.com/ludora-app/ludora-mobile/issues/42)) ([3c04d2a](https://github.com/ludora-app/ludora-mobile/commit/3c04d2a0dd193bb5d5b4c5daac121197773d593d))

## [1.1.0-alpha.9](https://github.com/ludora-app/ludora-mobile/compare/v1.1.0-alpha.8...v1.1.0-alpha.9) (2026-03-08)

### ✨ Features

* **SCRUM-502:** Add fordbidden-contact-regular SVG icon, update blocked users section to use it, and round settings menu item icon containers. ([#41](https://github.com/ludora-app/ludora-mobile/issues/41)) ([cfd1dca](https://github.com/ludora-app/ludora-mobile/commit/cfd1dcabb489bc94965f1291722bf635de759687))

## [1.1.0-alpha.8](https://github.com/ludora-app/ludora-mobile/compare/v1.1.0-alpha.7...v1.1.0-alpha.8) (2026-03-07)

### Performance Improvements

* **SCRUM-506:** Memoize ProfilSection1 component to optimize rendering performance. ([#40](https://github.com/ludora-app/ludora-mobile/issues/40)) ([537ebbe](https://github.com/ludora-app/ludora-mobile/commit/537ebbe07577fdce4572c53fee7fb56ce2e190c3))

## [1.1.0-alpha.7](https://github.com/ludora-app/ludora-mobile/compare/v1.1.0-alpha.6...v1.1.0-alpha.7) (2026-03-07)

### ✨ Features

* **SCRUM-507:** Implement reset methods for various stores and integrate them into the resetCaches utility. ([#39](https://github.com/ludora-app/ludora-mobile/issues/39)) ([dccd6f1](https://github.com/ludora-app/ludora-mobile/commit/dccd6f19c837f4f9f64b83ad33f258e6b01eb6c2))

## [1.1.0-alpha.6](https://github.com/ludora-app/ludora-mobile/compare/v1.1.0-alpha.5...v1.1.0-alpha.6) (2026-03-07)

### ✨ Features

* **SCRUM-478:** Implement loading state for user location fetching and enable accuracy configuration for location requests. ([#38](https://github.com/ludora-app/ludora-mobile/issues/38)) ([8154fac](https://github.com/ludora-app/ludora-mobile/commit/8154fac027052b197f75447f7ce0dcc260325654))

## [1.1.0-alpha.5](https://github.com/ludora-app/ludora-mobile/compare/v1.1.0-alpha.4...v1.1.0-alpha.5) (2026-03-07)

### ✨ Features

* **SCRUM-493:** Implement remove friend functionality and refine friend request handling with updated query invalidation. ([#37](https://github.com/ludora-app/ludora-mobile/issues/37)) ([dd3c7f3](https://github.com/ludora-app/ludora-mobile/commit/dd3c7f3047e2b2f401ccff96fed20a8bc5045ee3))

## [1.1.0-alpha.4](https://github.com/ludora-app/ludora-mobile/compare/v1.1.0-alpha.3...v1.1.0-alpha.4) (2026-03-07)

### Bug Fixes

* **SCRUM-504:** Adjust safe area handling for the profil actions form sheet for android and reorder screen definitions in root layouts. ([#35](https://github.com/ludora-app/ludora-mobile/issues/35)) ([3445399](https://github.com/ludora-app/ludora-mobile/commit/34453993e03f79ec06399e358bc1da1abf6ae6d7))

## [1.1.0-alpha.3](https://github.com/ludora-app/ludora-mobile/compare/v1.1.0-alpha.2...v1.1.0-alpha.3) (2026-03-07)

### ✨ Features

* **SCRUM-490:** add user reporting functionality including UI for reasons, confirmation, and API integration. ([#34](https://github.com/ludora-app/ludora-mobile/issues/34)) ([145e5e9](https://github.com/ludora-app/ludora-mobile/commit/145e5e955120f30ffc796134bd3b93d2dacbb4c6))

## [1.1.0-alpha.2](https://github.com/ludora-app/ludora-mobile/compare/v1.1.0-alpha.1...v1.1.0-alpha.2) (2026-03-07)

### ✨ Features

* **SCRUM-489:** Implement user blocking functionality, a profile actions formsheet, and a blocked users management screen in settings. ([#33](https://github.com/ludora-app/ludora-mobile/issues/33)) ([80de4ed](https://github.com/ludora-app/ludora-mobile/commit/80de4ed5106f67e0d40621b1e82dbf3511208781))

## [1.1.0-alpha.1](https://github.com/ludora-app/ludora-mobile/compare/v1.0.3-alpha.11...v1.1.0-alpha.1) (2026-03-05)

### ✨ Features

* **SCRUM-479:** introduce new Dialog component and its sub-components, integrating it for confirmation flows in chat room info. ([#32](https://github.com/ludora-app/ludora-mobile/issues/32)) ([8b3ad45](https://github.com/ludora-app/ludora-mobile/commit/8b3ad45e98a2771f38aa247e1b29160362cbea28))

## [1.0.3-alpha.11](https://github.com/ludora-app/ludora-mobile/compare/v1.0.3-alpha.10...v1.0.3-alpha.11) (2026-03-05)

### Bug Fixes

* **SCRUM-480:** lift incoming session state to parent and add header title loading skeleton ([#31](https://github.com/ludora-app/ludora-mobile/issues/31)) ([a84b149](https://github.com/ludora-app/ludora-mobile/commit/a84b14972784081f07fe4c38a821bf51454fd6cf))

## [1.0.3-alpha.10](https://github.com/ludora-app/ludora-mobile/compare/v1.0.3-alpha.9...v1.0.3-alpha.10) (2026-03-05)

### Bug Fixes

* **SCRUM-434:** Update optimistic message createdAt timestamp and re-insert into cache if evicted during retry. ([#30](https://github.com/ludora-app/ludora-mobile/issues/30)) ([f1c50fc](https://github.com/ludora-app/ludora-mobile/commit/f1c50fce3ccfc671ca2593e5154b2e7ac13184f3))

## [1.0.3-alpha.9](https://github.com/ludora-app/ludora-mobile/compare/v1.0.3-alpha.8...v1.0.3-alpha.9) (2026-03-05)

### Bug Fixes

* **SCRUM-468:** restructure root stack screens with new grouping comments and update animations to fix modal to screen on ios ([#29](https://github.com/ludora-app/ludora-mobile/issues/29)) ([f380e24](https://github.com/ludora-app/ludora-mobile/commit/f380e2404b68e7129ae87388e320893d4aca6aef))

## [1.0.3-alpha.8](https://github.com/ludora-app/ludora-mobile/compare/v1.0.3-alpha.7...v1.0.3-alpha.8) (2026-03-05)

### Bug Fixes

* **SCRUM-306:** Trim user input strings, clean session data by removing empty values, and enable dev tools in development environments. ([9778beb](https://github.com/ludora-app/ludora-mobile/commit/9778beb7f86128f6c7c368f7b27a0cafd175dcad))
* **SCRUM-429:** Implement an optimistic message queue system for chat, including real-time updates and improved conversation list cache management. ([97cc0e1](https://github.com/ludora-app/ludora-mobile/commit/97cc0e11236911a3a2b03a30727972648029f911))
* **SCRUM-437:** Enhance profil edit screen with dynamic icons, conditional display, and routing based on user provider. ([#16](https://github.com/ludora-app/ludora-mobile/issues/16)) ([99a0b42](https://github.com/ludora-app/ludora-mobile/commit/99a0b4288454a0faddbeaac383ec320fad0f51d6))
* **SCRUM-443:** Update navigation from `router.push` to `router.navigate` and refresh app icons. ([a65435a](https://github.com/ludora-app/ludora-mobile/commit/a65435a9bb532ba612e563ab674e71b319a4a24f))
* **SCRUM-452:** Add GET method error tracking, ignoring 404s, and disable retries for the friend request query. ([#28](https://github.com/ludora-app/ludora-mobile/issues/28)) ([948b0f4](https://github.com/ludora-app/ludora-mobile/commit/948b0f4d3a593447ad656666f377792a23da1f51))
* **SCRUM-453:** Add danger color to the logout button loader and reorder logout logic to proactively clear authentication state and caches. ([39a2633](https://github.com/ludora-app/ludora-mobile/commit/39a2633b4d4ad08031f44f369a70c0735e10acf8))
* **SCRUM-453:** Implement onBlur form validation with manual triggering and refine birthdate schema using dayjs. ([14db4cd](https://github.com/ludora-app/ludora-mobile/commit/14db4cdf075afd7a016277fdb45812dcd079443a))
* **SCRUM-470:** fix flicking items on filters  due to the dynamic height of the icon levels  by adding fixed height and width ([99c78e8](https://github.com/ludora-app/ludora-mobile/commit/99c78e86fe2c033dfc50513c8b6e0c17023088a8))
* **SCRUM-471:** fix crash on notification page due to days plugins - centralize dayjs configuration and imports into a dedicated utility file. ([71eacd8](https://github.com/ludora-app/ludora-mobile/commit/71eacd85eeae92f4b105aef3c24f503677cd78cd))
* **SCRUM-474:** improve Discord notification script by using local variables and an environment variable for the webhook URL. ([075d7c9](https://github.com/ludora-app/ludora-mobile/commit/075d7c99ae341a98c743398a03de6be8d0ec9210))

## [1.0.3-alpha.8](https://github.com/ludora-app/ludora-mobile/compare/v1.0.3-alpha.7...v1.0.3-alpha.8) (2026-03-05)

### Bug Fixes

* **SCRUM-306:** Trim user input strings, clean session data by removing empty values, and enable dev tools in development environments. ([9778beb](https://github.com/ludora-app/ludora-mobile/commit/9778beb7f86128f6c7c368f7b27a0cafd175dcad))
* **SCRUM-429:** Implement an optimistic message queue system for chat, including real-time updates and improved conversation list cache management. ([97cc0e1](https://github.com/ludora-app/ludora-mobile/commit/97cc0e11236911a3a2b03a30727972648029f911))
* **SCRUM-437:** Enhance profil edit screen with dynamic icons, conditional display, and routing based on user provider. ([#16](https://github.com/ludora-app/ludora-mobile/issues/16)) ([99a0b42](https://github.com/ludora-app/ludora-mobile/commit/99a0b4288454a0faddbeaac383ec320fad0f51d6))
* **SCRUM-443:** Update navigation from `router.push` to `router.navigate` and refresh app icons. ([a65435a](https://github.com/ludora-app/ludora-mobile/commit/a65435a9bb532ba612e563ab674e71b319a4a24f))
* **SCRUM-453:** Add danger color to the logout button loader and reorder logout logic to proactively clear authentication state and caches. ([39a2633](https://github.com/ludora-app/ludora-mobile/commit/39a2633b4d4ad08031f44f369a70c0735e10acf8))
* **SCRUM-453:** Implement onBlur form validation with manual triggering and refine birthdate schema using dayjs. ([14db4cd](https://github.com/ludora-app/ludora-mobile/commit/14db4cdf075afd7a016277fdb45812dcd079443a))
* **SCRUM-470:** fix flicking items on filters  due to the dynamic height of the icon levels  by adding fixed height and width ([99c78e8](https://github.com/ludora-app/ludora-mobile/commit/99c78e86fe2c033dfc50513c8b6e0c17023088a8))
* **SCRUM-471:** fix crash on notification page due to days plugins - centralize dayjs configuration and imports into a dedicated utility file. ([71eacd8](https://github.com/ludora-app/ludora-mobile/commit/71eacd85eeae92f4b105aef3c24f503677cd78cd))
* **SCRUM-474:** improve Discord notification script by using local variables and an environment variable for the webhook URL. ([075d7c9](https://github.com/ludora-app/ludora-mobile/commit/075d7c99ae341a98c743398a03de6be8d0ec9210))

## [1.0.3-alpha.8](https://github.com/ludora-app/ludora-mobile/compare/v1.0.3-alpha.7...v1.0.3-alpha.8) (2026-03-05)

### Bug Fixes

* **SCRUM-306:** Trim user input strings, clean session data by removing empty values, and enable dev tools in development environments. ([9778beb](https://github.com/ludora-app/ludora-mobile/commit/9778beb7f86128f6c7c368f7b27a0cafd175dcad))
* **SCRUM-429:** Implement an optimistic message queue system for chat, including real-time updates and improved conversation list cache management. ([97cc0e1](https://github.com/ludora-app/ludora-mobile/commit/97cc0e11236911a3a2b03a30727972648029f911))
* **SCRUM-443:** Update navigation from `router.push` to `router.navigate` and refresh app icons. ([a65435a](https://github.com/ludora-app/ludora-mobile/commit/a65435a9bb532ba612e563ab674e71b319a4a24f))
* **SCRUM-453:** Add danger color to the logout button loader and reorder logout logic to proactively clear authentication state and caches. ([39a2633](https://github.com/ludora-app/ludora-mobile/commit/39a2633b4d4ad08031f44f369a70c0735e10acf8))
* **SCRUM-453:** Implement onBlur form validation with manual triggering and refine birthdate schema using dayjs. ([14db4cd](https://github.com/ludora-app/ludora-mobile/commit/14db4cdf075afd7a016277fdb45812dcd079443a))
* **SCRUM-470:** fix flicking items on filters  due to the dynamic height of the icon levels  by adding fixed height and width ([99c78e8](https://github.com/ludora-app/ludora-mobile/commit/99c78e86fe2c033dfc50513c8b6e0c17023088a8))
* **SCRUM-471:** fix crash on notification page due to days plugins - centralize dayjs configuration and imports into a dedicated utility file. ([71eacd8](https://github.com/ludora-app/ludora-mobile/commit/71eacd85eeae92f4b105aef3c24f503677cd78cd))
* **SCRUM-474:** improve Discord notification script by using local variables and an environment variable for the webhook URL. ([075d7c9](https://github.com/ludora-app/ludora-mobile/commit/075d7c99ae341a98c743398a03de6be8d0ec9210))

## [1.0.3-alpha.8](https://github.com/ludora-app/ludora-mobile/compare/v1.0.3-alpha.7...v1.0.3-alpha.8) (2026-03-02)

### Bug Fixes

* **SCRUM-306:** Trim user input strings, clean session data by removing empty values, and enable dev tools in development environments. ([9778beb](https://github.com/ludora-app/ludora-mobile/commit/9778beb7f86128f6c7c368f7b27a0cafd175dcad))
* **SCRUM-429:** Implement an optimistic message queue system for chat, including real-time updates and improved conversation list cache management. ([97cc0e1](https://github.com/ludora-app/ludora-mobile/commit/97cc0e11236911a3a2b03a30727972648029f911))
* **SCRUM-470:** fix flicking items on filters  due to the dynamic height of the icon levels  by adding fixed height and width ([99c78e8](https://github.com/ludora-app/ludora-mobile/commit/99c78e86fe2c033dfc50513c8b6e0c17023088a8))
* **SCRUM-471:** fix crash on notification page due to days plugins - centralize dayjs configuration and imports into a dedicated utility file. ([71eacd8](https://github.com/ludora-app/ludora-mobile/commit/71eacd85eeae92f4b105aef3c24f503677cd78cd))
* **SCRUM-474:** improve Discord notification script by using local variables and an environment variable for the webhook URL. ([075d7c9](https://github.com/ludora-app/ludora-mobile/commit/075d7c99ae341a98c743398a03de6be8d0ec9210))

## [1.0.3-alpha.8](https://github.com/ludora-app/ludora-mobile/compare/v1.0.3-alpha.7...v1.0.3-alpha.8) (2026-03-02)

### Bug Fixes

* **SCRUM-306:** Trim user input strings, clean session data by removing empty values, and enable dev tools in development environments. ([9778beb](https://github.com/ludora-app/ludora-mobile/commit/9778beb7f86128f6c7c368f7b27a0cafd175dcad))
* **SCRUM-429:** Implement an optimistic message queue system for chat, including real-time updates and improved conversation list cache management. ([97cc0e1](https://github.com/ludora-app/ludora-mobile/commit/97cc0e11236911a3a2b03a30727972648029f911))
* **SCRUM-470:** fix flicking items on filters  due to the dynamic height of the icon levels  by adding fixed height and width ([99c78e8](https://github.com/ludora-app/ludora-mobile/commit/99c78e86fe2c033dfc50513c8b6e0c17023088a8))
* **SCRUM-474:** improve Discord notification script by using local variables and an environment variable for the webhook URL. ([075d7c9](https://github.com/ludora-app/ludora-mobile/commit/075d7c99ae341a98c743398a03de6be8d0ec9210))

## [1.0.3-alpha.8](https://github.com/ludora-app/ludora-mobile/compare/v1.0.3-alpha.7...v1.0.3-alpha.8) (2026-03-02)

### Bug Fixes

* **SCRUM-306:** Trim user input strings, clean session data by removing empty values, and enable dev tools in development environments. ([9778beb](https://github.com/ludora-app/ludora-mobile/commit/9778beb7f86128f6c7c368f7b27a0cafd175dcad))
* **SCRUM-429:** Implement an optimistic message queue system for chat, including real-time updates and improved conversation list cache management. ([97cc0e1](https://github.com/ludora-app/ludora-mobile/commit/97cc0e11236911a3a2b03a30727972648029f911))
* **SCRUM-474:** improve Discord notification script by using local variables and an environment variable for the webhook URL. ([075d7c9](https://github.com/ludora-app/ludora-mobile/commit/075d7c99ae341a98c743398a03de6be8d0ec9210))

## [1.0.3-alpha.8](https://github.com/ludora-app/ludora-mobile/compare/v1.0.3-alpha.7...v1.0.3-alpha.8) (2026-03-02)

### Bug Fixes

* **SCRUM-306:** Trim user input strings, clean session data by removing empty values, and enable dev tools in development environments. ([9778beb](https://github.com/ludora-app/ludora-mobile/commit/9778beb7f86128f6c7c368f7b27a0cafd175dcad))
* **SCRUM-429:** Implement an optimistic message queue system for chat, including real-time updates and improved conversation list cache management. ([97cc0e1](https://github.com/ludora-app/ludora-mobile/commit/97cc0e11236911a3a2b03a30727972648029f911))
* **SCRUM-474:** improve Discord notification script by using local variables and an environment variable for the webhook URL. ([075d7c9](https://github.com/ludora-app/ludora-mobile/commit/075d7c99ae341a98c743398a03de6be8d0ec9210))

## [1.0.3-alpha.8](https://github.com/ludora-app/ludora-mobile/compare/v1.0.3-alpha.7...v1.0.3-alpha.8) (2026-03-02)

### Bug Fixes

* **SCRUM-306:** Trim user input strings, clean session data by removing empty values, and enable dev tools in development environments. ([9778beb](https://github.com/ludora-app/ludora-mobile/commit/9778beb7f86128f6c7c368f7b27a0cafd175dcad))
* **SCRUM-429:** Implement an optimistic message queue system for chat, including real-time updates and improved conversation list cache management. ([97cc0e1](https://github.com/ludora-app/ludora-mobile/commit/97cc0e11236911a3a2b03a30727972648029f911))

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
