# Tenacity UI

Industrial-modernist React design system for legal/document/B2B enterprise software.

## Development

```bash
npm run dev
```

The demo app runs through Vite and uses the story-style navigation in `src/App.tsx`.

## Build

Build the demo app and reusable package output:

```bash
npm run build
```

Build only the reusable package output:

```bash
npm run build:lib
```

Library artifacts are written to `dist-lib/`:

- `index.mjs`
- `index.cjs`
- `types/index.d.ts`
- `style.css`

## Installation

In a consuming app:

```bash
npm install @ten4city/ui
```

Import components and styles:

```tsx
import '@ten4city/ui/styles.css'
import { Badge, Button, Card, Input, Table } from '@ten4city/ui'
```

## Tailwind Preset

Apps that want to compose with Tenacity utility tokens can use the preset:

```js
import tenacityPreset from '@ten4city/ui/tailwind-preset'

export default {
  presets: [tenacityPreset],
  content: [
    './src/**/*.{ts,tsx,js,jsx}',
    './node_modules/@ten4city/ui/dist-lib/**/*.js',
  ],
}
```

The compiled stylesheet is still the default consumption path for simple apps.

## Design Rules

See `CLAUDE.md` for the source-of-truth design principles.
