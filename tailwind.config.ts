import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* ── Ray-Ban brand ── */
        brand: {
          DEFAULT: '#CC0000',
          hover:   '#990000',
          light:   '#FFF0F0',
          mid:     '#FFCCCC',
        },
        /* ── Surfaces (white theme) ── */
        surface: {
          DEFAULT: '#FFFFFF',
          2:       '#F5F5F3',
          3:       '#EBEBEB',
        },
        /* ── Borders ── */
        border: {
          DEFAULT: '#D6D6D6',
          strong:  '#BFBFBF',
        },
        /* ── Text ── */
        text: {
          1: '#1A1A1A',
          2: '#4D4D4D',
          3: '#8C8C8C',
          4: '#BFBFBF',
        },
        /* ── Accent ── */
        gold: {
          DEFAULT: '#C9A84C',
          light:   '#E8C97A',
        },
        /* ── Semantic ── */
        success: { DEFAULT: '#2D6A4F', bg: '#EAF5EC' },
        warning: { DEFAULT: '#B5451B', bg: '#FFF3E0' },
        error:   { DEFAULT: '#CC0000', bg: '#FFF0F0' },
      },
      fontFamily: {
        sans:    ["'Syne'", "'Helvetica Neue'", 'Helvetica', 'Arial', 'sans-serif'],
        display: ["'Bebas Neue'", "'Helvetica Neue'", 'Helvetica', 'Arial', 'sans-serif'],
        serif:   ["'DM Serif Display'", 'Georgia', 'serif'],
        mono:    ["'DM Mono'", 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        '2':    '2px',
        '4':    '4px',
        '6':    '6px',
        '8':    '8px',
        '12':   '12px',
        '16':   '16px',
        '20':   '20px',
        'pill': '999px',
      },
      boxShadow: {
        xs:    '0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.08)',
        sm:    '0 4px 12px rgba(0,0,0,.15), 0 2px 4px rgba(0,0,0,.08)',
        md:    '0 4px 16px rgba(0,0,0,.08), 0 2px 6px rgba(0,0,0,.04)',
        lg:    '0 12px 40px rgba(0,0,0,.18), 0 4px 12px rgba(0,0,0,.1)',
        xl:    '0 24px 64px rgba(0,0,0,.22), 0 8px 24px rgba(0,0,0,.12)',
        brand: '0 8px 32px rgba(204,0,0,0.35)',
      },
      transitionTimingFunction: {
        'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'ease-spring':   'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'ease-std':      'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        fast: '150ms',
        base: '300ms',
        slow: '600ms',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'float':   'float 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
