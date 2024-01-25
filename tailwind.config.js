// /** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        
      },
      colors: {
        discord: 'rgb(87, 107, 188)',
        'discord-500': 'rgb(60, 78, 151)',
        light: 'rgb(245, 245, 250)',
        'low-light': 'rgb(11, 36, 71)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
