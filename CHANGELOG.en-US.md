## Changelog

### 0.3.0

_2024-10-11_

#### Breaking changes

- Refactor project to support `English` and `Chinese` languages
- `useReset` adds different processing logic for basic data types and reference data types

#### New feature
- Add `@intlify/vue-i18n-loader` to support internationalization of `vue-i18n`
- Breadcrumbs are now dynamically displayed and will be automatically hidden when the screen width is less than `768px`
- Added `useEventBus` event bus based on `mitt` for communication between components
- [ AppDropdown ] Added default slot for customizing drop-down content
- Added `setDocumentTitle` method for setting document title

#### Bug fixes

- Fix [ AppSelectIcon ] style disorder problem
- Fixed the problem of personal data not being cleared when logging out

### 0.2.0

_2024-10-01_

#### Breaking changes

- Remove the [ app-wrapper ] switch to CSS
- Update dependencies used by the project

#### New feature

- Support vue-i18n

#### Bug fixes

- Fix `LayHeader` component type error issue
- Fix typos and component paths

#### Refactors

- Reconstructing `LayHeader` component
- Reconstructing `LayMenu` component
- Reconstructing `i18n` Related code
