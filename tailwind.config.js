/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8F0',
        'warm-white': '#FEFCF8',
        'pastel-green': '#A8D5BA',
        'soft-blue': '#A7C7E7',
        peach: '#FFDAB9',
        'light-brown': '#C4A882',
        sage: '#87A96B',
        'leaf-dark': '#4A7C59',
        coral: '#F4845F',
        'bloom-pink': '#F2B5D4',
        'bloom-yellow': '#FFE5A0',
        'bloom-lavender': '#C9B1FF',
        'notebook-line': '#D4E4ED',
      },
      fontFamily: {
        heading: ['Nunito', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'card': '0 2px 12px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.1)',
        'soft': '0 1px 4px rgba(0,0,0,0.04)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'bloom': 'bloom 0.6s ease-out forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'sway': 'sway 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        bloom: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
      },
    },
  },
  plugins: [],
}
