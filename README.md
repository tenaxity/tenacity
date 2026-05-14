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

## Local Consumption

In a consuming app:

```json
{
  "dependencies": {
    "@tenacity/ui": "file:../tenacity"
  }
}
```

Import components and styles:

```tsx
import '@tenacity/ui/styles.css'
import { Badge, Button, Card, Input, Table } from '@tenacity/ui'
```

## Tailwind Preset

Apps that want to compose with Tenacity utility tokens can use the preset:

```js
import tenacityPreset from '@tenacity/ui/tailwind-preset'

export default {
  presets: [tenacityPreset],
  content: [
    './src/**/*.{ts,tsx,js,jsx}',
    './node_modules/@tenacity/ui/dist-lib/**/*.js',
  ],
}
```

The compiled stylesheet is still the default consumption path for simple apps.

## Design Rules

See `CLAUDE.md` for the source-of-truth design principles.
