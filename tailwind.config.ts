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
        brand: {
          DEFAULT: '#0457CB',
          hover:   '#0348A8',
          light:   '#EBF1FC',
          mid:     '#C2D5F5',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          2:       '#F7F8FA',
          3:       '#F0F2F5',
        },
        border: {
          DEFAULT: '#E4E6EB',
          strong:  '#CDD0D4',
        },
        text: {
          1: '#050505',
          2: '#3C3C3C',
          3: '#65676B',
          4: '#90949C',
        },
        success: { DEFAULT: '#1E7E34', bg: '#EAF5EC' },
        warning: { DEFAULT: '#A05E00', bg: '#FFF3E0' },
        error:   { DEFAULT: '#C0392B', bg: '#FDECEA' },
      },
      fontFamily: {
        sans:    ["'Helvetica Neue'", 'Helvetica', 'Arial', 'sans-serif'],
        display: ["'Optimistic Display'", "'Helvetica Neue'", 'Helvetica', 'Arial', 'sans-serif'],
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
        xs:    '0 1px 2px rgba(0,0,0,.05), 0 1px 3px rgba(0,0,0,.04)',
        sm:    '0 2px 8px rgba(0,0,0,.07), 0 1px 3px rgba(0,0,0,.04)',
        md:    '0 4px 16px rgba(0,0,0,.08), 0 2px 6px rgba(0,0,0,.04)',
        lg:    '0 8px 32px rgba(0,0,0,.10), 0 4px 10px rgba(0,0,0,.05)',
        xl:    '0 16px 56px rgba(0,0,0,.12), 0 6px 16px rgba(0,0,0,.06)',
        brand: '0 4px 16px rgba(4,87,203,.22)',
      },
      transitionTimingFunction: {
        'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'ease-spring':   'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'ease-std':      'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        fast: '120ms',
        base: '240ms',
        slow: '400ms',
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
