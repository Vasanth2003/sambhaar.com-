/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        "screen-2xl": "1400px",
        "custom-1200": "1200px",
        "custom-900": "900px",
      },
      colors: {
        primary: "#ea580c",
        "primary-dark": "#d64b00",
        "primary-light": "#f4e5ec",
        "text-dark": "#0f172a",
        "text-light": "#64748b",
        "extra-light": "#f8fafc",
      },
      animation: {
        "spin-clockwise": "spin 8s linear infinite",
        "spin-anticlockwise": "spin-anticlockwise 8s linear infinite",
        jump: "jump 1.5s ease-out infinite", 
        "slow-marquee": "marquee 30s linear infinite",
        "fadeIn": 'fadeIn 0.5s ease-out',
        'spin-slow': 'spin 12s linear infinite',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-in': 'slideIn 1s ease-out forwards',
        brandReveal: 'brandReveal 2.2s ease-out forwards',
        shimmer: 'shimmer 2s infinite',
        bounceSlow: 'bounceSlow 3s ease-in-out infinite',
        aluminum: 'aluminum 2s linear infinite',

      },

      keyframes: {
       aluminum: {
        '0%': { transform: 'translateX(-100%)' },
        '100%': { transform: 'translateX(100%)' },
      },
        brandReveal: {
      '0%': {
        opacity: '0',
        transform: 'scale(0.5) translateY(20px)',
        letterSpacing: '0.2em',
        filter: 'blur(4px)',
      },
      '50%': {
        opacity: '0.8',
        transform: 'scale(1.2) translateY(-10px)',
        filter: 'blur(2px)',
      },
      '100%': {
        opacity: '1',
        transform: 'scale(1) translateY(0)',
        letterSpacing: '0.05em',
        filter: 'blur(0)',
      },
    },
      shimmer: {
        '0%': { transform: 'translateX(-100%)' },
        '100%': { transform: 'translateX(100%)' },
      },
      bounceSlow: {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-3px)' },
      },
        fadeIn: {
      '0%': { opacity: 0 },
      '100%': { opacity: 1 },
    },
    slideIn: {
      '0%': { transform: 'translateY(20px)', opacity: 0 },
      '100%': { transform: 'translateY(0)', opacity: 1 },
    },
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "spin-anticlockwise": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
        jump: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      
      },
      zIndex: {
        51: "51",
        100: "100",
      },
    },
  },
  plugins: [],
};
