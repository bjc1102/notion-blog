module.exports = {
  content: [
    './utils/**/*.{js,jsx,ts,tsx,json}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './public/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans KR'],
        akashi: ['Akashi'],
      },
      colors: {
        primary: '#0F172A',
        sub: '#1F2937',
        accent: '#2b695a',
        textColor: '#ffffff',
      },
      width: {
        50: '50rem',
        40: '40rem',
        28: '28rem',
        20: '20rem',
      },
      screens: {
        '2xl': { max: '1535px' },
        // => @media (max-width: 1535px) { ... }
        xl: { max: '1279px' },
        // => @media (max-width: 1279px) { ... }
        lg: { max: '1023px' },
        // => @media (max-width: 1023px) { ... }
        md: { max: '767px' },
        // => @media (max-width: 767px) { ... }
        sm: { max: '639px' },
        // => @media (max-width: 639px) { ... }
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
