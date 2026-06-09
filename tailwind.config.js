/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        surface: 'hsl(var(--surface))',
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
        rule: {
          DEFAULT: 'hsl(var(--rule))',
          strong: 'hsl(var(--rule-strong))',
        },
        chrome: {
          DEFAULT: 'hsl(var(--chrome))',
          raised: 'hsl(var(--chrome-raised))',
          foreground: 'hsl(var(--chrome-foreground))',
          muted: 'hsl(var(--chrome-muted))',
          rule: 'hsl(var(--chrome-rule))',
        },
        ring: 'hsl(var(--ring))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          hover: 'hsl(var(--primary-hover))',
          foreground: 'hsl(var(--primary-foreground))',
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
        // All-even scale per Hard Rule #8. Smallest readable size is 12px.
        xs:    ['0.75rem',   { lineHeight: '1rem' }],       // 12px / 16px — data cells, badges, helpers
        sm:    ['0.75rem',   { lineHeight: '1rem' }],       // 12px alias for xs (back-compat)
        base:  ['0.875rem',  { lineHeight: '1.25rem' }],    // 14px / 20px — prose body
        md:    ['1rem',      { lineHeight: '1.5rem' }],     // 16px / 24px — card titles
        lg:    ['1.125rem',  { lineHeight: '1.5rem' }],     // 18px / 24px — subheadings
        xl:    ['1.25rem',   { lineHeight: '1.75rem' }],    // 20px / 28px — section headings
        '2xl': ['1.5rem',    { lineHeight: '2rem' }],       // 24px / 32px
        '3xl': ['1.875rem',  { lineHeight: '2.25rem' }],    // 30px / 36px
        '4xl': ['2.25rem',   { lineHeight: '2.75rem' }],    // 36px / 44px
      },
      borderRadius: {
        // Radius tokens read CSS variables so the runtime picker can swap modes.
        none: '0px',
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius-md)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      boxShadow: {
        // Hard Rule #7: overlays get ONE functional shadow to establish
        // z-order; nothing else casts.
        overlay: '0 8px 24px rgba(13, 16, 23, 0.16), 0 2px 6px rgba(13, 16, 23, 0.10)',
      },
      transitionTimingFunction: {
        seat: 'var(--ease-seat)',
      },
      transitionDuration: {
        seat: '240ms',
        micro: '80ms',
      },
    },
  },
  plugins: [],
}
