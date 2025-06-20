import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', ...defaultTheme.fontFamily.sans],
      },
      borderColor: {
        primary: '#e3e3e3',
        secondary: '#1b1b26',
        point: '#5a5ad3',
        'point-hover': '#4e4eb2',
      },
      colors: {
        primary: '#5a5ad3',
        'primary-hover': '#4e4eb2',
        secondary: '#bcf121',
        background: {
          primary: '#f5f5f5',
          'primary-dark': '#0e0e17',
          secondary: '#e9e9ee',
          'secondary-hover': '#dddde5',
          'secondary-dark': '#1b1b26',
          'secondary-dark-hover': '#14141c',
        },
        foreground: { DEFAULT: '#222', dark: '#fff' },
      },
    },
  },
  plugins: [],
};
