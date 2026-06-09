# Tenacity v2 — "Instrument"

This is Ritik's personal design system. Industrial. The organizing metaphor: **dark chrome is the machine's housing, light content is its screen.** Bloomberg Terminal seriousness, machined to Jony-Ive-era tolerances.

This file is the source of truth for what tenacity *is* and *isn't*. Read it before suggesting changes.

---

## Identity

- **Aesthetic**: industrial instrument — graphite housing, cold flat content, terminal density, machine/human type boundary
- **References for inspiration (never copy)**: IBM Carbon (structure), Bloomberg Terminal (density, data seriousness), Zoho/Retool (tool pragmatism), pre-liquid-glass iOS (precision, physics, typographic confidence, material honesty)
- **Avoid**: Material, Apple consumer-soft, Untitled-UI pastel-pill genre, "modern SaaS" gradient-purple genre
- **What it serves**: dense operational software — consoles, dashboards, admin tools. This system is personal; it serves no employer brand.

The four load-bearing ideas, in order of importance:

1. **Housing vs screen.** Dark graphite chrome (header, nav bands) frames light content. Chrome is the only place with material rendering; content is dead flat.
2. **The mono/sans boundary is the voice.** Prose is human (Geist), data is machine (JetBrains Mono). Every literal data value — IDs, counts, timestamps, codes, statuses — is mono.
3. **Color is scarce, so color is loud.** The working color is ink. Red/green/amber appear only as small, deliberate signals; their rarity is what makes them legible.
4. **Open and ruled, not boxed.** Structure comes from rules, alignment, and whitespace — not from borders drawn around everything. The chrome provides the frame.

---

## Hard rules — things that are NOT allowed

### 1. Color scarcity — where color may appear

Ink (`--primary`, near-black graphite) is the *only* interactive color: buttons, focus, links, selected states. Functional colors (success/warning/danger) may appear **only** in:

- Status markers (the ■ idiom) and badges
- Destructive buttons and their confirmation surfaces
- Alert/banner accent bars and icons
- Validation text under inputs
- Data visualization

They may NOT appear in: links, table text (other than status), decorative icons, headings, hover states, or backgrounds of fillable surfaces. If a screen has more than ~5 colored elements visible at once, something is misusing the system.

**One solid-primary button per content region.** Repeated row-level actions use `secondary` or `ghost`. A primary action repeated 20 times is no longer primary.

### 2. Mono for data — no exceptions

If a value could appear in a database column, it renders in mono: IDs, numbers, dates, timestamps, durations, codes, URLs, file names, statuses, amounts. Labels, headings, descriptions, button text, and prose render in Geist. Never mix within one token of meaning (a timestamp is entirely mono, including its separators).

Data cells default to `text-xs` (12px) `font-medium` mono. Numbers in tables align right and use tabular figures (mono gives this for free).

### 3. Open + ruled over boxed

Tables are full-bleed: no outer border, no surrounding card. Structure inside content zones comes from horizontal rules:

- `--rule` (hairline, light) between rows and minor sections
- `--rule-strong` (darker) above/below table headers and at major section boundaries

Boxes (white panels on the gray page) are allowed only when a zone genuinely needs containment — forms in context, drawers, modals, popovers. Default to open. Vertical rules are rare; prefer column gaps and alignment.

### 4. No soft color hue inside fillable/interactive surfaces

Inputs, resting buttons, cards, table rows, drawer bodies stay clean (white or page-gray). No tinted backgrounds at any opacity. Neutral gray (`bg-muted`) is allowed for disabled surfaces, ghost-hover, code blocks, and active nav grooves. Soft badge fills are the deliberate exception (opted into via `variant="soft"`).

### 5. No glow rings on focus

Focus is communicated by stroke and position, never box-shadow glow:

- Fillable surfaces (inputs, dropdown triggers, OTP cells, tag inputs): border turns ink + 4px ink bar inset on the left edge (full height — the floating-mask trick is retired)
- Buttons and non-fillable interactive elements: 2px ink outline, 2px offset

### 6. Sharp edges

Radius scale: 0 / 2 / 2 / 4 px. Nothing rounder. No pills, no `rounded-full` except avatars. Sharp is the machined signature.

### 7. Material honesty — flat content, material chrome

Content surfaces have zero decorative shadows and zero gradients. Overlays (modal, drawer, popover, toast) get one functional shadow to establish z-order — nothing else casts.

Material rendering is permitted in exactly two places: the chrome band, and the relief language on interactive controls. Nothing else.

1. **The chrome band**: a 1px top highlight (`inset 0 1px 0 rgba(255,255,255,0.07)`) and an optional barely-there vertical gradient. The housing catches light; the screen does not.
2. **The relief language — depth means interactive.** Win98-derived, machined to v2 tolerances. All relief is hard 1px edge strokes (never blur/glow) that snap with no transition:
   - **Raised = acts.** Primary/secondary/destructive buttons are keys: raised bevel at rest (light top-left, shadowed bottom-right), INVERTED on press with a 1px dip — the key visibly sinks. Ghost/link variants are not keys; disabled keys go flat (a dead key has no relief).
   - **Recessed = accepts.** Fillable surfaces (inputs, textareas, select triggers, OTP cells, tag inputs, composers) are wells: a faint dark inner edge top-left, machined into the surface (`.well`). On focus the ink bar joins the recess (`.well-focus`).
   - **Latched = binary state.** Checkbox/radio rest as tiny wells; checked fills with ink and seats in (`.latched`). The toggle is a raised square knob sliding in a recessed track.
   - **Flat = informs.** Tables, cards, text, markers — zero relief. Depth is a guarantee: if it has relief, you can touch it. Anything non-interactive with a bevel is a bug.

### 8. All sizing values are even-numbered pixels

Font sizes, radii, padding, bar widths — everything resolves to an even pixel count. Smallest text is 12px. 1px strokes are permitted (borders and rules are strokes, not fills). The 1px press-translate on buttons is movement, not sizing — permitted.

**The scale**: fonts 12/14/16/18/20/24/30/36 · radii 0/2/4 · spacing on the 4px grid · focus bar 4px · outline 2px.

### 9. Functional colors stay in their constraint band

Danger and warning must remain readable as alerts. Primary ink and success can sit dark; warning/danger stay in their visibility band.

### 10. Foreground hierarchy — three grays, three roles

| Token | Use for |
|---|---|
| `text-foreground` (near-black) | Headings, primary content, active labels, data cells |
| `text-subtle-foreground` (dark gray) | Descriptions, section labels, secondary content. Passes WCAG AA |
| `text-muted-foreground` (mid gray) | True meta — helper text, footnotes, placeholders, disabled labels |

If a user *reads* it as information → `subtle-foreground` or darker. If they *glance* at it → `muted-foreground`. When in doubt, go darker.

On chrome: `text-chrome-foreground` (near-white) for active items, `text-chrome-muted` for inactive.

### 11. Visual languages must not collide

Badges are ALL CAPS mono, small, letter-spaced — they read as metadata. Buttons are mixed-case Geist medium — they read as language. Status markers (■ + mono caps) are not interactive and must never get hover states. XS buttons in primary-filled are forbidden (badge collision). "Details/View/Open" actions are link-variant buttons, not boxed buttons.

### 12. Once a decision is locked, alternatives are deleted

Rejected variants leave the codebase — no `__deprecated` exports, no unused variant props. Exploration scaffolding (runtime pickers) survives only while a decision is open. The codebase reflects the current spec, not the exploration history.

### 13. The contrast floor — the system speaks at full volume

An instrument is high-contrast: black chassis, engraved markings, visible seams. Every stroke and relief edge must be *perceptibly* present at 100% zoom on a standard display — a border, rule, or bevel too faint to clearly see is not restraint, it's paper. When tuning a stroke, err darker. Structural strokes rank: 2px near-ink (table header rule) > `rule-strong` (section breaks) > `border` (component edges) > `rule` (row hairlines). Dark mass is part of the identity: chrome should frame the screen (band + rail and/or status bar), not just cap it.

### 14. Motion communicates mass, never decorates

Overlays (drawer, modal, toast) move with weighted spring physics — fast, damped, heavy, like a machine part seating into place (`--ease-seat`, 200–280ms). Buttons get micro press-feedback (1px dip). Tables, page loads, and data render instantly — no entrance animations, no stagger, no skeleton shimmer slower than 1.2s. Nothing animates that isn't responding to the user's hand.

---

## Locked tokens (current spec)

| Token | Value | Reasoning |
|---|---|---|
| Sans | Geist | Sharp, technical prose voice |
| Mono | JetBrains Mono | The machine voice — all data |
| Body size | 14px prose / 12px data | Terminal-dense |
| Chrome | HSL 220 16% 11% | Graphite housing, blue-cold |
| Page | HSL 220 15% 93% | Cold steel-gray screen bed |
| Surface | White | Data surfaces |
| Primary (ink) | HSL 220 18% 14% | Near-black interactive |
| Success | Forest (145 50% 28%) | Settled, cold |
| Warning | Burnt amber (30 80% 42%) | Readable, not fluorescent |
| Danger | Cardinal (358 65% 46%) | Urgent but weighted |
| Radius | 2px default | Machined |
| Row height | 32px dense / 40px relaxed | Terminal default is dense |
| Dark mode | None | One identity, executed precisely. A true dark theme is a future deliberate project, not a parallel maintenance burden |

---

## System patterns

### StatusMark — the status idiom

Status in dense data renders as a small sharp square + uppercase mono label in ink:

```
■ PASSED    (filled square, success color)
■ FAILED    (filled square, danger color)
□ NOT RUN   (hollow square, border color)
```

The square carries the color; the text stays ink. Twenty green rows stay quiet; one red square jumps. Filled = the state happened (active or terminal); hollow = the state hasn't happened (draft, not-run, pending-nothing). Badges still exist for emphasis contexts (page headers, cards, summaries) — never for repeating table rows.

`DocumentStatus` mapping (system-enforced, no overrides):

| Status | Marker | Color |
|---|---|---|
| draft | hollow | neutral |
| sent | filled | ink |
| in-progress | filled | warning |
| completed | filled | success |
| rejected | filled | danger |
| expired | hollow | neutral |
| failed | filled | danger |

### Chrome

TopNav is the graphite band: 48px, chrome tokens, 1px top highlight. Brand block, nav items (chrome-muted → chrome-foreground on active, with a 2px ink-inverse underline), actions right. **StatusBar** is the housing's bottom edge: a 32px graphite readout strip (mono counts, env, timestamps — never actions). A left nav on chrome forms an L-frame with the band. Together they make the screen sit inside the machine. Content never renders chrome colors; chrome never renders content colors.

### Table recipe

Full-bleed. Header: Geist 12px semibold uppercase tracking-wide `subtle-foreground`, `rule-strong` below. Rows: 32px, hairline rules, mono data cells, `bg-muted` hover. Numeric columns right-aligned. Status column uses StatusMark. Row actions are ghost/link buttons, visible on hover if secondary.

---

## Workflow

- Dev server: `http://localhost:5173` via `npm run dev`
- Storybook-style left-nav layout; stories in `src/stories/`
- Runtime token pickers in the header are exploration tools; when a decision locks, the CSS default is the truth and the rejected modes are deleted
- The `qa-console` story is the reference screen — judge any system change against it
