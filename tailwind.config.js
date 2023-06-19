/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "soft-black": "#0D0D0D",
        "soft-white": "F2F2F2",
        "primary-green": "#5DB075",
        "sub-green": "#4B9460",
        "grey-100": "#F6F6F6",
        "grey-200": "#E8E8E8",
        "grey-300": "#BDBDBD",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
