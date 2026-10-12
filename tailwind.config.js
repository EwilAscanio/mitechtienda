/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}', './context/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: { extend: { colors: { ink: '#111318', electric: '#536dfe' }, fontFamily: { sans: ['var(--font-inter)', 'sans-serif'] }, boxShadow: { soft: '0 20px 70px -30px rgba(19,25,50,.22)' } } },
  plugins: [],
};
