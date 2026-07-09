import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        abyss: '#050A14',
        navy: '#0A1628',
        frost: '#4FC3F7',
        frostDeep: '#1565C0',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        frost: '0 0 24px rgba(79, 195, 247, 0.35)',
        frostLg: '0 0 60px rgba(79, 195, 247, 0.45)',
      },
    },
  },
  plugins: [],
};

export default config;
