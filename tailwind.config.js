/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      fontFamily: {
        sans: ['Red Hat Text', 'sans-serif'],
      },
      colors: {
        // Primary - Orange
        priLighter: "var(--clr-primary-lighter)",
        priLight: "var(--clr-primary-light)",
        priColor: "var(--clr-primary)",
        priDark: "var(--clr-primary-dark)",
        priDarker: "var(--clr-primary-darker)",

        // Secondary - Green
       secLighter: "var(--clr-secondary-lighter)",
       secLight: "var(--clr-secondary-light)",
       secColor: "var(--clr-secondary)",
       secDark: "var(--clr-secondary-dark)",
       secDarker: "var(--clr-secondary-darker)",

        // Others
        accent: "var(--clr-accent)",  /* cart & modal background */
        surface: "var(--clr-surface)",  /* background */
        sand: "var(--clr-sand)",
        terracotta: "var(--clr-terra-cotta)",  /* category text */
        clay: "var(--clr-clay)",  /* border without hover */
        burnt: "var(--clr-burnt)",  /* body text */

        // Greyscale
        grey0: "var(--clr-grey--0)",  /* Black color */
        grey100: "var(--clr-grey--100)",
        grey200: "var(--clr-grey--200)",
        grey300: "var(--clr-grey--300)",
        grey400: "var(--clr-grey--400)",
        grey500: "var(--clr-grey--500)",
        grey600: "var(--clr-grey--600)",
        grey700: "var(--clr-grey--700)",
        grey800: "var(--clr-grey--800)",
        grey900: "var(--clr-grey--900)",  /* White color */
      }
    },
  },
  plugins: [],
}