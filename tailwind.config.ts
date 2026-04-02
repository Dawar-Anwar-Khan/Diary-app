/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        handwriting: ["'Patrick Hand'", "cursive"],
        caveat: ["'Caveat'", "cursive"],
      },
    },
  },
  plugins: [],
};
export default config;
