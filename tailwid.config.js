//  @type {import('tailwindcss').Config} 
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "dark-primary": "#3B3F42",
      },
    },
  },
  plugins: [],
};
