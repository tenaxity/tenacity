/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        subtle: {
          DEFAULT: 'hsl(var(--subtle))',
          foreground: 'hsl(var(--subtle-foreground))',
        },
        border: 'hsl(var(--border))',
        ring: 'hsl(var(--ring))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          hover: 'hsl(var(--primary-hover))',
          foreground: 'hsl(var(--primary-foreground))',
          subtle: 'hsl(var(--primary-subtle))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
          subtle: 'hsl(var(--success-subtle))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
          subtle: 'hsl(var(--warning-subtle))',
        },
        danger: {
          DEFAULT: 'hsl(var(--danger))',
          foreground: 'hsl(var(--danger-foreground))',
          subtle: 'hsl(var(--danger-subtle))',
        },
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // All-even scale per Hard Rule #11. Smallest readable size is xs (12px).
        // No 2xs — 10px is too small for actual content, and badges/helpers/labels all use xs.
        xs:    ['0.75rem',   { lineHeight: '1rem' }],       // 12px / 16px — helper text, badges, section labels
        sm:    ['0.75rem',   { lineHeight: '1rem' }],       // 12px alias for xs (back-compat)
        base:  ['0.875rem',  { lineHeight: '1.25rem' }],    // 14px / 20px — default body
        md:    ['1rem',      { lineHeight: '1.5rem' }],     // 16px / 24px — card titles, prominent
        lg:    ['1.125rem',  { lineHeight: '1.5rem' }],     // 18px / 24px — subheadings
        xl:    ['1.25rem',   { lineHeight: '1.75rem' }],    // 20px / 28px — section headings
        '2xl': ['1.5rem',    { lineHeight: '2rem' }],       // 24px / 32px
        '3xl': ['1.875rem',  { lineHeight: '2.25rem' }],    // 30px / 36px
        '4xl': ['2.25rem',   { lineHeight: '2.75rem' }],    // 36px / 44px
      },
      borderRadius: {
        // Radius tokens read CSS variables so a runtime picker can swap modes.
        none: '0px',
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius-md)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      boxShadow: {
        xs: '0 1px 1px rgba(0, 0, 0, 0.04)',
        sm: '0 1px 2px rgba(0, 0, 0, 0.06), 0 1px 1px rgba(0, 0, 0, 0.04)',
        DEFAULT: '0 2px 4px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
        md: '0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04)',
        lg: '0 12px 24px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.04)',
        ring: '0 0 0 3px hsl(var(--ring) / 0.35)',
      },
    },
  },
  plugins: [],
}
