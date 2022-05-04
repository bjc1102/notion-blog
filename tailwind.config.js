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
        primary: '#1E2126',
        accent: '#ADBF26',
        textColor: '#ffffff',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
