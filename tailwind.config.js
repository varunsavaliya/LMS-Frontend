/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark"],
  },
};
