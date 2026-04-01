/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base:    '#F6F7FB',
        surface: '#ffffff',
        surfaceHover: '#f0f2f8',
        accent:  '#232334',
        accentSecondary: '#a78bfa',
        userBubble: '#232334',
        border:  '#e2e6f0',
      },
      fontSize: {
        sm: ['15px', { lineHeight: '1.6' }],
        xs: ['12px', { lineHeight: '1.5' }],
      },
      fontFamily: {
        sans: ['Pretendard', 'Apple SD Gothic Neo', 'Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeIn:  { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'none' } },
        pulse:   { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.4' } },
        blink:   { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
        dotBounce: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        fadeIn:     'fadeIn 0.35s ease forwards',
        pulse:      'pulse 2s ease-in-out infinite',
        blink:      'blink 0.8s ease infinite',
        dotBounce1: 'dotBounce 1.2s ease-in-out 0s infinite',
        dotBounce2: 'dotBounce 1.2s ease-in-out 0.2s infinite',
        dotBounce3: 'dotBounce 1.2s ease-in-out 0.4s infinite',
      },
    },
  },
}
