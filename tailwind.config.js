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
        primary: '#15133C',
        sub: '#0F172A',
        accent: '#EC994B',
        textColor: '#ffffff',
      },
      width: {
        50: '50rem',
        40: '40rem',
        28: '28rem',
        20: '20rem',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
