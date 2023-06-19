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
        "soft-white": "#F8F8F8",
        "primary-green": "#5DB075",
        "sub-green": "#4B9460",
        "grey-1": "#F6F6F6",
        "grey-2": "#E8E8E8",
        "grey-3": "#BDBDBD",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
