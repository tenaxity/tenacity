# Tenacity — Design System Principles

This is Ritik's personal sandbox design system. Industrial-modernist + judicial gravitas. Bloomberg Terminal in a law firm. Carbon-leaning but never a copy of any one framework.

This file is the source of truth for what tenacity *is* and *isn't*. Read it before suggesting changes.

---

## Identity

- **Aesthetic**: industrial-modernist, judicial gravitas, restrained, weighted
- **References for inspiration (never copy)**: IBM Carbon, Linear, Vercel, Bloomberg Terminal, Notion. Avoid Material, Apple consumer-soft, Untitled UI's pastel-pill genre
- **What it serves**: legal/document/B2B enterprise software. Trust signals via gravity, not warmth

---

## Hard rules — things that are NOT allowed

These are non-negotiable. Reject any change that violates these.

### 1. No soft color hue inside fillable/interactive surfaces

Inputs, buttons in their resting state, cards, tables, drawer bodies — these surfaces stay clean (white in light mode, navy in dark mode). They DO NOT get tinted with a soft primary/success/danger/warning hue, even at 1–5% opacity.

**Rationale**: Tinted backgrounds read as candy/pastel/Untitled-UI-coded. They violate filled-gravity philosophy. This is the single most consistent pattern that makes enterprise software feel "meh."

**Exception**: Neutral gray backgrounds (`bg-muted`) are allowed for:
- Disabled state surfaces
- Hover states on tertiary/ghost interactions
- Code blocks
- Sidebar groove for active items (gray, not tinted-color)

**What this kills**:
- ❌ Input focus state with tinted background ("the field lights up with primary tint")
- ❌ Card hover with primary tint
- ❌ Selected table row tinted with primary
- ❌ Banner backgrounds at low-opacity primary

**What's allowed**:
- ✅ Solid filled badges (full saturation, white text on top)
- ✅ Soft badges (intentional ambient signal, opted-into via `variant="soft"`)
- ✅ Gray hover backgrounds on rows
- ✅ Gray-muted disabled fields

**Disabled state pattern (system-wide)**:

All disabled interactive elements (inputs, buttons, OTPs, tag inputs, etc.) use the same treatment:
- `bg-muted` (slate-100ish gray fill)
- `text-muted-foreground` (slate-500ish gray text)
- `border-border` (no color emphasis from variant)
- `cursor-not-allowed`
- NO opacity tricks (`opacity: 0.5` makes content fade into background — violates readability)
- Variant identity (Primary / Destructive / Success) DISAPPEARS when disabled — this is correct. Disabled means "I can't do anything," that meaning is uniform regardless of what the button *would* do if enabled.

### 2. Filled gravity over pastel calm — solid is the default

When a component has variants, the *default* must be the committed/filled version, not the soft/tinted version. Designers must opt-in to softness, never opt-out of commitment.

### 3. No glow rings on focus

Box-shadow rings (e.g. `shadow: 0 0 0 3px rgba(primary, 0.35)`) read as soft cushion. Carbon-leaning systems use solid border changes or position-based accents instead. Focus state must be communicated via stroke (color/thickness) or position (left bar, etc), not glow.

### 4. Sharp edges by default

Border radius scale tops out at 8px. Most surfaces sit at 2–4px. No `rounded-full` (pill) elements except where the shape itself is meaningful (avatars). Badges are subtle-rounded (2px), not pills. Sharp is the industrial-modernist signature.

### 5. Functional colors stay in their constraint band

Danger and Warning colors must remain visibly readable as alerts. They cannot be pushed into deep gravitas territory at the cost of their semantic function. Primary and Success can go dark; Warning/Danger must stay in their visibility band.

### 6. Don't copy — take inspiration

Every design choice should feel like *tenacity*, not "tenacity is the [Carbon/Stripe/Linear] clone." When in doubt, combine inspiration from two sources rather than commit to one.

### 7. Defaults are the most powerful design decision

Most components ship without explicit prop overrides. Whoever sets the default sets the entire system's vibe. Defaults must reflect filled-gravity, sharp, committed values.

### 11. All sizing values are even-numbered pixels

No odd-numbered px values anywhere in the system. Font sizes, radii, padding adjustments, focus bar widths — everything resolves to an even pixel count.

**Why**: Odd-pixel values render inconsistently across pixel densities (a 1px rendered on 1.5x DPI becomes a sub-pixel hairline; an 11px text size at 100% zoom becomes 11.5 at 105% zoom which browsers round arbitrarily). Even values resolve cleanly. Beyond rendering, an even-only system is also visually calm — there's no half-step weirdness in the spacing rhythm.

**The scale**:
- Font sizes: 12, 14, 16, 18, 20, 24, 30, 36 px (smallest is 12px — anything smaller hurts readability)
- Border radii: 0, 2, 4, 6, 8 px
- Spacing: Tailwind defaults (4px grid — already all-even by definition)
- Focus indicators: 4px primary bar (inset shadow), 2px outline ring (button focus)

**Aliases for safety**: `text-sm` is aliased to 12px (same as `text-xs`) so existing code using Tailwind's standard naming doesn't break. New code should prefer `text-xs`, `text-base`, `text-md` directly.

**Exception**: `1px` borders are still permitted because `border` (no qualifier) renders as 1px in Tailwind by default. Borders are *strokes*, not *fills* — they render at sub-pixel offsets predictably.

### 10. Foreground hierarchy — three grays, three roles

The system has three foreground tokens. Each has a specific job. Mixing them up causes the "everything looks washed out" effect.

| Token | Lightness | Use for |
|---|---|---|
| `text-foreground` | ~11% L (near-black) | Headings (h1, h2, h3), primary content, labels for active form fields |
| `text-subtle-foreground` | ~25% L (slate-700) | Descriptions, section labels, secondary content, body copy that's not the headline. **All passes WCAG AA** |
| `text-muted-foreground` | ~40% L (slate-600) | True meta — timestamps, helper text below inputs, footnotes, disabled-state labels, decorative captions, icon placeholders inside inputs |

**Rule of thumb**: if a user reads it as *information*, use `subtle-foreground` or above. If they *glance* at it as *context that's already understood*, use `muted-foreground`. When in doubt, go darker — failed-AA contrast is worse than slightly bolder text.

**Common mistake to avoid**: using `muted-foreground` for descriptions, section labels, or any actual content. The token is named "muted" because it's *low-attention*, but it's not meant for things people are supposed to read.

**Weight pairs with color**:
- Section labels (uppercase, tracking-wider) get `font-semibold` (600) — the weight matches their structural role as headers for groups
- Body content uses `font-normal` (400) — no extra weight needed when reading at length
- Emphasis uses `font-medium` (500), strong emphasis uses `font-semibold` (600)
- **Mono / numeric data in tables** (IDs, timestamps, codes, IRNs) gets `font-medium` (500) by default. At small sizes (12px) regular weight (400) reads thin and hard to scan in dense rows. The medium weight gives enough visual presence to anchor a column without competing with the row's primary content.

### 9. Visual languages within the system must not collide

Two components shouldn't share rendering vocabulary (shape + size + color + fill) so closely that the user can't tell which is interactive and which is metadata. When designing a new component or a new size of an existing one, check whether the visual lands in another component's territory.

**Canonical case**: Buttons and Badges both use filled rectangles with text. The collision is specifically between **filled-primary small buttons** and **filled-primary badges** — same fill, same text color, ambiguous which is clickable. Differentiators that prevent the collision:

1. **Typography case** — Badges are ALL CAPS + letter-spaced + bold. Buttons are mixed-case + medium weight. This single difference is the strongest signal even at identical size.
2. **Fill / variant** — A secondary button (outlined, light bg, foreground text) does NOT collide with a solid primary badge regardless of size. Different fill = different language.
3. **Size** — Helps but isn't load-bearing alone.

**Practical rule**:
- XS buttons (`h-7` / 28px) are fine for **secondary**, **ghost**, **destructive-outline** variants in action-bar contexts (e.g. card footers with multiple small actions: Sign / Reject / Copy URL).
- XS buttons in **primary filled** variant are forbidden — that's where the badge collision lives.
- Badges remain ALL CAPS regardless of context. That's non-negotiable.

**Don't shrink buttons — reach for links instead**:

When tempted to add an XS button (e.g. "Details" in a card footer, "View" inline in a table row), check whether the action is *actually an action*:
- **Button** = "take this action" (Save, Delete, Approve)
- **Link button** (`variant="link"` or `variant="link-secondary"`) = "see more / go to / reveal" (Details, Open, Learn more, View)

The "Details" pattern is navigation/reveal, not commitment. Use `<Button variant="link-secondary">Details</Button>` — no border, no padding competing with surrounding card chrome, hover-underline. This preserves the size gap with badges (no XS button needed) while giving the right vocabulary for low-emphasis secondary actions.

**Other examples to watch**:
- Avatar circles vs decorative dots — keep size gap clear
- Cards vs filled containers — distinguish via shadow, padding density, or border treatment
- Tooltip vs Popover — tooltip is text-only and small; popover hosts richer content

**Typographic differentiation (badges vs buttons specifically)**:

Size alone isn't enough when both components share fill, color, and shape. Badges and buttons are differentiated by typography:
- **Badges**: `text-2xs (11px) font-semibold uppercase tracking-wider` — ALL CAPS, small, spaced. Reads as a label/tag.
- **Buttons**: `text-xs / text-sm font-medium` mixed-case — reads as readable language.

The ALL CAPS typographic voice is *non-negotiable* for badges. It's what tells the eye "this is metadata, not an action," even when both are filled primary.

This rule prevents creeping visual entropy as the system grows.

### 8. Once a foundational decision is locked, alternatives are removed from the codebase

When iterating, multiple variants of a component (e.g. four focus styles, three radius modes) may exist temporarily so we can A/B compare. **Once the decision is made, the rejected alternatives are deleted from the source.** Do not leave them in as `variant` props or `__deprecated` exports.

**Rationale**: Keeping alternative implementations invites future drift. A developer 6 months later, unaware of the prior decision, might reach for the rejected option and re-introduce the wrong vibe. The codebase should reflect the *current spec*, not the *exploration history*.

**What this means in practice**:
- After choosing `bar-bold` focus for inputs → the `color`, `thicken`, `bar` variants are deleted, the prop is removed, the component does *one thing*
- After choosing `2px` radius → the `0px` and `4px` modes can stay in the runtime picker (they're a *tool*, not a system option), but the locked default is encoded in CSS as the truth
- Exploration scaffolding (header pickers for color/font/radius) stays as long as it serves iteration. When iteration is done, those get removed too.

**Exception**: Variants that encode meaningful intent at the *system level* (e.g. Badge `solid | soft | outline` because each maps to "active vs ambient vs categorical") stay because they serve different use cases. Variants that exist only as alternatives to the same use case must be deleted once one is chosen.

---

## Locked tokens (current spec)

| Token | Value | Reasoning |
|---|---|---|
| Sans typeface | Geist | Sharp, technical, Vercel-coded modern |
| Mono typeface | JetBrains Mono | Standard for code/IDs |
| Body size | 14px | Dense-but-readable enterprise default |
| Primary | Regal `#54339D` (HSL 256° 51% 41%) | Dark purple, judicial gravitas |
| Success | Forest (HSL 145° 50% 28%) | Settled, botanical, weighted |
| Warning | Burnt amber (HSL 30° 80% 44%) | Warm, readable, not fluorescent |
| Danger | Cardinal red (HSL 358° 65% 48%) | Urgent but weighted, not fire-engine |
| Radius | 2px (1/2/2/4 scale) | Pixel-soft industrial |
| Badge default variant | `solid` | Committed by default |
| Focus ring | `bar-bold` (3px primary left bar via inset shadow + border becomes primary) | Hybrid location + color signal |

---

## System patterns (system enforces, designer cannot override)

### `DocumentStatus`

Status values map to fixed (tone, variant, icon) tuples. No prop overrides allowed.

| Status | Tone | Variant | Reasoning |
|---|---|---|---|
| draft | neutral | soft | Pre-action, quiet |
| sent | primary | solid | Active, in-motion |
| in-progress | warning | solid | Awaiting |
| completed | success | soft | Settled, terminal positive |
| rejected | danger | solid | Terminal negative, urgent |
| expired | neutral | soft | Dead, archive zone |
| failed | danger | solid | Error, urgent |

The pattern of: *active states are solid, terminal states are soft* is the organizing logic. New domain patterns should follow this same logic.

---

## Workflow

- The dev server runs at `http://localhost:5173` via `npm run dev`
- The page is a Storybook-style left-nav layout. Each component has a story in `src/stories/`.
- Live token controls (color, font, radius) live in the sticky header for runtime A/B
- When committing to a token decision, lock it in `index.css` :root (the picker stays as a tool but the spec is the CSS default)
