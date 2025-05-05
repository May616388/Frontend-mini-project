import animate from "tailwindcss-animate";
/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        "primary-black-900": "var(--color-primary-black-900)",
        "primary-black-800": "var(--color-primary-black-800)",
        "primary-black-500": "var(--color-primary-black-500)",
        "primary-black-200": "var(--color-primary-black-200)",

        "primary-orange-900": "var(--color-primary-orange-900)",
        "primary-orange-600": "var(--color-primary-orange-600)",
        "primary-orange-300": "var(--color-primary-orange-300)",

        "secondary-yellow-900": "var(--color-secondary-yellow-900)",

        "secondary-white-900": "var(--color-secondary-white-900)",
        "secondary-white-700": "var(--color-secondary-white-700)",

        "secondary-green-900": "var(--color-secondary-green-900)",
        "secondary-green-400": "var(--color-secondary-green-400)",
        "secondary-green-200": "var(--color-secondary-green-200)",

        "secondary-blue-900": "var(--color-secondary-blue-900)",
        "secondary-blue-400": "var(--color-secondary-blue-400)",
        "secondary-blue-300": "var(--color-secondary-blue-300)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        "happy-monkey": ["Happy Monkey", "cursive"],
        body: ["Poppins", "sans-serif"],
        heading: ["Happy Monkey", "cursive"],
      },
    },
  },
  plugins: [animate],
};

export default config;
