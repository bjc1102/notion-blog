module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans KR'],
      },
      colors: {
        primary: '#243c5a',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
